require('dotenv').config()
const express = require('express')
const mongoose= require('mongoose')
const cors=require('cors')
const fileUpload= require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express();
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))
app.use('/user', require('./routers/userRouter'))
app.use('/api', require('./routers/categoryRouter'))
app.use('/api', require('./routers/productRouter'))
app.use('/api', require('./routers/upload'))
// connect to mongodb
const URI = process.env.MONGODB_URL;

mongoose.connect(URI, {
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
}, err =>{
    if(err) throw err;
    console.log('Connected to DB')
})

app.get('/', (req,res)=>{
    res.json({msg:'welcome to the ecommecr world '})
})
const PORT = process.env.PORT || 5000


app.listen(PORT , ()=>{
    console.log('server is up and running', PORT)
})