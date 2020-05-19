const mongoose = require("mongoose");
const mConnect = require("dotenv")

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 500,
            poolSize: 5,
            connectTimeoutMS: 10000,
            family: 4
        };
        mongoose.connect(`${process.env.mConnect}`, dbOptions);
        mongoose.set('useFindAndModify', false);
        mongoose.Promise = global.Promise;
        mongoose.connection.on('connected', () =>{
            console.log('Database established.');
        });

        mongoose.connection.on('err', err =>{
            console.error(`Connection cut, please fix it. \n${err.stack}`);
        });

        mongoose.connection.on('disconnect', () =>{
            console.warn('Connection was lost, fucking fix it.')
        })

    }
}