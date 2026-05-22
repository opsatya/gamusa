/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create Notification model.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 13/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */

/* Local Imports */

// ----------------------------------------------------------------------

/* Types/Interfaces */
/**
 * Interface used to create notification model.
 *
 * @interface NotificationModel
 * @property {string} title - contains the title of the notification.
 * @property {string} description - contains the description of the notification.
 * @property {React.ComponentType | string} icon - contains the icon of the notification.
 * @property {string} type - contains the type of the notification.
 * @property {string} date - contains the date of the notification.
 * @property {boolean} isRead - contains the read status of the notification.
 */

export interface NotificationModel {
  id: string;
  title: string;
  type: string;
  description?: string;
  icon?: any;
  date: string;
  isRead?: boolean;
}
