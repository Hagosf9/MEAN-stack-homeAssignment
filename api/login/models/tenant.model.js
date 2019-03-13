const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for Tenants
let Tenant = new Schema({
    tenant_name: {
    type: String
  },
  phone_number: {
    type: String
  },
  address: {
    type: String
  },
  financial_debt: {
    type: Number
  }
},{
    collection: 'tenants'
});

mongoose.model('Tenant', Tenant);



