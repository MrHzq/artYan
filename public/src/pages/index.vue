<style lang="scss" scoped>
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
                    .currClass {
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
                    perspective: 500;
                    transform-style: preserve-3d;
                    cursor: pointer;
                    .itemDiv {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        overflow: hidden;
                        .imgBox {
                            height: 100%;
                            transition: transform 0.5s;
                        }
                        &:hover .info {
                            opacity: 1;
                        }
                        &:hover .imgBox {
                            transform: scale(1.03, 1.03);
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
                    flex: 1;
                    .item {
                        width: 280px;
                        height: 280px;
                    }
                }
                .right {
                    @include flexUi(space-between);
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
                // 旋转特效
                .newTeXiao-enter,.newTeXiao-leave-to {
                    opacity: 0;
                }
                .newTeXiao-enter-active,.newTeXiao-leave-active {
                    transition: all 1s;
                }
                .newTeXiao-enter-to,.newTeXiao-leave {
                    opacity: 1;
                    transform: rotateY(180deg);
                }
            }
        }
    }
    // 推荐
}
</style>

<template>
    <div class="main">
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
                    <router-link to="/originalArt" tag="span">更多</router-link>
                </div>
                <div class="content">
                    <div class="item" v-for="i in 4" :key="i">
                        <router-link class="imgBox" tag="div" to="/originalArt">
                            <div :style="{background:'url(static/img/20.jpg) center',backgroundSize:'cover'}"></div>
                        </router-link>
                        <ul class="info">
                            <li>{i.artist}</li>
                            <li>{i.name} ，{i.time}</li>
                            <li>{i.classfiy} {i.size.x}x{i.size.y}cm</li>
                            <li>{i.price}</li>
                        </ul>
                    </div>
                    <ul class="classBox">
                        <li v-for="i in classArr" :key="i" :class="{currClass:i===currClass}" @click="currClass=i">{{i}}</li>
                    </ul>
                </div>
            </div>
            <!-- 最新上架 -->
            <div class="new">
                <div class="title">
                    <h2>最新上架 / NEW</h2>
                    <span @click="huanFun">
                        <i class="iconfont icon-weibiaoti--" :class="{rotateSpan:rotateClass}"></i> 换一换
                    </span>
                </div>
                <div class="content">
                    <div class="left">
                        <div class="item" v-for="i in 2" :key="i">
                            <transition name="newTeXiao">
                                <div class="itemDiv" v-if="isRotateItme" key="itemDiv1">
                                    <div class="imgBox" :style="{background:'url(static/img/20.jpg) center no-repeat',backgroundSize:'cover'}"></div>
                                    <ul class="info">
                                        <li>{i.artist}</li>
                                        <li>{i.name} ，{i.time}</li>
                                        <li>{i.classfiy} {i.size.x}x{i.size.y}cm</li>
                                        <li>{i.price}</li>
                                    </ul>
                                </div>
                                <div class="itemDiv" v-else key="itemDiv2">
                                    <div class="imgBox" :style="{background:'url(static/img/21.jpg) center no-repeat',backgroundSize:'cover'}"></div>
                                    <ul class="info">
                                        <li>{i.artist}</li>
                                        <li>{i.name} ，{i.time}</li>
                                        <li>{i.classfiy} {i.size.x}x{i.size.y}cm</li>
                                        <li>{i.price}</li>
                                    </ul>
                                </div>
                            </transition>
                        </div>
                    </div>
                    <div class="right">
                        <div class="item" v-for="i in 8" :key="i">
                            <transition name="newTeXiao">
                                <div class="itemDiv" v-if="isRotateItme" key="itemDiv3">
                                    <div class="imgBox" :style="{background:'url(static/img/23.jpg) center no-repeat',backgroundSize:'cover'}"></div>
                                    <ul class="info">
                                        <li>{i.artist}</li>
                                        <li>{i.name} ，{i.time}</li>
                                        <li>{i.classfiy} {i.size.x}x{i.size.y}cm</li>
                                        <li>{i.price}</li>
                                    </ul>
                                </div>
                                <div class="itemDiv" v-else key="itemDiv4">
                                    <div class="imgBox" :style="{background:'url(static/img/22.jpg) center no-repeat',backgroundSize:'cover'}"></div>
                                    <ul class="info">
                                        <li>{i.artist}</li>
                                        <li>{i.name} ，{i.time}</li>
                                        <li>{i.classfiy} {i.size.x}x{i.size.y}cm</li>
                                        <li>{i.price}</li>
                                    </ul>
                                </div>
                            </transition>
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
            // 定时器
            timer: null,
            // 分类
            classArr: ["油画", "版画", "水墨", "水彩"],
            // 当前分类
            currClass: "油画",
            // 换一换 是否旋转flag
            rotateClass: false,
            // 最新上架数据
            newData1: [
                {
                    imgSrc: "21"
                },
                {
                    imgSrc: "22"
                },
                {
                    imgSrc: "23"
                },
                {
                    imgSrc: "23"
                },
                {
                    imgSrc: "23"
                },
                {
                    imgSrc: "23"
                },
                {
                    imgSrc: "20"
                },
                {
                    imgSrc: "20"
                },
                {
                    imgSrc: "20"
                },
                {
                    imgSrc: "20"
                }
            ],
            newData2: [
                {
                    imgSrc: "23"
                },
                {
                    imgSrc: "20"
                },
                {
                    imgSrc: "21"
                },
                {
                    imgSrc: "21"
                },
                {
                    imgSrc: "21"
                },
                {
                    imgSrc: "21"
                },
                {
                    imgSrc: "22"
                },
                {
                    imgSrc: "22"
                },
                {
                    imgSrc: "22"
                },
                {
                    imgSrc: "22"
                }
            ],
            isRotateItme: false
        };
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
        // 换一换 事件
        huanFun() {
            this.isRotateItme = !this.isRotateItme;
        }
    },
    mounted() {
        this.autoplay();
    }
};
</script>

