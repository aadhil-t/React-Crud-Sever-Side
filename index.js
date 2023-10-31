const express=require('express')
const app=express()
const cors=require('cors')

const mongoose=require('mongoose')
mongoose.connect('mongodb://0.0.0.0:27017/crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log('mongoose connected');
}).catch((err)=>{
    console.log(err.message);
})

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:['http://localhost:3000'],
    method:['GET','POST'],
    credentials:true
}))

const userRoutes = require('./Routes/UserRoutes')
app.use('/',userRoutes)

const adminRoutes = require('./Routes/adminRoutes');
app.use('/admin',adminRoutes)

app.listen(4004,()=>{
    console.log('server running at 4000');
})