export interface ISubmissionController {
   createSubmission(userId: string, content: string): Promise<Submission>;
   getSubmissionsByUserId(userId: string): Promise<Submission[]>;
   updateSubmission(submissionId: string, content: string): Promise<Submission>;
   deleteSubmission(submissionId: string): Promise<void>;
}