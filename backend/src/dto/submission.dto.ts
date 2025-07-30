import { SubmissionCategory, SubmissionStatus } from "../generated/prisma";

export type Submission = {
   id: number;
   title: string;
   date: Date;
   category: SubmissionCategory;
   status: SubmissionStatus;
   description: string;
   userId: {
      connect: { id: number };
   }
}

export type GetSubmissionResponse = {
   id: number;
   title: string;
   date: Date;
   category: SubmissionCategory;
   status: SubmissionStatus;
   description: string;
   user?: {
      id: number;
      name: string;
      nationalIdentityNumber: string;
      email: string | null;
      phoneNumber: string | null;
   };
};


export type CreateSubmissionRequest = {
   title: string;
   date: Date;
   category: SubmissionCategory;
   status: SubmissionStatus;
   description: string;
   userId: number;
}

export type UpdateSubmissionRequest = {
   title?: string;
   date?: Date;
   category?: SubmissionCategory;
   status?: SubmissionStatus;
   description?: string;
}