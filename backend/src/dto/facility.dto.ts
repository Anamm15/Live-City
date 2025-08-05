export type FacilityResponse = {
   id: number,
   name: string,
   description: string | null,
   latitude: number,
   longitude: number,
   buildDate: Date
}

export type CreateFacilityRequest = {
   name: string,
   description: string,
   latitude: number,
   longitude: number,
   buildDate: Date
}

export type UpdateFacilityRequest = {
   name?: string,
   description?: string,
   latitude?: number,
   longitude?: number,
   buildDate?: Date
}