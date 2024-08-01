const express = require('express');
const PORT = 5000
const mongoose = require('mongoose');
const Router = require('./routes/UserRoutes');
const UserModel = require('./model/UserModel');
const errorHandler = require('./middlewares/errorHandler');

const app = express()



// ? CONNECT TO THE MONGODB ? \\
mongoose.connect('mongodb+srv://AUP35:PASSWORDCOMESHERE@aup0.ah0vx64.mongodb.net/')
.then(()=>{
    console.log('Database Is Connected !')
})
.catch((error)=>{
    console.log('Something Went Wrong')
})



// ? MIDDLEWARES ? \\
app.use(express.json()) // Get Incoming Json Data 


// ? ROUTES ? \\
app.use('/',Router)


// ? ERROR HANDLER ? \\
app.use(errorHandler)


// ? START THE SERVER ? \\
app.listen(PORT,(req,res)=>{
    console.log(`Server Is Up And Running on ${PORT}. Port !`)
})