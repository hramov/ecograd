import { createRouter, createWebHistory } from 'vue-router';
import Landing from '@/views/Landing.vue';
import Expertise from '@/views/Expertise.vue';
import Dashboard from '@/views/Dashboard.vue';
import Order from '@/views/Order.vue';
import { useUserStore } from '../store/user.store';
const routes = [
	{
		path: '/',
		name: 'Landing',
		component: Landing,
	},
	{
		path: '/expertise',
		name: 'Expertise',
		component: Expertise,
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: Dashboard,
	},
	{
		path: '/orders',
		name: 'Orders',
		component: Order,
	},
];
const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach(async (to, from, next) => {
	const store = useUserStore();
	if (to.path == '/dashboard') {
		store.isAdmin ? next() : next('/');
		return;
	}
	next();
});
export default router;
