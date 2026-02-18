import { BucktFunc } from '../configs/gridfs.config.js'
import { MSchema } from '../models/MSchema.mdb.js'


/** @typedef {import('./Apijsonobj.d.ts').JsonObj}JsonObj */
/**
 * @param {import('express').Request} req
 * @param {import('express').Response<JsonObj>} res
 */
export const get_api_items_page_ctrl = async(req, res) => {
  try {
    const locateItem = await MSchema.find().lean()
    if (locateItem.length === 0) {
      return res.status(404).json({ APIdata: [], message: 'No data uploaded yet' });
    } else {
      const locateData = await Promise.all(
        locateItem.map(async(e)=>{
          
          const bucket = BucktFunc();
          const downloadStream = bucket.openDownloadStream(e.grifsid);
          let chunks = []; 

          for await (const chunk of downloadStream) {
            chunks.push(chunk)
          }
          
          const buffer = Buffer.concat(chunks);
          const base64 = buffer.toString('base64');

          return {
            b_id: e._id,
            b_iID: e.iID,
            b_iName: e.iName,
            b_fileurl: e.fileurl ? `/file/${e.fileurl}` : null,
            b_images: `/file/${e.fileurl}`,
            b_filedata: `data:image/*,base64,${base64.slice(0,50) + "..."}`,
            b_uploaddate: e.uploaddate
          }
        })
      )
      res.status(200).json({APIdata: locateData})
    }
  } catch (error) {
    return res.status(500).json({type: 'apiServerErr', message: 'Internal server error'})
  }
}