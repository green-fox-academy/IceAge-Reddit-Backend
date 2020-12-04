import './preStart'; // Must be the first import
import app from '@server';
import logger from '@shared/Logger';

import {createConnection} from "typeorm";


// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});

//connect to database
createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: process.env.DATASOURCE_USERNAME,
    password: process.env.DATASOURCE_PASSWORD,
    database: "reddit",
    entities: [
        
    ],
    synchronize: true,
    logging: false
  }).then(connection => {
    // here you can start to work with your entities
  }).catch(error => console.log(error));
