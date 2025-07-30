import { CreateSubmissionRequest, GetSubmissionResponse, UpdateSubmissionRequest } from "../dto/submission.dto";
import { SubmissionStatus } from "../generated/prisma";
import { ISubmissionRepository } from "../interfaces/repositories/ISubmissionRepository";
import { ISubmissionService } from "../interfaces/services/ISubmissionSerivce";


export class SubmissionService implements ISubmissionService {
   private submissionRepository: ISubmissionRepository;

   constructor(submissionRepository: ISubmissionRepository) {
      this.submissionRepository = submissionRepository;
   }

   async getSubmissions(): Promise<GetSubmissionResponse[]> {
      try {
         return this.submissionRepository.getSubmissions();
      } catch (error: any) {
         throw new Error(`Error fetching submissions: ${error.message}`);
      }
   }

   async getSubmissionById(id: number): Promise<GetSubmissionResponse | null> {
      try {
         return this.submissionRepository.getSubmissionById(id);
      } catch (error: any) {
         throw new Error(`Error fetching submission by ID: ${error.message}`);
      }
   }

   async getSubmissionsByUserId(userId: number): Promise<GetSubmissionResponse[] | null> {
      try {
         return this.submissionRepository.getSubmissionsByUserId(userId);
      } catch (error: any) {
         throw new Error(`Error fetching submissions by user ID: ${error.message}`);
      }
   }

   async createSubmission(submission: CreateSubmissionRequest): Promise<GetSubmissionResponse> {
      try {
         return this.submissionRepository.createSubmission(submission);
      } catch (error: any) {
         throw new Error(`Error creating submission: ${error.message}`);
      }
   }

   async updateSubmission(id: number, submission: UpdateSubmissionRequest): Promise<GetSubmissionResponse> {
      try {
         return this.submissionRepository.updateSubmission(id, submission);
      } catch (error: any) {
         throw new Error(`Error updating submission: ${error.message}`);
      }
   }

   async updateSubmissionStatus(id: number, status: SubmissionStatus): Promise<GetSubmissionResponse> {
      try {
         return this.submissionRepository.updateSubmissionStatus(id, status);
      } catch (error: any) {
         throw new Error(`Error updating submission status: ${error.message}`);
      }
   }

   async deleteSubmission(id: number): Promise<void> {
      try {
         return this.submissionRepository.deleteSubmission(id);
      } catch (error: any) {
         throw new Error(`Error deleting submission: ${error.message}`);
      }
   }
}