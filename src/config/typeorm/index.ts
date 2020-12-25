export default [
  {
		"name": "default",
		"type": "mysql",
		"host": process.env.DATASOURCE_HOST,
		"port": 3306,
		"username": process.env.DATASOURCE_USERNAME,
		"password": process.env.DATASOURCE_PASSWORD,
		"database": process.env.DATASOURCE_DATABASE,
		"synchronize": true,
		"logging": false,
		"entities": [
			"${rootDir}/entities/**/*.{js,ts}"
		],
		"migrations": [
			"${rootDir}/migrations/**/*.{js,ts}"
		],
		"subscribers": [
			"${rootDir}/subscribers/**/*.{js,ts}"
		],
		"cli": {
			"entitiesDir": "${rootDir}/entities",
			"migrationsDir": "${rootDir}/migrations",
			"subscribersDir": "${rootDir}/subscribers"
		}
	} as any
];
