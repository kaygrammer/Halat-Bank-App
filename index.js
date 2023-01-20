const express = require("express")
const app = express()
const connectDB = require("./db/connect")
const userRoute = require('./routes/users')
const adminRoute = require('./routes/admin')
require('dotenv').config()

app.use(express.json())

const port = process.env.PORT || 3000

app.get('/home', (req, res)=>{
    res.send('hello world')
})
app.use('/api/v1/users',userRoute)
app.use('/api/v1/admin',adminRoute)

const start = async () =>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to the port ${port}....`))
    }catch(error){
        console.log(error);
    }
}
start()
