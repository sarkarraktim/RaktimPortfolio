import express from 'express';
import { get_upload_page_ctrl } from '../controllers/get_upload_page.ctrl.js';
import { post_upload_page_ctrl } from '../controllers/post_upload_page.ctrl.js';
import multer from 'multer';
import { get_items_page_ctrl } from '../controllers/get_items_page.ctrl.js';
import { get_api_items_page_ctrl } from '../controllers/get_api_items_page.ctrl.js';
import { get_file_by_name_ctrl } from '../controllers/get_file_by_name.ctrl.js';
import { delete_api_items_ctrl } from '../controllers/delete_api_items.ctrl.js';
const router = express.Router();

const MulterUpload = multer({storage: multer.memoryStorage()})

// Upload Page:
router.get('/', get_upload_page_ctrl);
router.post('/upload', MulterUpload.single('ItemFILE'), post_upload_page_ctrl);

// Items Page:
router.get('/items', get_items_page_ctrl);

// API fetching data from database:
router.get('/api/items', get_api_items_page_ctrl);
router.get('/file/:files', get_file_by_name_ctrl);

// API delete file from database:
router.delete('/api/file/:items', delete_api_items_ctrl)

export { router as serverRouter }