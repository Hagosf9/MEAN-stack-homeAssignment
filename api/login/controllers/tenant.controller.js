const mongoose = require('mongoose');
const _ = require('lodash');
// Require tenant data model in our routes module
const Tenant = mongoose.model('Tenant');


module.exports.add =function (req, res) {
    let tenant = new Tenant(req.body);
    tenant.save()
      .then(tenant => {
        res.status(200).json({ 'tenant': 'tenant in added successfully' });
      })
      .catch(err => {
        res.status(400).send("unable to save to database");
      });
  }


  module.exports.getData =  (req, res) => {
    Tenant.find(function (err, tenants) {
      if (err) {
        console.log(err);
      }
      else {
        res.json(tenants);
      }
    });
  }


  module.exports.editTenant = (req, res) => {
    let id = req.params.id;
    Tenant.findById(id, function (err, tenant) {
      res.json(tenant);
    });
  };
  


  module.exports.updateTenant = function (req, res) {
    Tenant.findById(req.params.id, function (err, tenant) {
      if (!tenant)
        return next(new Error('Could not load Document'));
      else {
        tenant.tenant_name = req.body.tenant_name;
        tenant.phone_number = req.body.phone_number;
        tenant.address = req.body.address;
        tenant.financial_debt = req.body.financial_debt;
  
        tenant.save().then(tenant => {
          res.json('Update complete');
        })
          .catch(err => {
            res.status(400).send("unable to update the database");
          });
      }
    });
  };

  module.exports.deleteTenant = (req, res) => {
    Tenant.findByIdAndRemove({_id: req.params.id}, function(err, tenants){
      if (err) res.json(err);
      else res.json('Successfully removed');
    });
  };