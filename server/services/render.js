const axios = require('axios');
const { response } = require('express');

exports.homeRoutes = (req,res)=>{
    //Make a get request to /api/lists
    axios.get('http://localhost:5555/api/lists')
    .then(function(response){
        res.render('index.ejs',{lists:response.data})
    })
    .catch(err=>{
        res.send(err)
    })
};

exports.add_list = (req,res)=>{
    res.render('add-list.ejs')
};

exports.update_list = (req,res)=>{
    axios.get('http://localhost:5555/api/lists',{params:{id:req.query.id}})
    .then(function(listData){
        res.render('update-list.ejs',{list:listData.data})
    })
    .catch(err=>{
        res.send(err)
    })
};