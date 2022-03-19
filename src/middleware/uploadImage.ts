import multer from "multer";

export const uploadImage = multer({
  dest: "images",
});
