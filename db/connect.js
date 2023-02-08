const mongoose=require('mongoose');
//const connectionString='mongodb+srv://nilesh-dell:124421@own-cluster.vsbczr7.mongodb.net/?retryWrites=true&w=majority'

mongoose.set('strictQuery', true); // for removing the deprecation warnings
const connectDB=(url)=>{
    return mongoose.connect(url);
}
module.exports=connectDB;

/* this updated so to have server ready only if server is connected to db
mongoose.connect(connectionString).then(()=>{
    console.log("connected to db");
}).catch((e)=>{
    console.log(err);
})
*/
