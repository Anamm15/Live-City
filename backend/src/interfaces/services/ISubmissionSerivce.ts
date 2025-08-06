import { 
   CreateSubmissionRequest, 
   SubmissionResponse, 
   UpdateSubmissionRequest } from "../../dto/submission.dto";
import { SubmissionStatus } from "../../generated/prisma";

export interface ISubmissionService {
   getSubmissions(page: number, filter: string): Promise<SubmissionResponse[]>;
   getSubmissionById(id: number): Promise<SubmissionResponse>;
   getSubmissionsByUserId(userId: number): Promise<SubmissionResponse[]>;
   createSubmission(submission: CreateSubmissionRequest, file: Express.Multer.File): Promise<SubmissionResponse>;
   updateSubmission(id: number, submission: UpdateSubmissionRequest): Promise<SubmissionResponse>;
   updateSubmissionStatus(id: number, status: SubmissionStatus): Promise<SubmissionResponse>;
   deleteSubmission(id: number): Promise<void>;
}