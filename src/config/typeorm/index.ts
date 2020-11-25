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
			"${rootDir}/entity/**/*.ts"
		],
		"migrations": [
			"${rootDir}/migration/**/*.ts"
		],
		"subscribers": [
			"${rootDir}/subscriber/**/*.ts"
		],
		"cli": {
			"entitiesDir": "${rootDir}/entity",
			"migrationsDir": "${rootDir}/migration",
			"subscribersDir": "${rootDir}/subscriber"
		}
	} as any
];
