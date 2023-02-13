const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');
const cors = require("cors");
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

dotenv.config({path:'config.env'})
const PORT = process.env.PORT

//log request
app.use(morgan('tiny'));

//mongoDB connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set('view engine','ejs');
// app.set('views',path.resolve(__dirname,'views/ejs'));

//load assets
app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,'/assets/img')));
app.use('/js',express.static(path.resolve(__dirname,'/assets/js')));

//load router
app.use('/',require('./server/routes/router'));

app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
});