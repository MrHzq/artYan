import Vue from "vue";
import Router from "vue-router";
import index from "@/pages/index";
import originalArt from "@/pages/originalArt";
import goodsDetails from "@/pages/goodsDetails";
import login from "@/pages/login";
import shopcar from "@/pages/shopcar";
import goumai from "@/pages/goumai";
import xiadan from "@/pages/xiadan";
import zhifu from "@/pages/zhifu";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        { path: "/", redirect: "/index" },
        {
            path: "/index",
            component: index
        },
        {
            path: "/originalArt",
            component: originalArt
        },
        {
            path: "/goodsDetails/:id/imgSrc/:img",
            component: goodsDetails
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/shopcar",
            component: shopcar
        },
        {
            path: "/goumai/:status",
            component: goumai,
            children: [
                {
                    path: "xiadan",
                    component: xiadan
                },
                {
                    path: "zhifu",
                    component: zhifu
                }
            ]
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});
