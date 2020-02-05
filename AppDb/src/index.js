const http = require('http');
const config = require('./config');
const db = require('./db');


// const app = express();



const app = require('./app');


const server = http.createServer(app);

server.listen(config.PORT, '0.0.0.0', () => {
    console.log(`app is listening on ${config.PORT}`);
});

const closeDb = () => db.close();

process.on('SIGINT', closeDb);
process.on('exit', closeDb);
