<style lang="scss" scoped>
[v-cloak] {
    display: none;
}
@mixin flexUi($justify:flex-start,$align:center) {
    display: flex;
    display: -webkit-flex;
    justify-content: $justify;
    -webkit-justify-content: $justify;
    -webkit-align-items: $align;
    align-items: $align;
}
.main {
    // banner
    .banner {
        position: fixed;
        left: 0;
        top: 68px;
        width: 100%;
        height: 420px;
        transition: background 1s;
        //点
        ul {
            @include flexUi(space-between);
            position: absolute;
            right: 120px;
            bottom: 15px;
            width: 250px;
            height: 12px;
            padding: 10px 20px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 30px;
            li {
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background-color: #fff;
                cursor: pointer;
                transition: background-color 1s;
            }
            .currLi {
                background-color: #3baca1;
            }
        }
    }
    .others {
        position: relative;
        z-index: 100;
        margin-top: 488px;
        padding: 80px 0;
        background-color: #fff;
        .title {
            @include flexUi;
            h2 {
                letter-spacing: 2px;
            }
            span {
                cursor: pointer;
                user-select: none;
                color: #003569;
                margin-left: 50px;
                i {
                    font-size: 18px;
                }
            }
        }
        .tuijian {
            width: 1180px;
            margin: 0 auto;
            .content {
                @include flexUi(space-between);
                position: relative;
                margin-top: 10px;
                padding-top: 40px;
                border-top: 1px solid #ddd;
                // 4个作品
                .item {
                    box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
                    .imgBox {
                        width: 280px;
                        height: 280px;
                        overflow: hidden;
                        cursor: pointer;
                        div {
                            width: 280px;
                            height: 280px;
                            background-image: url("/static/img/23.jpg");
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                            transition: transform 0.5s;
                        }
                        &:hover div {
                            transform: scale(1.1, 1.1);
                        }
                    }

                    .info {
                        padding: 20px;
                        li {
                            font-size: 12px;
                            color: #666;
                            margin-bottom: 3px;
                            &:first-child,
                            &:last-child {
                                color: #000;
                                font-weight: 600;
                                font-size: 13px;
                            }
                        }
                    }
                }
                //4个分类
                .classBox {
                    position: absolute;
                    top: -44px;
                    right: 0;
                    @include flexUi;
                    li {
                        width: 100px;
                        height: 42px;
                        text-align: center;
                        line-height: 42px;
                        border: 1px solid transparent;
                        margin-left: 20px;
                        cursor: pointer;
                        user-select: none;
                        transition: border 0.1s linear;
                        &:hover {
                            border-color: #ddd #ddd#fff #ddd;
                        }
                    }
                    .currClassify {
                        border-color: #ddd #ddd #fff #ddd;
                    }
                }
            }
        }
        // 最新上架
        .new {
            width: 1180px;
            margin: 80px auto;
            .title {
                span {
                    .rotateSpan {
                        transform: rotate(45deg);
                        // transition: transform 1s;
                    }
                }
            }
            .content {
                margin-top: 50px;
                @include flexUi;
                .item {
                    position: relative;
                    cursor: pointer;
                    .itemDiv {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        backface-visibility: hidden;

                        &:first-child {
                            transform: rotateY(-180deg);
                        }
                        .imgBox {
                            height: 100%;
                            transition: transform 0.5s;
                            background-image: url("/static/img/23.jpg");
                            background-position: center center;
                            background-repeat: no-repeat;
                            background-size: cover;
                        }
                        &:hover .info {
                            opacity: 1;
                        }
                        &:hover .imgBox {
                            transform: scale(1.1, 1.1);
                        }
                        .info {
                            @include flexUi(center,center);
                            flex-direction: column;
                            position: absolute;
                            left: 0;
                            top: 0;
                            width: 100%;
                            height: 100%;
                            color: #fff;
                            font-size: 12px;
                            background: rgba(0, 0, 0, 0.5);
                            opacity: 0;
                            transition: opacity 0.3s;
                        }
                    }
                }

                .left {
                    @include flexUi(space-between);
                    perspective: 500;
                    transform-style: preserve-3d;
                    flex: 1;
                    .item {
                        width: 280px;
                        height: 280px;
                    }
                }
                .right {
                    @include flexUi(space-between);
                    perspective: 500;
                    transform-style: preserve-3d;
                    flex: 1;
                    margin-left: 20px;
                    flex-wrap: wrap;
                    .item {
                        width: 130px;
                        height: 130px;
                        &:nth-child(n + 5) {
                            margin-top: 20px;
                        }
                    }
                }
            }
        }
    }
    // 推荐
}
</style>

<template>
    <div class="main" v-cloak>
        <!-- banner -->
        <div class="banner" :style="{background:'url(static/banner/banner'+currIndex+'.jpg) center'}">
            <ul>
                <li v-for="i in 6" :key="i" :class="{currLi:i===currIndex}" @click="clickLi(i)"></li>
            </ul>
        </div>
        <div class="others">
            <!-- 推荐 -->
            <div class="tuijian">
                <div class="title">
                    <h2>推荐 / CATEGORY</h2>
                    <router-link to="/originalart" tag="span">更多</router-link>
                </div>
                <div class="content">
                    <div class="item" v-for="i in tuiJianData[currClassify]" :key="i._id">
                        <router-link class="imgBox" tag="div" to="/originalart">
                            <div :style="{backgroundImage:'url(static/img/'+i.images+'.jpg)'}"></div>
                        </router-link>
                        <ul class="info">
                            <li>{{i.artist}}</li>
                            <li>{{i.name}}，{{i.time}}</li>
                            <li>{{i.classfiy}} {{i.size.x}}x{{i.size.y}} cm</li>
                            <li>{{i.price | formatMoney}}</li>
                        </ul>
                    </div>
                    <ul class="classBox">
                        <li v-for="(i,index) in classArr" :key="i" :class="{currClassify:index===currClassify}" @click="currClassify=index">{{i}}</li>
                    </ul>
                </div>
            </div>
            <!-- 最新上架 -->
            <div class="new">
                <div class="title">
                    <h2>最新上架 / NEW</h2>
                    <span @click="timer2 && huanFun()">
                        <i class="iconfont icon-weibiaoti--" :class="{rotateSpan:rotateClass}"></i> 换一换
                    </span>
                </div>
                <div class="content">
                    <div class="left">
                        <div class="item" v-for="(i,index) in 2" :key="i" ref="itemEl">
                            <div class="itemDiv" v-if="newData0.length">
                                <div class="imgBox" :style="{backgroundImage:'url(static/img/'+newData0[index].images+'.jpg)'}"></div>
                                <ul class="info">
                                    <li>{{newData0[index].artist}}</li>
                                    <li>{{newData0[index].name}}，{{newData0[index].time}}</li>
                                    <li>{{newData0[index].classfiy}} {{newData0[index].size.x}}x{{newData0[index].size.y}} cm</li>
                                    <li>{{newData0[index].price | formatMoney}}</li>
                                </ul>
                            </div>
                            <div class="itemDiv" v-if="newData1.length">
                                <div class="imgBox" :style="{backgroundImage:'url(static/img/'+newData1[index].images+'.jpg)'}"></div>
                                <ul class="info">
                                    <li>{{newData1[index].artist}}</li>
                                    <li>{{newData1[index].name}}，{{newData1[index].time}}</li>
                                    <li>{{newData1[index].classfiy}} {{newData1[index].size.x}}x{{newData1[index].size.y}} cm</li>
                                    <li>{{newData1[index].price | formatMoney}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="item" v-for="i in 8" :key="i" ref="itemEl">
                            <div class="itemDiv" v-if="newData0.length">
                                <div class="imgBox" :style="{backgroundImage:'url(static/img/'+newData0[i+1].images+'.jpg)'}"></div>
                                <ul class="info">
                                    <li>{{newData0[i+1].artist}}</li>
                                    <li>{{newData0[i+1].name}}，{{newData0[i+1].time}}</li>
                                    <li>{{newData0[i+1].classfiy}} {{newData0[i+1].size.x}}x{{newData0[i+1].size.y}} cm</li>
                                    <li>{{newData0[i+1].price | formatMoney}}</li>
                                </ul>
                            </div>
                            <div class="itemDiv" v-if="newData1.length">
                                <div class="imgBox" :style="{backgroundImage:'url(static/img/'+newData1[i+1].images+'.jpg)'}"></div>
                                <ul class="info">
                                    <li>{{newData1[i+1].artist}}</li>
                                    <li>{{newData1[i+1].name}}</li>
                                    <li>{{newData1[i+1].time}}</li>                                   <li>{{newData1[i+1].classfiy}} {{newData1[i+1].size.x}}x{{newData1[i+1].size.y}} cm</li>
                                    <li>{{newData1[i+1].price | formatMoney}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            // banner 当前下标
            currIndex: 1,
            // banner 定时器
            timer: null,
            // 分类
            classArr: ["油画", "版画", "水墨", "水彩"],
            // 当前分类
            currClassify: 0,
            // 【推荐】数据
            tuiJianData: [],
            // 换一换 是否旋转flag
            rotateClass: false,
            // 最新上架数据1
            newData0: [],
            // 最新上架数据2
            newData1: [],
            // 后面的div 下标
            back: 0,
            // 换一换 定时器
            timer2: 1,
            // 换一换 点击次数
            huanNum: 0
        };
    },
    filters: {
        formatMoney(val) {
            return "￥" + String(val).replace(/\B(?=(?:\d{3})+$)/g, ",");
        }
    },
    methods: {
        // banner 小圆点点击事件
        clickLi(i) {
            clearInterval(this.timer);
            this.currIndex = i;
            this.autoplay();
        },
        // 自动轮播
        autoplay() {
            this.timer = setInterval(() => {
                this.currIndex < 6 ? this.currIndex++ : (this.currIndex = 1);
            }, 5000);
        },
        // 获取【推荐】数据，一次获取4个分类*4个
        getTuiJianData() {
            this.$http.get("/api/getTuiJianData").then(data => {
                this.tuiJianData = data.data;
            });
        },
        // 换一换 事件
        huanFun() {
            this.timer2 = 0;
            let back = this.back,
                front = Math.abs(this.back - 1);
            let itemEl = this.$refs.itemEl;
            itemEl.forEach((val, index) => {
                let time = index * 0.2;
                if (index >= 2) {
                    time = 0.4;
                }
                setTimeout(() => {
                    val.children[back].style.cssText =
                        "transform:rotateY(0deg);transition:transform 1.5s;";
                    val.children[front].style.cssText =
                        "transform:rotateY(180deg);transition:transform 1.5s;";
                    setTimeout(() => {
                        val.children[front].style.cssText =
                            "transform:rotateY(-180deg);transition:transform 0s;";
                        this.timer2 = 1;
                        if (index === 9) {
                            this.huanNum++;
                            this.getNewData();
                        }
                        this.back = front;
                    }, 1400);
                }, time * 1000);
            });
        },
        // 获取 【最新上架】 10条数据
        getNewData(limit = 10) {
            let num = limit === 20 ? 0 : (this.huanNum + 1) * 10;
            this.$http.post("/api/getNewData", { num, limit }).then(data => {
                if (limit === 10) {
                    let i = "newData" + this.back;
                    this[i] = data.data;
                } else {
                    this.newData0 = data.data.slice(10, 20);
                    this.newData1 = data.data.slice(0, 10);
                }
            });
        }
    },
    mounted() {
        this.autoplay();
        this.getTuiJianData();
        this.getNewData(20);
    }
};
</script>

