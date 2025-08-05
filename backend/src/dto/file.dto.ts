import { FileableType } from "../generated/prisma";

export type FileResponse = {
   id: number;
   urlFile: string;
   fileableId: number;
   fileableType: FileableType;
}

export type UploadFile = {
   urlFile: string;
   fileableId: number;
   fileableType: FileableType;
}

export type UpdateFile = {
   urlFile: string;
}