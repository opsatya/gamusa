/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define the profile utility functions.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 03/Feb/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
// import { UserEntity } from "@/models";
import { getDate } from './formatDate';

/**
 * function to construct the profile data
 * @param user - user data
 * @returns {array} - array of profile data
 */
export const constructProfileData = (user: any) => {
  if (!user) return [];

  // Removed duplicate fields already shown in the profile drawer header:
  // { label: 'First Name', value: user?.firstName ?? '--' },
  // { label: 'Last Name', value: user?.lastName ?? '--' },
  // { label: 'Email', value: user?.email ?? '--' },
  // { label: 'Phone', value: user?.phone ?? '--' },

  const data = [
    {
      label: 'Gender',
      value: user?.gender
        ? user.gender.charAt(0).toUpperCase() +
          user.gender.slice(1).toLowerCase()
        : '--',
    },
    {
      label: 'Date of Birth',
      value: user?.birthDate ? getDate(user.birthDate, 'MMMM d, yyyy') : '--',
    },
    {
      label: 'Address',
      value: user?.address || '--',
    },
  ];

  return data;
};

/**
 * function to get role text by role
 * @param role - role of the user
 * @param userId - id of the user
 * @returns {string} - text based on the role
 */
export const getRoleTextByRole = (
  role: string | undefined,
  userId: string | number
) => {
  switch (role?.toLowerCase()) {
    case 'applicant':
      return `Applicant ID: ${userId}`;
    case 'recruiter':
      return 'Recruiter - Head';
    default:
      if (role?.toLowerCase() === 'employee' && userId) {
        return `Employee ID: ${userId}`;
      }
      return role ?? '--';
  }
};

/**
 * function to get status color by status
 * @param status - status of the user
 * @returns {string} - color based on the status
 */
export const getStatusColorByStatus = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'error';
    default:
      return 'info';
  }
};
