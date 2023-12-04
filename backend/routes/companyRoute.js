const express = require("express");
const router = express.Router();
const Company = require("../models/companyModel");
const bcrypt = require("bcryptjs");
const CompanyDetails = require("../models/companyDetailModel");
const College = require("../models/collegeModel");
const CollegeDetail = require("../models/collegeDetailModel");
const Token = require("../models/token.js");
const sendEmail = require("../utils/sendEmail.js");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

router.post("/register", async (req, res) => {
    try {
      const mycloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:"scale",
      })
      const companyExists = await Company.findOne({ email: req.body.email });
      if (companyExists) {
        const cloudinary = require("cloudinary");
        return res.status(200).json({
          message: "Company already exists",
          success: false,
        });
      }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    const newCompany = new Company({...req.body,
      avatar: {
        public_id: mycloud.public_id,
        url: mycloud.secure_url,
      },
    });
    await newCompany.save();
    const token = await new Token({
      userId: newCompany._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.BASE_URL}/companyregister/${newCompany._id}/verify/${token.token}`;

    await sendEmail(newCompany.email, "Verify Email", url);

    res.status(201).json({
      message: "Verification Email sent",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
      succes: false,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const company = await Company.findOne({
      email: req.body.email,
    });
    if (!company) {
      return res.status(200).send({
        message: "Company not found",
        success: false,
      });
    }

    // Check if the company is verified
    if (!company.verified) {
      return res.status(200).send({
        message: "Email not verified. Please verify your email first.",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, company.password);
    if (!isMatch) {
      return res.status(200).send({
        message: "Invalid Credentials",
        success: false,
      });
    }

    res.status(200).send({
      message: "Login successful",
      success: true,
      data: company._id,
      user: company,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/findcompany", async (req, res) => {
  try {
    const company = await Company.findOne({ _id: req.body.token }).select(
      "-password -_id"
    );
    res.status(200).send({ data: company });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/savedetails", async (req, res) => {
  try {
    const companyId = req.body.token;

    console.log(req.body);
    const companyDetails = new CompanyDetails({
      id: req.body.token,
      about: req.body.about,
      website: req.body.website,
      moto: req.body.moto,
      employees: req.body.employees,
      ethics: req.body.ethics,
      domains: req.body.domains,
      location: req.body.location,
    });
    // console.log(companyDetails);
    await companyDetails.save();

    await Company.findByIdAndUpdate(
      companyId,
      { $set: { firstLogin: false } },
      { new: true } // Return the updated document
    );

    res.status(200).send({
      message: "Details saved successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/getcompanydetail", async (req, res) => {
  try {
    const companyDetail = await CompanyDetails.findOne({ id: req.body.token });
    console.log(companyDetail);
    res.status(200).send({ data: companyDetail });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getcollegedata", async (req, res) => {
  try {
    const colleges = await College.find();
    const collegeDetails = await CollegeDetail.find();

    const allCollegeData = colleges.map((college) => {
      const collegeDetail = collegeDetails.find(
        (detail) => detail.id === college._id.toString()
      );

      return {
        _id: college._id,
        collegeName: college.collegeName,
        collegeType: college.collegeType,
        contactPerson: college.contactPerson,
        email: college.email,
        password: college.password,
        phone: college.phone,
        firstLogin: college.firstLogin,
        collegeDetail: collegeDetail,
      };
    });
    res.status(200).send({ data: allCollegeData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;

// Editing
router.post("/updatedetails", async (req, res) => {
  try {
    const companyId = req.body.token;
    const updatedData = {
      about: req.body.about,
      moto: req.body.moto,
      employees: req.body.employees,
      ethics: req.body.ethics,
      domains: req.body.domains,
      location: req.body.location,
      studentdomain: req.body.studentdomain,
      hiringperiod: req.body.hiringperiod,
      successstories: req.body.successstories,
      industrypartnership: req.body.industrypartnership,
      workculture: req.body.workculture,
    };

    const result = await CompanyDetails.findOneAndUpdate(
      { id: companyId },
      updatedData,
      { new: true }
    );

    if (result) {
      res.status(200).json({
        data: result,
        message: "Company details updated successfully",
        success: true,
      });
    } else {
      res.status(404).json({
        message: "Company not found or details not updated",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

//verify
router.get("/:id/verify/:token", async (req, res) => {
  try {
    const user = await Company.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ message: "Invalid link" });
    console.log("lol");
    console.log(user);
    console.log("User ID:", user._id);
    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ message: "Invalid link" });
    console.log("hap");
    // await College.updateOne({ _id: user._id, verified: true });
    await Company.updateOne({ _id: user._id }, { $set: { verified: true } });
    // await token.remove();
    await Token.deleteOne({ userId: user._id, token: req.params.token });
    console.log("Confirm");

    return res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).send({ message: "Intern Server Error" });
  }
});
