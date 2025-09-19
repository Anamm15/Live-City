import fs from "fs";
import { bucket } from "../config/firebase";

/**
 * Upload file ke Firebase Storage
 * @param file Multer file (diskStorage)
 * @param folder Nama folder di Firebase (misalnya "submissions")
 * @param newFilename Nama file yang akan disimpan di Firebase
 * @returns Signed URL file yang bisa diakses
 */
export async function uploadFileToFirebase(
  file: Express.Multer.File,
  folder: string,
  newFilename: string
): Promise<string> {
  const fileBuffer = fs.readFileSync(file.path);
  const blob = bucket.file(`${folder}/${newFilename}`);

  await blob.save(fileBuffer, {
    metadata: { contentType: file.mimetype },
  });

  fs.unlinkSync(file.path);

  const [signedUrl] = await blob.getSignedUrl({
    action: "read",
    expires: "03-01-2030",
  });

  return signedUrl;
}

/**
 * Hapus file dari Firebase Storage
 * @param folder Folder tempat file berada
 * @param filename Nama file yang disimpan di Firebase
 */
export async function deleteFileFromFirebase(
  folder: string,
  filename: string
): Promise<void> {
  const fileRef = bucket.file(`${folder}/${filename}`);
  await fileRef.delete().catch(() => {
    // Supaya gak crash kalau file memang tidak ada
  });
}
