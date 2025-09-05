import { SubmissionCategory, SubmissionStatus } from "../generated/prisma";

export type Submission = {
  id: number;
  shortId: string;
  title: string;
  date: Date;
  category: SubmissionCategory;
  status: SubmissionStatus;
  description: string;
  userId: {
    connect: { id: number };
  };
};

export type SubmissionResponse = {
  id: number;
  shortId: string;
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
  shortId?: string;
  title: string;
  date: Date;
  category: SubmissionCategory;
  description: string;
  userId?: number;
};

export type UpdateSubmissionRequest = {
  title?: string;
  date?: Date;
  category?: SubmissionCategory;
  status?: SubmissionStatus;
  description?: string;
};
