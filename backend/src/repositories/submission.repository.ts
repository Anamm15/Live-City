import { CreateSubmissionRequest, GetSubmissionResponse, UpdateSubmissionRequest } from "../dto/submission.dto";
import { PrismaClient, SubmissionStatus } from "../generated/prisma";
import { ISubmissionRepository } from "../interfaces/repositories/ISubmissionRepository";
import { AppError } from "../utils/errors";

const submissionSelectFields = {
   id: true,
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
      }
   }
};

export class SubmissionRepository implements ISubmissionRepository {
   private prisma: PrismaClient;
   
   constructor(prisma: PrismaClient) {
      this.prisma = prisma;
   }
   
   async getSubmissionById(id: number): Promise<GetSubmissionResponse | null> {
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

   async getSubmissions(): Promise<GetSubmissionResponse[]> {
      try {
      const submissions = await this.prisma.submissions.findMany({
         select: submissionSelectFields
      });
      return submissions;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async getSubmissionsByUserId(userId: number): Promise<GetSubmissionResponse[] | null> {
      try {
      const submissions = await this.prisma.submissions.findMany({
            where: { userId: userId },
            select: submissionSelectFields
         });
         return submissions;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async createSubmission(submission: CreateSubmissionRequest): Promise<GetSubmissionResponse> {
      try {
         const newSubmission = await this.prisma.submissions.create({
            data: submission,
         });
         return newSubmission;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async updateSubmission(id: number, submission: UpdateSubmissionRequest): Promise<GetSubmissionResponse> {
      try {
         const updatedSubmission = await this.prisma.submissions.update({
            where: { id },
            data: submission,
         });
         return updatedSubmission;
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }

   async updateSubmissionStatus(id: number, status: SubmissionStatus): Promise<GetSubmissionResponse> {
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

   async deleteSubmission(id: number): Promise<void> {
      try {
         await this.prisma.submissions.delete({
            where: { id },
         });
      } catch (error: any) {
         throw new AppError(error.message);
      }
   }
}