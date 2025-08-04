export type GetResponseVillage = {
   id: number;
   name: string;
   postalCode: string;
   latitude: number;
   longitude: number;
   createdAt: Date;
}

export type CreateVillageRequest = {
   name: string;
   postalCode: string;
   latitude: number;
   longitude: number;
}

export type UpdateVillageRequest = {
   name?: string;
   postalCode?: string;
   latitude?: number;
   longitude?: number;
}