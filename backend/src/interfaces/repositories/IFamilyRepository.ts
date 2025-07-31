import { CreateFamilyRequest, GetFamilyResponse, GetFamilyWithMembers, UpdateFamilyRequest } from "../../dto/family.dto";

export interface IFamilyRepository {
   getFamilies(): Promise<GetFamilyResponse[]>;
   getFamilyWithMembers(id: number): Promise<GetFamilyWithMembers | null>;
   createFamily(family: CreateFamilyRequest): Promise<GetFamilyResponse>;
   updateFamily(family: UpdateFamilyRequest): Promise<GetFamilyResponse>;
   deleteFamily(id: number): Promise<void>;
}
