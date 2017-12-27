"use strict";
const mongoose = require("mongoose");
const models = require("./db");
const express = require("express");
const session = require("express-session");
// 图片验证码 模块
const svgCaptcha = require("svg-captcha");
// 短信验证码
const AliDaYu = require("alidayu-node-sdk");
const sms = new AliDaYu("App Key", "App Secret");
const app = express();
let userid = null;
// 使用 session
app.use(
    session({
        secret: "vercode",
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    })
);

//获取右边图片+文字
app.get("/api/orginalArt/getStyleAndthame_img", (req, res) => {
    models.Rightimgs.find({}, (err, data) => {
        err ? res.send(err) : res.send(data);
    });
});

//商品列表==>获取多条商品数据
app.post("/api/orginalArt/getGoods", (req, res) => {
    let _sort = "",
        { page, parmas, onePageNum } = req.body;

    if (parmas) {
        if ("price" in parmas) {
            let _price = parmas.price.slice(1, parmas.price.length).split("～");
            if (_price[1] !== "max") {
                parmas.price = {
                    $gte: parseInt(_price[0].replace(",", "")),
                    $lt: parseInt(_price[1].replace(",", ""))
                };
            } else {
                parmas.price = {
                    $gte: parseInt(_price[0].replace(",", ""))
                };
            }
        }
        if ("price2" in parmas) {
            if (parmas.price2 != 0) {
                _sort += parmas.price2.slice(0, parmas.price2.length - 1) + "";
            }
            delete parmas.price2;
        }
        if ("time" in parmas) {
            if (parmas.time != 0) {
                _sort += parmas.time + "";
            }
            delete parmas.time;
        }
        if ("status" in parmas) {
            // 1:表示未售
            if (parmas.status !== "1") {
                delete parmas.status;
            }
        }
        if ("size" in parmas) {
            let _size = parmas.size.slice(0, parmas.size.length - 2).split("～");
            if (_size[1] !== "m") {
                parmas["size.x"] = {
                    $gte: parseInt(_size[0]),
                    $lt: parseInt(_size[1])
                };
            } else {
                parmas["size.x"] = {
                    $gte: parseInt(_size[0])
                };
            }
            delete parmas.size;
        }
        if ("style" in parmas) {
            parmas.style = new RegExp(parmas.style, "i");
        }
        if ("position" in parmas) {
            parmas.position = new RegExp(parmas.position, "i");
        }
        if ("searchValue" in parmas) {
            let val = new RegExp(parmas.searchValue, "i");
            parmas.$or = [{ name: val }, { artist: val }];
            delete parmas.searchValue;
        }
    }
    models.Goods.count(parmas, (err, count) => {
        // 1 ：升序排列，从小到大；-1：降序排列，从大到小
        models.Goods
            .find(parmas)
            .skip((page - 1) * onePageNum)
            .limit(onePageNum)
            .select("images artist name time meterial size price status")
            .sort(_sort)
            .exec((err, data) => {
                err ? res.send(err) : res.send({ data, count });
            });
    });
});

//商品详情==>获取一条商品数据
app.post("/api/getGoodsById", (req, res) => {
    let id = mongoose.Types.ObjectId(req.body.id);
    models.Goods.find({ _id: id }, (err, data) => {
        err ? res.send(err) : res.send(data[0]);
    });
});

//获取艺术家信息+作品总数量+最多3个作品
app.post("/api/getArtistAndArt", (req, res) => {
    let parmas = req.body;
    models.Goods.count({ artist: parmas.artist }, (err, count) => {
        let artist = () => {
            return models.Artists.find({ ch_name: parmas.artist }).exec();
        };
        let good = () => {
            if (count > 3) {
                parmas._id = { $nin: [mongoose.Types.ObjectId(parmas._id)] };
                return models.Goods.find(parmas).limit(3).exec();
            } else {
                return models.Goods.find({ artist: parmas.artist }).exec();
            }
        };
        Promise.all([artist(), good()]).then(data => {
            res.send({ data, count });
        });
    });
});

// 登录按钮事件
app.post("/api/login", (req, res) => {
    let { username, password } = req.body;
    models.Logins.find({ username }, (err, data) => {
        let len = String(data.length);
        // 0：用户名错误；1：密码错误；object：登录成功
        if (len === "1") {
            //有这个用户名
            if (data[0].password === password) {
                // 密码正确
                userid = data[0]._id;
                res.send({ id: data[0]._id, userimg: data[0].userimg });
            } else {
                // 密码错误
                res.send("1");
            }
        } else {
            //1、无该用户名；2、用户名输入错误
            res.send("0");
        }
    });
});

// 生成图片验证码 【注册、忘记密码】
let vercode = "";
app.get("/api/getVerCode", (req, res) => {
    var captcha = svgCaptcha.create({
        color: true,
        noise: 5,
        ignoreChars: "0o1i",
        background: "#cc9966",
        width: 130,
        height: 40
    });
    req.session.secret = captcha.text;
    vercode = captcha.text;
    console.log("图片验证码：" + vercode.toLowerCase());
    res.type("svg");
    res.status(200).send(captcha.data);
});

// 验证 图片验证码【注册、忘记密码】
app.post("/api/checkVerCode", (req, res) => {
    req.body.vercode.toLowerCase() == vercode.toLowerCase()
        ? res.send("1")
        : res.send("0");
});

// 生成短信验证码【忘记密码】
let messcode = "";
app.get("/api/createMessCode", (req, res) => {
    messcode = "";
    for (let i = 0; i < 6; i++) {
        messcode += Math.floor(Math.random() * 10);
    }
    console.log("短信验证码：" + messcode);
    res.send("1");
});

// 验证短信验证码【忘记密码】
app.post("/api/checkMessCode", (req, res) => {
    req.body.messcode === messcode ? res.send("1") : res.send("0");
});

//修改密码【忘记密码】
app.post("/api/updatePwd", (req, res) => {
    let { username, password } = req.body;
    models.Logins.update({ username }, { $set: { password } }, (err, data) => {
        err ? res.send("0") : res.send("1");
    });
});

// 注册用户 【注册】
app.post("/api/register", (req, res) => {
    new models.Logins(req.body).save((err, data) => {
        err ? res.send("0") : res.send("1");
        new models.Shopcars({ userid: data._id, good: [] }).save();
    });
});

// 通过shopcars里面的goodid在goods里面找作品
app.post("/api/getGoodsByShopcar", (req, res) => {
    models.Shopcars.find(req.body, (err1, data1) => {
        let { good } = data1[0],
            backJSON = [],
            count = 0;
        // good.length - 1 = 1
        for (let i = 0; i < good.length; i++) {
            for (let j = 0; j < good[i].goodid; j++) {
                good[i].goodid = mongoose.Types.ObjectId(good[i].goodid);
            }
            models.Goods.find(
                {
                    _id: {
                        $in: good[i].goodid
                    }
                },
                (err2, data2) => {
                    if (data2.length) {
                        backJSON.push({
                            time: good[i].time,
                            goods: data2,
                            choosed: good[i].choosed
                        });
                        count++;
                        if (count === good.length) {
                            res.send(backJSON);
                        }
                    }
                }
            );
        }
    });
});

// 加入购物车 (一个一个添加的   有重复,返回nModified:0；无重复,返回nModified:1);
app.post("/api/addShopcar", (req, res) => {
    let { userid, time, goodid } = req.body;
    models.Shopcars.update(
        { userid, good: { $elemMatch: { time } } },
        { $addToSet: { "good.0.goodid": goodid } },
        (err, data) => {
            // data={n: 1, nModified: 0, ok: 1}
            if (data.n) {
                res.send("" + data.nModified);
            } else {
                let goodid2 = [];
                goodid2.push(goodid);
                models.Shopcars.update(
                    { userid },
                    {
                        $addToSet: {
                            good: { time, goodid: goodid2 }
                        }
                    },
                    (err, data) => {
                        res.send("" + data.nModified);
                    }
                );
            }
        }
    );
});

// 购物车移除商品 (移除多个值 数组格式 ["goodid1","goodid2"])
app.post("/api/delShopcar", (req, res) => {
    let { userid, time, goodid } = req.body;
    models.Shopcars
        .update(
            {
                userid,
                good: { $elemMatch: { time } }
            },
            { $pull: { "good.0.goodid": goodid } }
        )
        .exec();
});

// 点击结算，更新choosed的值
app.post("/api/updateChoosed", (req, res) => {
    let { userid, time, choosed } = req.body;
    models.Shopcars.update(
        {
            userid,
            good: { $elemMatch: { time } }
        },
        { $pullAll: { "good.0.choosed": [true, false] } },
        (err, data) => {
            models.Shopcars.update(
                {
                    userid,
                    good: { $elemMatch: { time } }
                },
                { $push: { "good.0.choosed": { $each: choosed } } },
                (
                    err,
                    data => {
                        res.send("1");
                    }
                )
            );
        }
    );
});

//通过shopcars里面的goodid在goods里面找作品
app.post("/api/getGoodsByShopcarChoosed", (req, res) => {
    if (req.body.byChoosed) {
        models.Shopcars.find({ userid }, (err1, data1) => {
            let { good } = data1[0],
                backJSON = [],
                count = 0;

            good.forEach(val => {
                let newGoodid = [];
                val.choosed.forEach((val2, index) => {
                    if (val2) {
                        newGoodid.push(
                            mongoose.Types.ObjectId(val.goodid[index])
                        );
                    }
                });
                models.Goods.find(
                    {
                        _id: {
                            $in: newGoodid
                        }
                    },
                    (err2, data2) => {
                        if (data2.length) {
                            backJSON.push({
                                goods: data2
                            });
                            count++;
                            if (count === good.length) {
                                res.send(backJSON);
                            }
                        }
                    }
                );
            });
        });
    }
});

// 新增地址
app.post("/api/insertAddress", (req, res) => {
    req.body.userid = userid;
    let _id = req.body._id ? mongoose.Types.ObjectId(req.body._id) : 0;
    delete req.body._id;
    if (_id) {
        req.body.choosed = req.body.isDefault;
        if (req.body.isDefault) {
            models.Address.update(
                { userid },
                { isDefault: false, choosed: false },
                { multi: true },
                (err, data) => {
                    models.Address.update({ _id }, req.body).exec();
                }
            );
        } else {
            models.Address.update({ _id }, req.body).exec();
        }
        res.send("1");
    } else {
        let { isDefault } = req.body;
        delete req.body.isDefault;
        delete req.body.choosed;
        models.Address.find(req.body, (err, data) => {
            if (data.length) res.send("0");
            else {
                req.body.isDefault = req.body.choosed = isDefault;
                if (isDefault) {
                    models.Address.update(
                        { userid },
                        { isDefault: false, choosed: false },
                        { multi: true },
                        (err, data) => {
                            new models.Address(req.body).save();
                        }
                    );
                } else {
                    new models.Address(req.body).save();
                }
                res.send("1");
            }
        });
    }
});
// 获取地址
app.get("/api/selectAddress", (req, res) => {
    models.Address.find({ userid }, (err, data) => {
        res.send(data);
    });
});
// 删除地址
app.post("/api/delAddress", (req, res) => {
    let _id = mongoose.Types.ObjectId(req.body._id);
    models.Address.remove({ _id }).exec();
});

// 新增订单
app.post("/api/insertOrders", (req, res) => {
    req.body.userid = userid;
    new models.Orders(req.body).save((err, data) => {
        res.send(data._id);
    });
});
// 获取订单
app.post("/api/selectOrders", (req, res) => {
    req.body._id = mongoose.Types.ObjectId(req.body._id);
    models.Orders.find(req.body, (err, data) => {
        res.send(data);
    });
});
module.exports = app;
