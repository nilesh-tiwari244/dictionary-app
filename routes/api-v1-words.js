const express=require('express');
const router=express.Router();

const {allWords,oneWordID,addWord,editWordID,deleteWordID,oneWordName,editWordName,deleteWordName}=require('../controller/api-v1-words.js');

router.route('/').get(allWords).post(addWord);
router.route('/id/:id').get(oneWordID).patch(editWordID).delete(deleteWordID);
router.route('/name/:name').get(oneWordName).patch(editWordName).delete(deleteWordName);

module.exports=router;