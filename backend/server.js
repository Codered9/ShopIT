const app = require('./app')
const connectDatabase = require('./config/database')
// const dotenv = require('dotenv')

// Handle Uncaught Exception
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server because of uncaught exception.');
    process.exit(1)
})

// Setting up config files
if(process.env.NODE_ENV !== 'PRODUCTION') {
  require('dotenv').dotenv.config({path: 'backend/config/config.env'})
}


// Connecting to the database.
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started at PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', err =>{    
        console.log(`ERROR: ${err.message}`);
        console.log('Shutting down the server because of Unhandled Promise Rejection');
        server.close(() => {
            process.exit(1)
        })
})