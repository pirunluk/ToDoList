const mongoose = require('mongoose');

let schema = new mongoose.Schema({
    nameList:{
        type:String,
        required:true
    },
    dateList:{
        type:String,
        required:true
    },
    categoryList:String,
    statusList:{
        type:String,
        required:true
    }
});

const ListDB = mongoose.model('listdb',schema);

module.exports = ListDB;