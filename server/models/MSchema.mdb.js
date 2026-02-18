import mongoose from "mongoose";

// i = item
const dataschema = new mongoose.Schema({
  iName: {type: String},
  iID: {type: Number},
  fileurl: {type: String},
  grifsid: {type: mongoose.Types.ObjectId},
  uploaddate: {type: Date, default: Date.now}

}, {versionKey: false, collection: 'portfoliodatas'});

export const MSchema = mongoose.model('files', dataschema);