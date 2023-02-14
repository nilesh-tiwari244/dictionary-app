const words=require('../data.js');
const Word=require('../models/word');
const allWords=async (req,res)=>{
    const {limit}=req.query;
    try{
        let pp=await Word.find({});
        if (limit){
            pp=pp.slice(0,Number(limit));
        }
        res.status(200).json({success:true,data:pp});
    }
    catch(e){
        res.status(400).json({success:false,msg:e})
    }
}
const oneWord=(req,res)=>{
    const {id}=req.params;
    let ele=words.find((word)=>word.id===Number(id));
    if (!ele){
        return res
                .status(400)
                .json({success:false,data:{msg:`no elements with id=${id}`}})
    }
    return res.status(200).json({success:true,data:{name:ele.name,id:ele.id}})
}
const addWord= async (req,res)=>{
    const bod=req.body;
    const newWord=await Word.create(bod);
    res.status(201).json(newWord);
    /*
    const {name}=req.body;
    if (!name){
        return res
                .status(400)
                .json({success:false,msg:"please enter a word"});
    }
    for (let i=0;i<name.length;i++){
        if (name[i]===" "){
            return res
                .status(400)
                .json({success:false,msg:"please enter a word with out spaces"});
        }
    }
    res.status(200).json({success:true,data:[...words,{name:name}]})
*/
}
const editWord=(req,res)=>{
    const {id}=req.params;
    const {name}=req.body;
    let reqword=words.find((word)=>word.id===Number(id));
    if (!reqword){
        return res
                .status(400)
                .json({success:false,msg:`no such word with id= ${id}`});
    }
    let prevname=reqword.name;
    reqword.name=name;
    return res.status(200).json({success:true,data:{"previous name":prevname,"new name":name}})
}
const deleteWord=(req,res)=>{
    const {id}=req.params;
    let reqword=words.find((word)=>word.id===Number(id));
    if (!reqword){
        return res
                .status(400)
                .json({success:false,msg:`no such word with id= ${id}`});
    }
    let newlist=words.filter((word)=>word.id!=id)
    return res.status(200).json({success:true,data:newlist})
}
module.exports={allWords,oneWord,addWord,editWord,deleteWord}