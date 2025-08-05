import { FileResponse, UpdateFile, UploadFile } from '../../dto/file.dto';
import { Prisma } from '../../generated/prisma';

export interface IFileRepository {
   getFile(id: number): Promise<FileResponse | null>;
   uploadFile(data: UploadFile, tx: Prisma.TransactionClient): Promise<FileResponse>;
   updateFile(id: number, data: UpdateFile): Promise<FileResponse>;
   deleteFile(id: number): Promise<void>;
}