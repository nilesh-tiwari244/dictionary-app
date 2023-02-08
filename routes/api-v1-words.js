const express=require('express');
const router=express.Router();

const {allWords,oneWord,addWord,editWord,deleteWord}=require('../controller/api-v1-words.js');

router.route('/').get(allWords).post(addWord);
router.route('/:id').get(oneWord).put(editWord).delete(deleteWord);

module.exports=router;