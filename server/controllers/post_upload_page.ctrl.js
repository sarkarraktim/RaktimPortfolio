import { BucktFunc } from '../configs/gridfs.config.js';
import { MSchema } from '../models/MSchema.mdb.js';


/** @typedef {import('./Apijsonobj.d.ts').JsonObj}JsonObj */
/**
 * @param {import('express').Request} req
 * @param {import('express').Response<JsonObj>} res
 */
export const post_upload_page_ctrl = async(req, res) => {
  try {
    // i = item
    const { ItemNAME, ItemID } = req.body ?? null;
    const Cfile = req.file ?? null;
    console.log("Upload request from user: ", Cfile);
    const locate_iName = await MSchema.findOne({iName: ItemNAME});
    const locate_iID = await MSchema.findOne({iID: ItemID});
    if(locate_iName){
      return res.status(409).json({type: 'NameCought', message: 'This itemName is already exists'});
    } else if(locate_iID){
      return res.status(409).json({ type: 'IdCought', message: 'This itemID is already exists'});
    } else {
      
      const bucket = BucktFunc();
      const uploadStream = bucket.openUploadStream(Cfile.originalname);
      uploadStream.end(Cfile.buffer)
  
      uploadStream.on('finish', async()=>{
        const savetodb = await MSchema.create({
          iName: ItemNAME,
          iID: ItemID,
          fileurl: Cfile.originalname,
          grifsid: uploadStream.id
        })
        console.log("What send to database from client: ", savetodb);
        return res.status(201).json({type:'uploadDone', message: 'File uploaded successfully'})
      })
  
      uploadStream.on('error', (err)=>{
        console.log(err);
        return res.status(404).json({type: 'nofile', message: 'File Not Found'})
      })

    }

  } catch (error) {
    return res.status(500).json({ type: 'postberr', message: `internal server error`})
  }
}