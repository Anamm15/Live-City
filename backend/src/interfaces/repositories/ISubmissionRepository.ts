import { CreateSubmissionRequest, GetSubmissionResponse, UpdateSubmissionRequest } from "../../dto/submission.dto";
import { SubmissionStatus } from "../../generated/prisma";

export interface ISubmissionRepository {
   getSubmissions(): Promise<GetSubmissionResponse[]>;
   getSubmissionById(id: number): Promise<GetSubmissionResponse | null>;
   getSubmissionsByUserId(userId: number): Promise<GetSubmissionResponse[] | null>;
   createSubmission(submission: CreateSubmissionRequest): Promise<GetSubmissionResponse>;
   updateSubmission(id: number, submission: UpdateSubmissionRequest): Promise<GetSubmissionResponse>;
   updateSubmissionStatus(id: number, status: SubmissionStatus): Promise<GetSubmissionResponse>;
   deleteSubmission(id: number): Promise<void>;
}