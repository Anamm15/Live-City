import cloudinary from "../config/cloudinary";
import { UploadFile } from "../dto/file.dto";
import fs from "fs";
import {
  CreateSubmissionRequest,
  SubmissionResponse,
  UpdateSubmissionRequest,
} from "../dto/submission.dto";
import {
  FileableType,
  Prisma,
  PrismaClient,
  SubmissionStatus,
} from "@prisma/client";
import {
  CloudFolderName,
  LIMIT_SUBMISSION_PAGE,
  PrefixType,
} from "../helpers/app.constants";
import { SubmissionMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { ISubmissionRepository } from "../interfaces/repositories/ISubmissionRepository";
import { ISubmissionService } from "../interfaces/services/ISubmissionSerivce";
import { NotFoundError } from "../utils/errors";
import { generateFilename } from "../utils/format";
import { generateUUIDWithPrefix } from "../utils/uuid";

export class SubmissionService implements ISubmissionService {
  private submissionRepository: ISubmissionRepository;
  private fileRepository: IFileRepository;
  private prisma: PrismaClient;

  constructor(
    submissionRepository: ISubmissionRepository,
    fileRepository: IFileRepository,
    prisma: PrismaClient
  ) {
    this.submissionRepository = submissionRepository;
    this.fileRepository = fileRepository;
    this.prisma = prisma;
  }

  async getSubmissions(
    page: number,
    filter: string
  ): Promise<SubmissionResponse[]> {
    try {
      if (page < 1) page = 1;
      const offset = (page - 1) * LIMIT_SUBMISSION_PAGE;
      const submissions = await this.submissionRepository.getSubmissions(
        filter,
        offset,
        LIMIT_SUBMISSION_PAGE
      );
      if (submissions.length === 0) {
        throw new NotFoundError(SubmissionMessage.SUBMISSION_NOT_FOUND);
      }
      return submissions;
    } catch (error) {
      throw error;
    }
  }

  async getSubmissionById(id: number): Promise<SubmissionResponse> {
    try {
      const submission = await this.submissionRepository.getSubmissionById(id);
      if (!submission) {
        throw new NotFoundError(SubmissionMessage.SUBMISSION_NOT_FOUND);
      }
      return submission;
    } catch (error) {
      throw error;
    }
  }

  async getSubmissionsByUserId(userId: number): Promise<SubmissionResponse[]> {
    try {
      const submissions =
        await this.submissionRepository.getSubmissionsByUserId(userId);
      if (!submissions) {
        throw new NotFoundError(SubmissionMessage.SUBMISSION_NOT_FOUND);
      }
      return submissions;
    } catch (error) {
      throw error;
    }
  }

  async createSubmission(
    userId: number,
    submission: CreateSubmissionRequest,
    file: Express.Multer.File
  ): Promise<SubmissionResponse> {
    let cloudinaryResult: any | null = null;
    let data: CreateSubmissionRequest = { ...submission, userId };
    return await this.prisma.$transaction(
      async (tx: Prisma.TransactionClient) => {
        try {
          data.shortId = generateUUIDWithPrefix(PrefixType.SUBMISSION);
          const newSubmission =
            await this.submissionRepository.createSubmission(data, tx);
          const newFilename = generateFilename(
            FileableType.SUBMISSION,
            newSubmission.id
          );
          cloudinaryResult = await cloudinary.uploader.upload(file.path, {
            folder: CloudFolderName.SUBMISSION,
            public_id: newFilename,
          });

          fs.unlinkSync(file.path);
          const fileData: UploadFile = {
            urlFile: cloudinaryResult.secure_url,
            fileableId: newSubmission.id,
            fileableType: FileableType.SUBMISSION,
          };
          await this.fileRepository.uploadFile(fileData, tx);
          return newSubmission;
        } catch (error) {
          if (cloudinaryResult?.public_id) {
            await cloudinary.uploader.destroy(cloudinaryResult.public_id);
          }
          throw error;
        }
      }
    );
  }

  async updateSubmission(
    id: number,
    userId: number,
    submission: UpdateSubmissionRequest
  ): Promise<SubmissionResponse> {
    try {
      return this.submissionRepository.updateSubmission(id, userId, submission);
    } catch (error) {
      throw error;
    }
  }

  async updateSubmissionStatus(
    id: number,
    status: SubmissionStatus
  ): Promise<SubmissionResponse> {
    try {
      return this.submissionRepository.updateSubmissionStatus(id, status);
    } catch (error) {
      throw error;
    }
  }

  async deleteSubmission(id: number, userId: number): Promise<void> {
    try {
      return this.submissionRepository.deleteSubmission(id, userId);
    } catch (error) {
      throw error;
    }
  }
}
