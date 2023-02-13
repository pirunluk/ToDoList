const express = require('express');
const route = express.Router();
const services = require('../services/render');
const controller = require('../controller/controller');

route.get('/',services.homeRoutes);
route.get('/add-list',services.add_list);
route.get('/update-list',services.update_list);

//API
route.post('/api/lists',controller.create);
route.get('/api/lists',controller.find);
route.put('/api/lists/:id',controller.update);
route.delete('/api/lists/:id',controller.delete);

module.exports = route;