// import { UploadedFile } from '@/components/UploadFile';

export interface CandidateApplication {
  id: number;
  jobTitle: string;
  applicationForm: string;
  dateApplied: string;
  status: string;
  nextStep?: string;
  feedback?: string;
}

export interface ShortlistedApplication {
  id: number;
  jobRole: string;
  applicationName: string;
  experience: string;
  currentCompany: string;
  currentCTC: string;
  currentLocation: string;
  role: string;
  status: string;
  source: string;
  cv: string;
  expectedCTC: string;
  descsiByRecruiter: string;
}

/*
 * @description All Applicants interface
 * @property {number} id - Applicant ID
 * @property {string} jobRole - Job role
 * @property {string} name - Applicant name
 * @property {string} email - Applicant email
 * @property {string} photoUrl - Applicant photo URL
 * @property {string} education - Applicant education
 * @property {string} yearsOfExperience - Applicant years of experience
 * @property {string} currentCompany - Applicant current company
 * @property {string} currentCTC - Applicant current CTC
 * @property {string} currentLocation - Applicant current location
 * @property {string} status - Applicant status
 */
export interface Applicant {
  id: number;
  jobRole: string;
  name: string;
  email: string;
  photoUrl?: string;
  education: string;
  yearsOfExperience: string;
  currentCompany: string;
  currentCTC: string;
  currentLocation: string;
  status: string;
}

/**
 * Personal profile form values interface
 * @interface PersonalProfileValues
 * @property {File | string | null} profilePhoto - Profile photo file or URL
 * @property {string} firstName - First name
 * @property {string} lastName - Last name
 * @property {string} email - Email address
 * @property {string} phone - Phone number
 * @property {string} gender - Gender selection
 * @property {string} dateOfBirth - Date of birth
 * @property {string} jobRole - Job role
 * @property {string} maritalStatus - Marital status
 * @property {string} residenceAddress - Residence address
 * @property {string} softSkills - Soft skills (rich text)
 * @property {string} technicalSkills - Technical skills (rich text)
 * @property {string} otherSkills - Other skills (rich text)
 * @property {UploadedFile[]} uploadDocuments - Array of uploaded documents
 */
export interface PersonalProfileValues {
  profilePhoto: File | string | null;
  txtFirstName: string;
  txtLastName: string;
  txtEmail: string;
  txtPhone: string;
  ddlGender: string;
  txtDateOfBirth: string;
  ddlJobRole: string;
  ddlMaritalStatus: string;
  txtResidenceAddress: string;
  txtSoftSkills: string;
  txtTechnicalSkills: string;
  txtOtherSkills: string;
  //TODO: add type here
  // uploadDocuments: UploadedFile[];
  uploadDocuments: any[];
}

/**
 * Family member interface
 * @interface FamilyMember
 * @property {number} id - Family member ID
 * @property {string} name - Family member name
 * @property {string} email - Family member email
 * @property {string} photoUrl - Family member photo URL
 * @property {string} relation - Family member relation
 * @property {string} profession - Family member profession
 * @property {string} age - Family member age
 * @property {string} isDependent - Family member dependency status
 */
export interface FamilyMember {
  id: number;
  name: string;
  email: string;
  photoUrl?: string;
  relation: string;
  profession: string;
  age: string;
  isDependent: string;
}

/**
 * Education record interface
 * @interface Education
 * @property {number} id - Education record ID
 * @property {string} qualification - Education qualification
 * @property {string} institute - Education institute
 * @property {string} subjects - Education subjects
 * @property {string} year - Education year
 * @property {string} percentage - Education percentage
 */
export interface Education {
  id: number;
  qualification: string;
  institute: string;
  subjects: string;
  year: string;
  percentage: string;
}

/**
 * Course record interface
 * @interface Course
 * @property {number} id - Course record ID
 * @property {string} course - Course name
 * @property {string} duration - Course duration
 * @property {string} institute - Course institute
 * @property {string} year - Course year
 */
export interface Course {
  id: number;
  course: string;
  duration: string;
  institute: string;
  year: string;
}

/**
 * Professional experience interface
 * @interface ProfessionalExperience
 * @property {number} id - Professional experience ID
 * @property {string} organization - Professional experience organization
 * @property {string} tenure - Professional experience tenure
 * @property {string} designation - Professional experience designation
 * @property {string} ctc - Professional experience CTC
 * @property {string} location - Professional experience location
 * @property {string} reasonForLeaving - Professional experience reason for leaving
 */
export interface ProfessionalExperience {
  id: number;
  organization: string;
  tenure: string;
  designation: string;
  ctc: string;
  location: string;
  reasonForLeaving: string;
}
