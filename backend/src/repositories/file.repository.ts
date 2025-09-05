import { UploadFile, FileResponse, UpdateFile } from "../dto/file.dto";
import { Prisma, PrismaClient } from "../generated/prisma";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { AppError } from "../utils/errors";

const selectedFileFields = {
  id: true,
  urlFile: true,
  fileableId: true,
  fileableType: true,
};

export class FileRepository implements IFileRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getFile(id: number): Promise<FileResponse | null> {
    try {
      const file = await this.prisma.files.findUnique({
        where: { id },
        select: selectedFileFields,
      });
      return file;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async uploadFile(
    data: UploadFile,
    tx: Prisma.TransactionClient
  ): Promise<FileResponse> {
    try {
      const newFile = await tx.files.create({
        data,
        select: selectedFileFields,
      });
      return newFile;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateFile(id: number, data: UpdateFile): Promise<FileResponse> {
    try {
      const updatedFile = await this.prisma.files.update({
        where: { id },
        data,
        select: selectedFileFields,
      });
      return updatedFile;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async deleteFile(id: number): Promise<void> {
    try {
      await this.prisma.files.delete({
        where: { id },
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
