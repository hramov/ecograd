import {
	createRouter,
	createWebHashHistory,
	createWebHistory,
	RouteRecordRaw,
} from 'vue-router';
import Landing from '../views/Landing.vue';
import store from './../store/index';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Landing',
		component: Landing,
	},
	{
		path: '/expertise',
		name: 'Expertise',
		component: () => import('../views/Expertise.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Login.vue'),
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('../views/dashboard/Main.vue'),
	},
	{
		path: '/client',
		name: 'Client',
		component: () => import('../views/client/Main.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	// history: createWebHashHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (to.path == '/dashboard') {
		// await store.dispatch("isAdminAction");
		store.getters.getIsAdmin ? next() : next('/');
		return;
	}
	next();
});

export default router;
