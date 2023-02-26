const mongoose=require('mongoose');

wordSchema=mongoose.Schema({ // validations are infinite
    name:{
        type:String,
        required:[true,'Name of the word must be specified'],
        trim:true,// it will save '  hero  ' as 'hero'
        maxlength:[30,'Word length should be less than 30 letters'],
        unique:[true,'Entries should be unique'],
    },
    reminder:{
        type:Boolean,
        required:false,
        default:true,
    }})
module.exports=mongoose.model('word',wordSchema);