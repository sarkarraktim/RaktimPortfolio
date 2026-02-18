import { GridFSBucket } from "mongodb";
import mongoose from "mongoose";

let bucket;

export const InitializeGridFS = () => {
  bucket = new GridFSBucket(mongoose.connection.db);
  return bucket;
}

/** @returns {import('mongodb').GridFSBucket} */
export const BucktFunc = () => bucket