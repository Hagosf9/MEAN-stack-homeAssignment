const express = require('express');
const ctrlTenant = require('../controllers/tenant.controller');
const tenantRouter = express.Router();


// Defined store route
tenantRouter.route('/add').post(ctrlTenant.add);


// Defined get data(index or listing) route
tenantRouter.route('/').get(ctrlTenant.getData);


// Defined edit route
tenantRouter.route('/edit/:id').get(ctrlTenant.editTenant);
  
  
//  Defined update route
tenantRouter.route('/update/:id').post(ctrlTenant.updateTenant);
  
// Defined delete
tenantRouter.route('/delete/:id').get(ctrlTenant.deleteTenant);
  

module.exports = tenantRouter;;