import { 
   CreateSubmissionRequest, 
   SubmissionResponse, 
   UpdateSubmissionRequest } from "../../dto/submission.dto";
import { SubmissionStatus } from "../../generated/prisma";

export interface ISubmissionRepository {
   getSubmissions(filter: string, offset: number, limit: number): Promise<SubmissionResponse[]>;
   getSubmissionById(id: number): Promise<SubmissionResponse | null>;
   getSubmissionsByUserId(userId: number): Promise<SubmissionResponse[] | null>;
   createSubmission(data: CreateSubmissionRequest): Promise<SubmissionResponse>;
   updateSubmission(id: number, data: UpdateSubmissionRequest): Promise<SubmissionResponse>;
   updateSubmissionStatus(id: number, status: SubmissionStatus): Promise<SubmissionResponse>;
   deleteSubmission(id: number): Promise<void>;
}