import { BucktFunc } from '../configs/gridfs.config.js';
import { MSchema } from '../models/MSchema.mdb.js';

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const get_file_by_name_ctrl = async(req, res) => {
  const files = req.params?.files;
  const locateitem = await MSchema.findOne({fileurl: files});
  if(locateitem){
    const bucket = BucktFunc();
    const downloadStream = bucket.openDownloadStream(locateitem.grifsid);
    /** @type {string} */
    const ext = files.split('.').pop().toLowerCase()

    const mimetype = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'svg': 'image/svg+xml',
      'bmp': 'image/bmp',
      'ico': 'image/x-icon',
      'tiff': 'image/tiff',
      'tif': 'image/tiff',
      'pdf': 'pdf'
    }

    const contentType = mimetype[ext];
    if(!contentType) {
      contentType = `image/${ext}`;
    } 

    if(ext.includes('pdf')){
      res.setHeader('Content-Type', 'application/octet-stream')
    } else {
      res.setHeader('Content-Type', contentType)
    }
     
    downloadStream.pipe(res)


  }
}