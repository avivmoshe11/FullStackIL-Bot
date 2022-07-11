//const joi = require("joi");
const mongoose = require("mongoose");
//const _ = require("lodash");

const roleSchema = new mongoose.Schema({
  roleId: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
  },
  toReturn: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 255,
    default: "aa",
  },
  view: {
    type: Boolean,
    required: false,
    minlength: 2,
    maxlength: 1024,
    default: null,
  },
  message: {
    type: Boolean,
    required: false,
    minlength: 2,
    maxlength: 1024,
    default: null,
  },
  connect: {
    type: Boolean,
    required: false,
    minlength: 2,
    maxlength: 1024,
    default: null,
  },
  manageChannel: {
    type: Boolean,
    required: false,
    minlength: 2,
    maxlength: 1024,
    default: null,
  },
  manageMessages: {
    type: Boolean,
    required: false,
    minlength: 2,
    maxlength: 1024,
    default: null,
  },
});

const Role = mongoose.model("Role", roleSchema, "roles");

module.exports = {
  Role,
};
