export type JobOffer = {
  id: number;
  title: string;
  company: string;
  link: string;
  recruiterEmail?: string;
  status: string;
  applicationDate: string;
  followUpDate?: string;
};
