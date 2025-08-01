import { EconomicStatus } from "../generated/prisma";

export type GetFamilyResponse = {
   id: number;
   familyNumber: string;
   headFamily: string;
   economicStatus: EconomicStatus;
   address: string;
   createdAt: Date;
}

export type GetFamilyWithMembers = GetFamilyResponse & {
   users: {
      id: number;
      name: string;
      email: string | null;
      phoneNumber: string | null;
   }[];
}

export type CreateFamilyRequest = {
   familyNumber: string;
   headFamily: string;
   economicStatus: EconomicStatus;
   address: string;
}

export type UpdateFamilyRequest = {
   id?: number;
   familyNumber?: string;
   headFamily?: string;
   economicStatus?: EconomicStatus;
   address?: string;
}