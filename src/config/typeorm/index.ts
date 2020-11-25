export default [
  {
		"name": "default",
		"type": "mysql",
		"host": "localhost",
		"port": 3306,
		"username": process.env.DATASOURCE_USERNAME,
		"password": process.env.DATASOURCE_PASSWORD,
		"database": "reddit",
		"synchronize": true,
		"logging": false,
		"entities": [
			"${rootDir}/entitys/**/*.ts"
		],
		"migrations": [
			"${rootDir}/migrations/**/*.ts"
		],
		"subscribers": [
			"${rootDir}/subscribers/**/*.ts"
		],
		"cli": {
			"entitiesDir": "${rootDir}/entitys",
			"migrationsDir": "${rootDir}/migrations",
			"subscribersDir": "${rootDir}/subscribers"
		}
	} as any
];
