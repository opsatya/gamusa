// /**
//  * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
//  * @description Yup schema for interview scheduling.
//  * --------------------------------------------------------------------
//  * Creation Details
//  * @author Satya
//  * Date Created: 11/02/2026
//  */

// import * as Yup from 'yup';

// const interviewSchema = Yup.object().shape({
//     applicantName: Yup.string().required('Applicant name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
//     roleApplied: Yup.string().required('Role is required'),
//     department: Yup.string().required('Department is required'),
//     interviewer: Yup.string().required('Interviewer is required'),
//     interviewDate: Yup.date().required('Date is required').nullable(),
//     interviewTime: Yup.date().required('Time is required').nullable(),
//     notes: Yup.string()
// });

// export default interviewSchema;
