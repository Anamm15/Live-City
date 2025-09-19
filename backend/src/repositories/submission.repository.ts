import {
  CreateSubmissionRequest,
  SubmissionResponse,
  UpdateSubmissionRequest,
} from "../dto/submission.dto";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  FileableType,
  SubmissionStatus,
  SubmissionStatusType,
} from "../helpers/entity.constants";
import { ISubmissionRepository } from "../interfaces/repositories/ISubmissionRepository";
import { AppError } from "../utils/errors";

const submissionSelectedFields = {
  id: true,
  shortId: true,
  title: true,
  date: true,
  category: true,
  status: true,
  description: true,
};

const submissionSelectedWithUserFields = {
  ...submissionSelectedFields,
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

export class SubmissionRepository implements ISubmissionRepository {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async getSubmissions(
    filter: string,
    offset: number,
    limit: number
  ): Promise<SubmissionResponse[]> {
    try {
      const submissions = await this.prisma.submissions.findMany({
        where: {
          ...(filter &&
          SubmissionStatus.includes(filter as SubmissionStatusType)
            ? { status: filter as SubmissionStatusType }
            : {}),
        },
        select: submissionSelectedWithUserFields,
        skip: offset,
        take: limit,
        orderBy: { id: "desc" },
      });
      return submissions;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getSubmissionById(id: number): Promise<SubmissionResponse | null> {
    try {
      const submission = await this.prisma.submissions.findUnique({
        where: { id },
        select: submissionSelectedWithUserFields,
      });

      if (!submission) {
        return null;
      }
      const files = await this.prisma.files.findMany({
        where: {
          fileableType: FileableType[4],
          fileableId: submission.id,
        },
        select: {
          id: true,
          urlFile: true,
          fileableId: true,
        },
      });

      const submissionWithFiles = {
        ...submission,
        files,
      };
      return submissionWithFiles;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async getSubmissionsByUserId(
    userId: number
  ): Promise<SubmissionResponse[] | null> {
    try {
      const submissions = await this.prisma.submissions.findMany({
        where: { userId: userId },
        select: submissionSelectedWithUserFields,
      });

      if (!submissions) {
        return null;
      }
      const files = await this.prisma.files.findMany({
        where: {
          fileableType: FileableType[4],
          fileableId: { in: submissions.map((s) => s.id) },
        },
        select: {
          id: true,
          urlFile: true,
          fileableId: true,
        },
      });

      const submissionWithFiles = {
        ...submissions,
        files,
      };
      return submissionWithFiles;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async createSubmission(
    data: CreateSubmissionRequest,
    tx: Prisma.TransactionClient
  ): Promise<SubmissionResponse> {
    try {
      if (!data.userId || !data.shortId) {
        throw new AppError("userId and shortId are required");
      }
      const newSubmission = await tx.submissions.create({
        data: {
          ...data,
          shortId: data.shortId,
          userId: data.userId,
        },
        select: submissionSelectedFields,
      });
      return newSubmission;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateSubmission(
    id: number,
    userId: number,
    data: UpdateSubmissionRequest
  ): Promise<SubmissionResponse> {
    try {
      const updatedSubmission = await this.prisma.submissions.update({
        where: {
          id,
          userId,
        },
        data,
        select: submissionSelectedFields,
      });
      return updatedSubmission;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async updateSubmissionStatus(
    id: number,
    status: SubmissionStatusType
  ): Promise<SubmissionResponse> {
    try {
      const updatedSubmission = await this.prisma.submissions.update({
        where: { id },
        data: { status },
      });
      return updatedSubmission;
    } catch (error: any) {
      throw new AppError(error.message);
    }
  }

  async deleteSubmission(id: number, userId: number): Promise<void> {
    try {
      await this.prisma.submissions.delete({
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
