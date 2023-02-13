let ListDB = require('../model/model');

//create & save new list
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
        res.status(400).send({message:'Content can not be empty!'});
        return
    }

    //new list
    const list = new ListDB({
        nameList : req.body.nameList,
        dateList : req.body.dateList,
        categoryList : req.body.categoryList,
        statusList : req.body.statusList
    })

    //save list in the database
    list
    .save(list)
    .then(data=>{
        // res.send(data)
        res.redirect('/add-list')
    })
    .catch(err=>{
        res.status(500).send({
            message : err.message || 'Some error occured while create list'
        })
    })
};

//retrieve & return all list, a single list
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id;

        ListDB.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send(`Not found list with id ${id}`)
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:`Error retrieving list with id ${id}`})
        })

    }else{
        ListDB.find()
    .then(list=>{
        res.send(list)
    })
    .catch(err=>{
        res.status(500).send({message : err.message || 'Error occured while retriving list information'})
    })
    }
};

//update a new identified list by list id
exports.update = (req,res)=>{
    if(!req.body){
        return res
        .status(400).send({message : 'Data to update can not be empty!'})
    }

    const id = req.params.id;
    ListDB.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(400).send({message : `Cannot update list with ${id}, Maybe list not found`})
        }else{
            res.send(data)
        }
    })
    .catch(err=>{
        res.status(500).send({message : 'Error update list information'})
    })
};

//delete a list with specified list id in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    ListDB.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message : `Cannot delete with id ${id}, Maybe id went wrong`})
        }else{
            res.send({message:`list was deleted successfully`})
        }
    })
    .catch(err=>{
        res.status(500).send({message:`Could not delete list with id ${id}`})
    })
};