import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: r => require.ensure([], () => r(require('../pages/Home.vue')))
        },
        {
            path: '/insert-image',
            component: r => require.ensure([], () => r(require('../pages/InsertImage.vue')))
        },
        {
            path: '/serialize-or-parse-emotions-content',
            component: r => require.ensure([], () => r(require('../pages/SerializeOrParseEmotionsContent.vue')))
        }
    ]
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;