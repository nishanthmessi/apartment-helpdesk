const mongodb = require('mongodb')
const dbName = 'helpdesk-mern'
const dbUrl = `mongodb+srv://nm10:88888888@cluster.5biffv2.mongodb.net/${dbName}?retryWrites=true&w=majority`


module.exports ={mongodb,dbName,dbUrl}