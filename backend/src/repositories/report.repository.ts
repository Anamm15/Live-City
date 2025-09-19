import {
  CreateReportRequest,
  ReportResponse,
  UpdateReportRequest,
  UpdateResponseReportRequest,
} from "../dto/report.dto";
import { Prisma, PrismaClient } from "@prisma/client";
import { ReportStatus, ReportStatusType } from "../helpers/entity.constants";
import { IReportRepository } from "../interfaces/repositories/IReportRepository";
import { AppError } from "../utils/errors";

const reportSelectedFields = {
  id: true,
  shortId: true,
  title: true,
  description: true,
  category: true,
  status: true,
  response: true,
};

const reportSelectedWithUserFields = {
  ...reportSelectedFields,
  user: {
    select: {
      id: true,
      name: true,
      nationalIdentityNumber: true,
      email: true,
      phoneNumber: true,
    },
  },
};

export class ReportRepository implements IReportRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getReports(
    filter: string,
    offset: number,
    limit: number
  ): Promise<ReportResponse[]> {
    try {
      const reports = await this.prisma.reports.findMany({
        where: {
          ...(filter && ReportStatus.includes(filter as ReportStatusType)
            ? { status: filter as ReportStatusType }
            : {}),
        },
        select: reportSelectedWithUserFields,
        skip: offset,
        take: limit,
        orderBy: { id: "desc" },
      });
      return reports;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getReportById(id: number): Promise<ReportResponse | null> {
    try {
      const report = await this.prisma.reports.findUnique({
        where: { id },
        select: reportSelectedWithUserFields,
      });
      return report;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getReportsByUserId(userId: number): Promise<ReportResponse[]> {
    try {
      const reports = await this.prisma.reports.findMany({
        where: { userId },
        select: reportSelectedWithUserFields,
      });
      return reports;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async createReport(
    data: CreateReportRequest,
    tx: Prisma.TransactionClient
  ): Promise<ReportResponse> {
    try {
      if (!data.userId || !data.shortId) {
        throw new AppError("userId and shortId are required");
      }
      const newReport = await tx.reports.create({
        data: {
          ...data,
          shortId: data.shortId,
          userId: data.userId,
        },
        select: reportSelectedFields,
      });
      return newReport;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateReport(
    id: number,
    userId: number,
    data: UpdateReportRequest
  ): Promise<ReportResponse> {
    try {
      const updatedReport = await this.prisma.reports.update({
        where: {
          id,
          userId,
        },
        data,
        select: reportSelectedFields,
      });
      return updatedReport;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateResponseReport(
    id: number,
    data: UpdateResponseReportRequest
  ): Promise<ReportResponse> {
    try {
      const updatedReport = await this.prisma.reports.update({
        where: { id: id },
        data,
        select: reportSelectedFields,
      });
      return updatedReport;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async deleteReport(id: number, userId: number): Promise<void> {
    try {
      await this.prisma.reports.delete({
        where: {
          id,
          userId,
        },
      });
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }
}
