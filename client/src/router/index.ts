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
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import('../views/dashboard/Main.vue'),
	},
	{
		path: '/client',
		name: 'Client',
		component: () => import('../views/client/Main.vue'),
	},
	{
		path: '/add-order',
		name: 'AddOrder',
		component: () => import('../views/order/AddOrder.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

router.beforeEach(async (to, from, next) => {
	if (to.path == '/dashboard') {
		store.getters.getIsAdmin ? next() : next('/');
		return;
	}
	next();
});

export default router;
