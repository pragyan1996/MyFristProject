const mongoose = require('mongoose')

const connectBD = async()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('DB connected : ',connect.connection.host, connect.connection.name);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectBD