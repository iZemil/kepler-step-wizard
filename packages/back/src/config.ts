const {
	SERVER_PORT: appPort,
	DB_USER: dbUser,
	DB_PASS: dbPass,
	DB_PORT: dbPort,
	DB_HOST: dbHost,
	DB_NAME: dbName,
} = process.env;

export const CONFIG = {
	app: {
		port: appPort,
	},
	db: {
		user: dbUser,
		pass: dbPass,
		port: dbPort,
		host: dbHost,
		name: dbName,
	},
} as const;
