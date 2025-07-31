import { CreateFamilyRequest, GetFamilyResponse, GetFamilyWithMembers, UpdateFamilyRequest } from "../../dto/family.dto";

export interface IFamilyService {
   getFamilies(): Promise<GetFamilyResponse[]>;
   getFamilyWithMembers(id: number): Promise<GetFamilyWithMembers | null>;
   createFamily(family: CreateFamilyRequest): Promise<GetFamilyResponse>;
   updateFamily(id:number, family: UpdateFamilyRequest): Promise<GetFamilyResponse>;
   deleteFamily(id: number): Promise<void>;
}