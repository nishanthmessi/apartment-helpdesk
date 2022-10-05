var express = require('express');
var router = express.Router();
const {mongodb, dbname, dbUrl} = require('../config/dbConfig')
const {mongoose, issueModel, issueTypeModel} = require('../config/dbSchema')

mongoose.connect(dbUrl)

/* GET home page. */
router.get('/issue-types', async (req, res, ) => {
  try {
    res.send({
      statusCode: 200,
      data: []
    });
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal server error"
    })
  }
});

router.post('/issue-types', async (req,res) => {
  try {
    let issueType = await issueTypeModel.create(req.body)
    res.send({
      statusCode: 200,
      message: "issue type created "
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal server error"
    })
  }
})

// Post req


module.exports = router;
