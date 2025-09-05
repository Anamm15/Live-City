import {
  CreateSubmissionRequest,
  SubmissionResponse,
  UpdateSubmissionRequest,
} from "../../dto/submission.dto";
import { Prisma, SubmissionStatus } from "../../generated/prisma";

export interface ISubmissionRepository {
  getSubmissions(
    filter: string,
    offset: number,
    limit: number
  ): Promise<SubmissionResponse[]>;
  getSubmissionById(id: number): Promise<SubmissionResponse | null>;
  getSubmissionsByUserId(userId: number): Promise<SubmissionResponse[] | null>;
  createSubmission(
    data: CreateSubmissionRequest,
    tx: Prisma.TransactionClient
  ): Promise<SubmissionResponse>;
  updateSubmission(
    id: number,
    userId: number,
    data: UpdateSubmissionRequest
  ): Promise<SubmissionResponse>;
  updateSubmissionStatus(
    id: number,
    status: SubmissionStatus
  ): Promise<SubmissionResponse>;
  deleteSubmission(id: number, userId: number): Promise<void>;
}
