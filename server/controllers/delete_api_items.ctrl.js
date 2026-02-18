import mongoose from 'mongoose';
import { BucktFunc } from '../configs/gridfs.config.js';
import { MSchema } from '../models/MSchema.mdb.js';

/** @typedef {import('./Apijsonobj.d.ts').JsonObj}JsonObj */


/**
 * @param {import('express').Request} req
 * @param {import('express').Response<JsonObj>} res
 */
export const delete_api_items_ctrl = async(req, res) => {
  try {
    const items = new mongoose.Types.ObjectId(req.params?.items);
    console.log('Request id for delete: ', items)
    const locate = await MSchema.findOne(items)
    if(locate) {
      
      if(locate.grifsid) {
        const bucket = BucktFunc();
        bucket.delete(locate.grifsid);
      }

      await MSchema.findOneAndDelete(items)
      return res.status(200).json({type: 'deletedone', message: 'Item Successfully deleted'})

    }
  } catch (error) {
    return res.status(500).json({message: 'internal server error'})
  }
}