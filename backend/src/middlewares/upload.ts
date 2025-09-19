import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  console.log(`Uploading file with mimetype: ${file.mimetype}`);
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
