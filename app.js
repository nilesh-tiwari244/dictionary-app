const express=require('express');
const app=express();
const path=require('path');
const routes=require('./routes/api-v1-words');
const notFound=require('./middleware/notFound.js')
const connectDB=require('./db/connect')
// require('./db/connect'); // db will be created after we added connections and the documnets

app.use(express.static('./methods-public'));
app.use(express.json());
require('dotenv').config();
app.use('/api/v1/words',routes);

app.get('/',(req,res)=>{
    app.send('./methods-public/index.html');
})
app.use(notFound);

const port=5000;

const start=async ()=>{
    try{
    await connectDB(process.env.MONGO_URI);
    console.log("connected to db")
    app.listen(port,()=>{
        console.log("its on baby");
    })}
    catch(er){
        console.log("cant connect to db",er);
    }
}
start();