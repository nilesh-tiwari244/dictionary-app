const express=require('express');
const router=express.Router();

const {importText}=require('../controller/import.js');

router.route('/').get(importText)

module.exports=router;