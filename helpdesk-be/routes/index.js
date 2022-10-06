var express = require('express');
var router = express.Router();
const {mongodb, dbname, dbUrl} = require('../config/dbConfig')
const {mongoose, issueModel, issueTypeModel} = require('../config/dbSchema')

mongoose.connect(dbUrl)

/* GET home page. */
router.get('/issue-types', async (req, res, ) => {
  try {
    let issue_types = await issueTypeModel.find({},{'issue_type':1,'_id':0})
    let issueTypes = []

    issue_types.map((e) => {
      issueTypes.push(e.issue_type)
    })
    res.send({
      statusCode: 200,
      issueTypes
    });
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal server error"
    })
  }
});

// Post req for issue types
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

// PUT req for issue types
router.put('/issue-types/:id', async (req,res) => {
  try {
    let issueType = await issueTypeModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    if(issueType) {
      issueType.issue_type = req.body.issue_type
      await issueType.save()
      res.send({
        statusCode: 200,
        message: "issue type updated successfully"
      })
    } else {
      res.send({
        statusCode: 500,
        message: "Issue type doesn't exist"
      })
    }   
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal Server Error"
    })
  }
})

// Delete issue type
router.delete('/issue-types/:id', async (req,res) => {
  try {
    let issueType = await issueTypeModel.deleteOne({_id:mongodb.ObjectId(req.params.id)})
      res.send({
        statusCode: 200,
        message: "issue type deleted successfully"
      })  
    }   
    catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal Server Error"
    })   
  }
})

// Get count
router.get('/issues-count', async (req,res) => {
  try {
    let open = await issueModel.find({status:"Open"}).count()
    let inProgress = await issueModel.find({status:"In-Progress"}).count()
    let closed = await issueModel.find({status:"Closed"}).count()

    res.send({
      statusCode: 200,
      open,
      inProgress,
      closed,
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal server error"
    })
  }
})

// Get issue by status
router.get('/issues-by-status/:status', async (req,res) => {
  try {
    let issues = await issueModel.find({status:`${req.params.status}`})
    res.send({
      statusCode: 200,
      issues,
      message: "Issue submitted successfully"
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal server error"
    })
  }
})

// Get Issues
router.get('/issues/:id', async (req,res) => {
  try {
    let issue = await issueModel.find({_id:mongodb.ObjectId(req.params.id)})
    res.send({
      statusCode: 200,
      issue,
      message: "Issue submitted successfully"
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal server error"
    })
  }
})

// Post Issues
router.post('/issues', async (req,res) => {
  try {
    let issue = await issueModel.create(req.body)
    res.send({
      statusCode: 200,
      issue_id: issue.id,
      message: "Issue submitted successfully"
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal server error"
    })
  }
})

// Update Status
router.put('/change-status/:id', async (req,res) => {
  try {
    let issue = await issueModel.findOne({_id:mongodb.ObjectId(req.params.id)})
    switch (issue.status) {
      case 'Open': issue.status="In-Progress"
        issue.inProgressDate = new Date() 
      break;
      case 'In-Progress': issue.status="Closed"
        issue.comments = req.body.comments
        issue.closedDate = new Date()   
      break;

      default:
        res.send({
          statusCode:400,
          message: "Invalid current status"
        })
      break;
    }
    let result = await issue.save()
    res.send({
      statusCode: 200,
      message: "Status changed successfully",
      result
    })
  } catch (error) {
    console.log(error)
    res.send({
      statusCode: 500,
      message: "Internal server error"
    })
  }
})

module.exports = router;