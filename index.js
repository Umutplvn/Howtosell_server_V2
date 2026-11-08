"use strict"

/*--------------------------------------*
EXPRESSJS - How To Sell Project with Mongoose
/*--------------------------------------*/

const express=require('express')
const app=express()
require('dotenv').config()
const PORT=process.env.PORT
const HOST=process.env.HOST
const cors = require('cors');

/*--------------------------------------*/

app.use(express.json())
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://howtosell.io",
    "https://www.howtosell.io"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(express.json());
/*--------------------------------------*/
//! Connect to MongoDB with Mongoose:
const connectDB = require('./src/configs/dbConnection');

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    res.status(503).json({
      error: true,
      message: "Database connection unavailable."
    });
  }
});

/*--------------------------------------*/

//! Authorization Middleware
app.use(require("./src/middlewares/authorization"));

/*--------------------------------------*/
//! Searching&Sorting&Pagination:
app.use(require("./src/middlewares/findSearchSortPage"));

/*--------------------------------------*/

//! Routes:
app.use('/api/user', require('./src/routes/user'))
app.use('/api/control/admin', require('./src/routes/admin'))
app.use('/api/control/auth', require('./src/routes/auth'))

/*--------------------------------------*/

//! Home Page
app.get('/', (req, res)=>{
    res.send({
        err:false,
        message:'Welcome Home',
    })
})


/*--------------------------------------*/
//! errorHandler:
app.use(require('./src/errorHandler'))

/*--------------------------------------*/
app.listen(PORT, ()=>console.log(`App is running: ${HOST}:${PORT} `))

module.exports=app
