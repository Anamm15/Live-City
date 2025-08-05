import { CreateFamilyRequest, FamilyResponse, FamilyWithMembersResponse, UpdateFamilyRequest } from "../../dto/family.dto";

export interface IFamilyRepository {
   getFamilies(): Promise<FamilyResponse[]>;
   getFamilyWithMembers(id: number): Promise<FamilyWithMembersResponse | null>;
   createFamily(data: CreateFamilyRequest): Promise<FamilyResponse>;
   updateFamily(id: number, data: UpdateFamilyRequest): Promise<FamilyResponse>;
   deleteFamily(id: number): Promise<void>;
}
