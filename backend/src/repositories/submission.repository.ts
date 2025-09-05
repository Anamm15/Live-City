import {
  CreateSubmissionRequest,
  SubmissionResponse,
  UpdateSubmissionRequest,
} from "../dto/submission.dto";
import { Prisma, PrismaClient } from "../generated/prisma";
import {
  SubmissionStatus,
  SubmissionStatusType,
} from "../helpers/entity.constants";
import { ISubmissionRepository } from "../interfaces/repositories/ISubmissionRepository";
import { AppError } from "../utils/errors";

const submissionSelectFields = {
  id: true,
  shortId: true,
  title: true,
  date: true,
  category: true,
  status: true,
  description: true,
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
        select: submissionSelectFields,
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
        select: submissionSelectFields,
      });
      return submission;
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
        select: submissionSelectFields,
      });
      return submissions;
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
        select: submissionSelectFields,
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
        select: submissionSelectFields,
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
