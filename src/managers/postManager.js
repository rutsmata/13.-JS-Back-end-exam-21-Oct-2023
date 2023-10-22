const Electronic = require("../models/Electronic");

exports.create = (postData) => Electronic.create(postData);

exports.getAll = () => Electronic.find().populate("owner"); 

exports.getOne = (postId) => Electronic.findById(postId).populate("owner"); 

exports.delete = (postId) => Electronic.findByIdAndDelete(postId); 

exports.edit = (postId, postData) => Electronic.findByIdAndUpdate(postId, postData); 

