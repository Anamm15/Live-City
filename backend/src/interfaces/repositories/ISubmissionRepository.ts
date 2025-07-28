export interface ISubmissionRepository {
   getSubmissions(): Promise<Submission[]>;
   getSubmissionById(submissionId: string): Promise<Submission | null>;
   getSubmissionsByUserId(userId: string): Promise<Submission[]>;
   createSubmission(submission: Submission): Promise<Submission>;
   updateSubmissionStatus(submissionId: string, status: string): Promise<Submission>;
   updateSubmission(submission: Submission): Promise<Submission>;
   deleteSubmission(submissionId: string): Promise<void>;
}