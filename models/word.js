const mongoose=require('mongoose');

wordSchema=mongoose.Schema({
    name:String,reminder:Boolean
})
module.exports=mongoose.model('word',wordSchema);