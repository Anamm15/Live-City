import { 
   CreateFamilyRequest, 
   FamilyResponse, 
   FamilyWithMembersResponse, 
   UpdateFamilyRequest } from "../../dto/family.dto";

export interface IFamilyService {
   getFamilies(): Promise<FamilyResponse[]>;
   getFamilyWithMembers(id: number): Promise<FamilyWithMembersResponse>;
   createFamily(family: CreateFamilyRequest): Promise<FamilyResponse>;
   updateFamily(id:number, family: UpdateFamilyRequest): Promise<FamilyResponse>;
   deleteFamily(id: number): Promise<void>;
}