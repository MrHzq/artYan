const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost:27017/Artnet",
    { useMongoClient: true },
    function(err) {
        if (err) {
            console.log("**********【数据库连接失败】**********");
        } else {
            console.log("**********【数据库连接成功】**********");
        }
    }
);

/************** 定义模式Schema **************/

// 作品列表 右边图片
const rightimgs = new mongoose.Schema({
    imgSrc: String,
    cn_name: String,
    en_name: String,
    content: String
});

//商品
const goods = new mongoose.Schema({
    images: String,
    colorful: String,
    shape: String,
    price: Number,
    status: String,
    appraise: {
        content: String,
        name: String
    },
    name: String,
    artist: String,
    material: String,
    size: {
        x: Number,
        y: Number
    },
    time: String,
    classify: String,
    style: String,
    theme: String,
    position: String
});

//艺术家
const artists = new mongoose.Schema({
    en_name: String,
    ch_name: String,
    photo: String
});

// 登录
const logins = new mongoose.Schema({
    username: String,
    password: String,
    userimg: {
        type: String,
        default: "avatar0" //用户默认头像
    }
});

// 购物车
const shopcars = new mongoose.Schema({
    userid: String,
    good: [
        {
            time: String,
            goodid: Array,
            choosed: Array
        }
    ]
});

// 地址
const address = new mongoose.Schema({
    userid: String,
    shr: String,
    province: String,
    city: String,
    area: String,
    xxAddress: String,
    phone: String,
    qh: String,
    telphone: String,
    fjh: String,
    postalcode: String,
    otherAddName: String,
    choosed: Boolean,
    isDefault: Boolean
});

// 订单
const orders = new mongoose.Schema({
    userid: String,
    sn: String,
    time: String,
    address: {
        shr: String,
        phone: String,
        province: String,
        city: String,
        area: String,
        xxAddress: String
    },
    totalPrice: String,
    wuliuMoney:String,
    discount: {
        type: String,
        default: 0
    },
    states: {
        type: String,
        default: 1
    },
    goods: Array
});

/************** 定义模型Model **************/
const Models = {
    Goods: mongoose.model("goods", goods),
    Rightimgs: mongoose.model("rightimgs", rightimgs),
    Artists: mongoose.model("artists", artists),
    Logins: mongoose.model("logins", logins),
    Shopcars: mongoose.model("shopcars", shopcars),
    Address: mongoose.model("adds", address),
    Orders: mongoose.model("orders", orders)
};

module.exports = Models;
