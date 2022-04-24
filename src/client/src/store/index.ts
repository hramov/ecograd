import { createStore } from 'vuex';

/** Modules */
import expert from './expert.store';
import order from './order.store';
import auth from './auth.store';
import client from './client.store';

export default createStore({
	modules: {
		expert,
		order,
		auth,
		client,
	},
});
