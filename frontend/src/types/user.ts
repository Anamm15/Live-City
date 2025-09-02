export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
}
export enum Religion {
  ISLAM = "Islam",
  CHRISTIAN = "Christian",
  CATHOLIC = "Catholic",
  HINDU = "Hindu",
  BUDDHIST = "Buddhist",
  OTHER = "Other",
}
export enum MaritalStatus {
  SINGLE = "Single",
  MARRIED = "Married",
  DIVORCED = "Divorced",
  WIDOWED = "Widowed",
}
export enum Education {
  ELEMENTARY = "Elementary",
  JUNIOR_HIGH = "Junior High",
  SENIOR_HIGH = "Senior High",
  DIPLOMA = "Diploma",
  BACHELOR = "Bachelor",
  MASTER = "Master",
  DOCTORATE = "Doctorate",
}

export type UserProfile = {
  id: number;
  nationalIdentityNumber: string;
  name: string;
  email: string;
  points: number;
  gender: Gender;
  birthday: string;
  birthplace: string;
  religion: Religion;
  maritalStatus?: MaritalStatus;
  education?: Education;
  job?: string;
  phoneNumber?: string;
  profilePictureUrl: string;
};
