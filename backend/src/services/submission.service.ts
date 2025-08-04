import { CreateSubmissionRequest, GetSubmissionResponse, UpdateSubmissionRequest } from "../dto/submission.dto";
import { SubmissionStatus } from "../generated/prisma";
import { SubmissionMessage } from "../helpers/message.constants";
import { ISubmissionRepository } from "../interfaces/repositories/ISubmissionRepository";
import { ISubmissionService } from "../interfaces/services/ISubmissionSerivce";
import { NotFoundError } from "../utils/errors";


export class SubmissionService implements ISubmissionService {
   private submissionRepository: ISubmissionRepository;

   constructor(submissionRepository: ISubmissionRepository) {
      this.submissionRepository = submissionRepository;
   }

   async getSubmissions(): Promise<GetSubmissionResponse[]> {
      try {
         const submissions = await this.submissionRepository.getSubmissions();
         if (submissions.length === 0) {
            throw new NotFoundError(SubmissionMessage.SUBMISSION_NOT_FOUND);
         }
         return submissions;
      } catch (error) {
         throw error;
      }
   }

   async getSubmissionById(id: number): Promise<GetSubmissionResponse> {
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

   async getSubmissionsByUserId(userId: number): Promise<GetSubmissionResponse[]> {
      try {
         const submissions = await this.submissionRepository.getSubmissionsByUserId(userId);
         if (!submissions) {
            throw new NotFoundError(SubmissionMessage.SUBMISSION_NOT_FOUND);
         }
         return submissions;
      } catch (error) {
         throw error;
      }
   }

   async createSubmission(submission: CreateSubmissionRequest): Promise<GetSubmissionResponse> {
      try {
         return this.submissionRepository.createSubmission(submission);
      } catch (error) {
         throw error;
      }
   }

   async updateSubmission(id: number, submission: UpdateSubmissionRequest): Promise<GetSubmissionResponse> {
      try {
         return this.submissionRepository.updateSubmission(id, submission);
      } catch (error) {
         throw error;
      }
   }

   async updateSubmissionStatus(id: number, status: SubmissionStatus): Promise<GetSubmissionResponse> {
      try {
         return this.submissionRepository.updateSubmissionStatus(id, status);
      } catch (error) {
         throw error;
      }
   }

   async deleteSubmission(id: number): Promise<void> {
      try {
         return this.submissionRepository.deleteSubmission(id);
      } catch (error) {
         throw error;
      }
   }
}