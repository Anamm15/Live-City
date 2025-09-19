import cloudinary from "../config/cloudinary";
import fs from "fs";
import { UploadFile } from "../dto/file.dto";
import {
  CreateReportRequest,
  ReportResponse,
  UpdateReportRequest,
  UpdateResponseReportRequest,
} from "../dto/report.dto";
import { FileableType, Prisma, PrismaClient } from "@prisma/client";
import {
  CloudFolderName,
  LIMIT_REPORT_PAGE,
  PrefixType,
} from "../helpers/app.constants";
import { ReportMessage } from "../helpers/message.constants";
import { IFileRepository } from "../interfaces/repositories/IFileRepository";
import { IReportRepository } from "../interfaces/repositories/IReportRepository";
import { IReportService } from "../interfaces/services/IReportService";
import { NotFoundError } from "../utils/errors";
import { generateFilename } from "../utils/format";
import { generateUUIDWithPrefix } from "../utils/uuid";
import path from "path";
import {
  deleteFileFromFirebase,
  uploadFileToFirebase,
} from "../utils/firebaseStorage";

export class ReportService implements IReportService {
  private reportRepository: IReportRepository;
  private fileRepository: IFileRepository;
  private prisma: PrismaClient;

  constructor(
    reportRepository: IReportRepository,
    fileRepository: IFileRepository,
    prisma: PrismaClient
  ) {
    this.reportRepository = reportRepository;
    this.fileRepository = fileRepository;
    this.prisma = prisma;
  }

  async getReports(page: number, filter: string): Promise<ReportResponse[]> {
    try {
      if (page < 1) page = 1;
      const offset = (page - 1) * LIMIT_REPORT_PAGE;
      const reports = await this.reportRepository.getReports(
        filter,
        offset,
        LIMIT_REPORT_PAGE
      );
      if (reports.length === 0) {
        throw new NotFoundError(ReportMessage.REPORT_NOT_FOUND);
      }
      return reports;
    } catch (error) {
      throw error;
    }
  }

  async getReportById(id: number): Promise<ReportResponse | null> {
    try {
      const report = await this.reportRepository.getReportById(id);
      if (!report) {
        throw new NotFoundError(ReportMessage.REPORT_NOT_FOUND);
      }
      return report;
    } catch (error) {
      throw error;
    }
  }

  async getReportsByUserId(userId: number): Promise<ReportResponse[]> {
    try {
      const reports = await this.reportRepository.getReportsByUserId(userId);
      if (reports.length === 0) {
        throw new NotFoundError(ReportMessage.REPORT_NOT_FOUND);
      }
      return reports;
    } catch (error) {
      throw error;
    }
  }

  async createReport(
    userId: number,
    report: CreateReportRequest,
    file: Express.Multer.File
  ): Promise<ReportResponse> {
    let uploadedFilename: string | null = null;

    try {
      const uuid = generateUUIDWithPrefix(PrefixType.REPORT);
      const reportData = { ...report, userId, shortId: uuid };

      const fileExtension = path.extname(file.originalname);
      const baseFilename = generateFilename(FileableType.REPORT, uuid);
      const newFilename = `${baseFilename}${fileExtension}`;

      const signedUrl = await uploadFileToFirebase(
        file,
        CloudFolderName.REPORT,
        newFilename
      );
      uploadedFilename = newFilename;

      const result = await this.prisma.$transaction(async (tx) => {
        const newReport = await this.reportRepository.createReport(
          reportData,
          tx
        );

        await this.fileRepository.uploadFile(
          {
            urlFile: signedUrl,
            fileableId: newReport.id,
            fileableType: FileableType.REPORT,
          },
          tx
        );

        return newReport;
      });

      return result;
    } catch (error) {
      if (uploadedFilename) {
        await deleteFileFromFirebase(CloudFolderName.REPORT, uploadedFilename);
      }

      throw error;
    }
  }

  async updateReport(
    id: number,
    userId: number,
    report: UpdateReportRequest
  ): Promise<ReportResponse> {
    try {
      return this.reportRepository.updateReport(id, userId, report);
    } catch (error) {
      throw error;
    }
  }

  async updateResponseReport(
    id: number,
    report: UpdateResponseReportRequest
  ): Promise<ReportResponse> {
    try {
      return this.reportRepository.updateResponseReport(id, report);
    } catch (error) {
      throw error;
    }
  }

  async deleteReport(id: number, userId: number): Promise<void> {
    try {
      return this.reportRepository.deleteReport(id, userId);
    } catch (error) {
      throw error;
    }
  }
}
