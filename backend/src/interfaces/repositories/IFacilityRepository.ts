export interface IFacilityRepository {
   getFacilities(): Promise<Facility[]>;
   getFacilityById(facilityId: string): Promise<Facility | null>;
   createFacility(facility: Facility): Promise<Facility>;
   updateFacility(facility: Facility): Promise<Facility>;
   deleteFacility(facilityId: string): Promise<void>;
}