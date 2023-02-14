const mongoose=require('mongoose');

wordSchema=mongoose.Schema({ // validations are infinite
    name:{
        type:String,
        required:[true,'name of the word must be specified'],
        trim:true,// it will save '  hero  ' as 'hero'
        maxlength:[30,'word length should be less than 30 letters'],
    },
    reminder:{
        type:Boolean,
        required:false,
        default:true,
    }})
module.exports=mongoose.model('word',wordSchema);