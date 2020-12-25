export default [
  {
		"name": "default",
		"type": "mysql",
		"host": "eu-cdbr-west-03.cleardb.net",
		"port": 3306,
		"username": "b5fdcf5b34d279",
		"password": "34cd62fd",
		"database": "heroku_ec936bad620fb1c",
		"synchronize": true,
		"logging": false,
		"entities": [
			"${rootDir}/entities/**/*.ts"
		],
		"migrations": [
			"${rootDir}/migrations/**/*.ts"
		],
		"subscribers": [
			"${rootDir}/subscribers/**/*.ts"
		],
		"cli": {
			"entitiesDir": "${rootDir}/entities",
			"migrationsDir": "${rootDir}/migrations",
			"subscribersDir": "${rootDir}/subscribers"
		}
	} as any
];
