const words=require('../data.js');
const Word=require('../models/word');
const allWords=async (req,res)=>{ //done
    const {limit}=req.query;
    try{
        let pp=await Word.find({});
        if (limit){
            pp=pp.slice(0,Number(limit));
        }
        res.status(200).json({success:true,data:pp});
    }
    catch(e){
        res.status(500).json({success:false,msg:e})
    }
}
const oneWord=async (req,res)=>{
    const {id:wordID}=req.params;
    try{
        let pg=await Word.findOne({_id:wordID});
        if (!pg){
            return res.status(404).json({success:false,msg:`no such word with id=${wordID}`})
        }
        res.status(200).json({success:true,data:pg});
    }
    catch(e){
        return res
                .status(500)
                .json({success:false,msg:e});
    }  
}
const addWord= async (req,res)=>{ // done
    const bod=req.body; // now here bod is an object
    for (let i=0;i<bod.name.length;i++){
        if (bod.name[i]===" "){
            return res
                .status(400)
                .json({success:false,msg:"please enter a word with out spaces"});
        }
    }
    const newWord=await Word.create(bod);
    res.status(201).json(newWord);
}
const editWord=async (req,res)=>{
    const {id:wordID}=req.params;
    const bod=req.body;
    try{
        let reqword=await Word.findOneAndUpdate({_id:wordID},bod,{
            new:true,
            runValidators:true,
        }); // here the third parameter is options
        // now her reqword will show the deleted word even if success
        // to see the updated word we need to add options
        // neither we will be able to add the validations on the new word
          // the above two things will happen because we dont have the options object
        if (!reqword){
            return res
                    .status(404)
                    .json({success:false,msg:`no such word with id= ${wordID}`});
        }
        res.status(200).json({success:true,data:reqword})
    }
    catch(e){
        res.status(500).json({success:false,msg:e})
    }
}
const deleteWord=async (req,res)=>{
    const {id:wordID}=req.params;
    try{
        let pg=await Word.findOneAndDelete({_id:wordID});
        if (!pg){
            return res.status(404).json({success:false,msg:`no such word with id=${wordID}`})
        }
        res.status(200).json({success:true,data:pg});
    }
    catch(e){
        return res
                .status(500)
                .json({success:false,msg:e});
    }  
}
module.exports={allWords,oneWord,addWord,editWord,deleteWord}