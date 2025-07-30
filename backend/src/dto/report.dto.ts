import { ReportStatus, ReportCategory } from "../generated/prisma";

export type GetReportResponse = {
   id: number;
   title: string;
   description: string;
   category: ReportCategory;
   status: ReportStatus;
   response: string | null;
   user?: {
      id: number;
      name: string;
      nationalIdentityNumber: string;
      email: string | null;
      phoneNumber: string | null;
   };
}

export type CreateReportRequest = {
   title: string;
   description: string;
   category: ReportCategory;
   status: ReportStatus;
   userId: number;
}

export type UpdateReportRequest = {
   title?: string;
   description?: string;
   category?: ReportCategory;
}

export type UpdateResponseReportRequest = {
   response?: string;
   status?: ReportStatus;
}