import { EconomicStatus } from "../generated/prisma";

export type FamilyResponse = {
   id: number;
   familyNumber: string;
   headFamily: string;
   economicStatus: EconomicStatus;
   address: string;
   createdAt: Date;
}

export type FamilyWithMembersResponse = FamilyResponse & {
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
   familyNumber?: string;
   headFamily?: string;
   economicStatus?: EconomicStatus;
   address?: string;
}