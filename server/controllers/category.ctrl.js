const { v4: uuidv4 } = require('uuid');
const { CategoryModel } = require('../models/category');
const Question = require('../models/Question');

const createcategory = async(req, res) => {
    try {
			await CategoryModel.insertMany(req.body.categories);
			res.status(200).json({req: req.body.categories});
    } catch (e) {
        res.status(500).json({
            mag: 'Some error occured'
        })
    }
}

const getallcategory = async(req, res) => {
    try {
        const categories = await CategoryModel.find({})
				res.status(200).json({
						categories
				})
    } catch (e) {
        res.status(500).json({
            error: {
                msg: 'Some error occurred'
            }
        })
    }
}
const deletecategory = async(req, res) => {
	console.log(req.body)
	try {
			const categories = await CategoryModel.remove({_id:req.body.id})
			res.status(200).json({
					categories
			})
	} catch (e) {
			res.status(500).json({
					error: {
							msg: 'Some error occurred'
					}
			})
	}
}

const createquestion = async(req, res) => {
    const { catname, catid } = req.params;
    const question = req.body.question;
    try {
        if (question.length <= 4) {
            res.status(404).json({
                error: {
                    msg: "Question is too short"
                }
            })
        } else {
            const newquestion = new Question({...req.body, categoryid: catid });
            await newquestion.save();
            if (newquestion) {
                const findcategory = await CategoryModel.updateOne({ _id: catid }, {
                    $push: {
                        catquestions: newquestion
                    }
                });
                res.status(200).json({
                    msg: 'Question is successfully created'
                })
            } else {
                res.status(400).json({
                    msg: "Something went wrong"
                })
            }
        }
    } catch (e) {
        res.status(500).json({
            error: {
                msg: e.message
            }
        })
    }
}

const getallquestion = async(req, res) => {
    try {
        const { catid } = req.params;
        const getquestions = await Question.find({ categoryid: catid }).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 });
        if (getquestions.length <= 0) {
            res.status(404).json({
                questions: 'No questions found int this category...'
            })
        } else {
            res.status(200).json({
                questions: getquestions
            })
        }
    } catch (e) {
        res.status(500).json({
            questions: 'Something went wrong'
        })
    }
}

module.exports = {
    createcategory,
    getallcategory,
    createquestion,
    getallquestion,
		deletecategory
}