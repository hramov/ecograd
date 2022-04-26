export default () => ({
	port: parseInt(process.env.PORT, 10) || 3000,
	database: {
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT, 10) || 5432,
		user: process.env.DB_USER || 'postgres',
		password: process.env.DB_PASSWORD || 'postgres',
		database: process.env.DB_NAME || 'postgres',
	},
});
