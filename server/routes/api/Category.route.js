const express = require('express');
const categoryrouter = express.Router();
const { createcategory, getallcategory, createquestion, getallquestion, deletecategory } = require('../../controllers/category.ctrl')
const { athenticateadmin } = require('../../middlewares/adminauth')

categoryrouter.post('/add', athenticateadmin, createcategory);
categoryrouter.post('/delete', athenticateadmin, deletecategory);
categoryrouter.get('/get', getallcategory);
categoryrouter.post('/:catname/:catid', athenticateadmin, createquestion);
categoryrouter.get('/getallquestions/:catid', athenticateadmin, getallquestion);

module.exports = categoryrouter