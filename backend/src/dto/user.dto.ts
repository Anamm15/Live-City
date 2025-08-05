import { Education, Gender, MaritalStatus, Occupation, Religion, Role } from "../generated/prisma";

export type User = {
   id: number;
   nationalIdentityNumber: string;
   name: string;
   email: string | null;
   role: string;
   password: string;
   points: number;
   gender: string;
   birthday: Date;
   birthplace: string;
   religion: string;
   maritalStatus: string | null;
   education: string | null;
   job: string | null;
   phoneNumber: string | null;
}

export type UserResponse = {
   id: number;
   name: string;
   email: string | null;
   points: number;
   gender: string;
   role: string;
   birthday: Date;
   birthplace: string;
   religion: string;
   maritalStatus: string | null;
   education: string | null;
   job: string | null;
   phoneNumber: string | null;
};

export type CreateUserRequest = {
   nationalIdentityNumber: string;
   name: string;
   email: string | null;
   password: string;
   gender: Gender;
   birthday: Date;
   birthplace: string;
   religion: Religion;
   maritalStatus: MaritalStatus | null;
   role?: Role;
   education: Education | null;
   job: Occupation | null;
   phoneNumber: string | null;
   family: {
      connect: { id: number }
   }
};

export type UpdateUserRequest = {
   nationalIdentityNumber?: string;
   name?: string;
   email?: string;
   password?: string;
   gender?: Gender;
   birthday?: Date;
   birthplace?: string;
   religion?: Religion;
   maritalStatus?: MaritalStatus;
   education?: Education;
   job?: Occupation;
   phoneNumber?: string;
}

