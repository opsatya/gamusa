import { Dayjs } from 'dayjs';

/*
@interface ApplicantOption - Applicant options for the schedule interview drawer
@property {string} label - Applicant name
@property {string} value - Applicant value
@property {string} email - Applicant email
*/
export interface ApplicantOption {
  label: string;
  value: string;
  email: string;
}

/*
@interface BasicOption - Basic options for the schedule interview drawer
@property {string} label - Option label
@property {string} value - Option value
*/
export interface BasicOption {
  label: string;
  value: string;
}

/*
@interface ScheduleInterviewFormValues - Schedule interview form values
@property {string} applicantName - Applicant name
@property {string} email - Applicant email
@property {string} roleApplied - Role applied
@property {string} department - Department
@property {string} interviewer - Interviewer
@property {Dayjs | null} interviewDate - Interview date
@property {Dayjs | null} interviewTime - Interview time
@property {string} notes - Interview notes
*/
export interface ScheduleInterviewFormValues {
  applicantName: string;
  email: string;
  roleApplied: string;
  department: string;
  interviewer: string;
  interviewDate: Dayjs | null;
  interviewTime: Dayjs | null;
  notes: string;
}
