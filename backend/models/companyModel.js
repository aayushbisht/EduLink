const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyType: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  firstLogin: {
    type: Boolean,  
    default: true,  
  },
  verified:{
    type: Boolean,
    default : false,
  },
  avatar:
        {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        },
      },
});

module.exports = mongoose.model("companies", companySchema);