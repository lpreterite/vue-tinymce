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
            path: '/article',
            component: r => require.ensure([], () => r(require('../pages/Article.vue')))
        }
    ]
});

router.beforeEach((to, from, next) => {
    next();
});

export default router;