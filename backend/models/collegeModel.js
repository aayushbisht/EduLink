const mongoose = require("mongoose");

const collegeSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
  },
  collegeType: {
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
        },
        url:{
            type:String,
        },
      },

});

module.exports = mongoose.model("colleges", collegeSchema);