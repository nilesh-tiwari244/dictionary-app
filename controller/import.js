const Word=require('../models/word');
const asyncWrapper=require('../middleware/asyncWrapper');
const {createCustomError}=require('../errors/customError');// here only the error function

const {readFile,writeFile}=require('fs');
const util= require('util');
const readFilepro=util.promisify(readFile);
const writeFilepro=util.promisify(writeFile);

const importText=async (req,res)=>{ //done
    try{
        const fir=await readFilepro('./data-collection/words.txt','utf8');
        let wordArray=fir.split('-');
        wordArray=wordArray.map((str)=>{
            let k=str.split(' ');
            k=k[k.length -1];
            if (k!=":" && k!="" && k!=null)
            return k
        })
        wordArray=wordArray.slice(0,wordArray.length-1);
            res.status(200).json({data:wordArray,success:true,});
    }
        catch(er){
            res.status(400).json(er);
        }
}

module.exports={importText}