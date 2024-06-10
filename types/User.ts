import { JobOffer } from "./JobOffer";

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: 'user' | 'admin';
  isConfirmed: boolean;
  JobOffer: JobOffer[];
}
