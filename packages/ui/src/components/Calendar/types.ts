/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Type definitions for LektusCalendar component
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 11/02/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */
// ----------------------------------------------------------------------

import type { CalendarOptions } from '@fullcalendar/core';

/**
 * Calendar event data structure from API
 *
 * @interface CalendarEventData
 * @property {string} id - Unique event identifier
 * @property {string} title - Event title (e.g., "Interview with Applicant")
 * @property {string} date - Event date in ISO format (YYYY-MM-DD)
 * @property {string} applicantName - Name of the applicant
 * @property {string} status - Event status
 */
export interface CalendarEventData {
  id: string;
  title: string;
  date: string;
  applicantName: string;
  status: string;
  assessmentId?: string | null;
  extendedProps?: any;
}

/**
 * LektusCalendar component props
 * Extends FullCalendar options for maximum flexibility
 *
 * @interface LektusCalendarProps
 * @extends {Partial<CalendarOptions>}
 */
export interface LektusCalendarProps extends Partial<CalendarOptions> {
  /**
   * Array of calendar events
   */
  events?: CalendarEventData[];

  /**
   * Loading state - shows skeleton when true
   */
  isLoading?: boolean;

  /**
   * Callback when "View Details" is clicked
   * Receives all events for the selected day
   *
   * @param {CalendarEventData[]} events - Events on the selected day
   * @param {string} date - Selected date in ISO format
   */
  onViewDetails?: (events: CalendarEventData[], date: string) => void;

  /**
   * Callback when "Accept" is clicked
   * Receives all events for the selected day
   *
   * @param {CalendarEventData[]} events - Events on the selected day
   * @param {string} date - Selected date in ISO format
   */
  onAccept?: (events: CalendarEventData[], date: string) => void;

  /**
   * Callback when "Reject" is clicked
   * Receives all events for the selected day
   *
   * @param {CalendarEventData[]} events - Events on the selected day
   * @param {string} date - Selected date in ISO format
   */
  onReject?: (events: CalendarEventData[], date: string) => void;

  /**
   * Callback when "Assign to Interviewer" is clicked
   * Receives all events for the selected day
   *
   * @param {CalendarEventData[]} events - Events on the selected day
   * @param {string} date - Selected date in ISO format
   */
  onAssign?: (events: CalendarEventData[], date: string) => void;

  /**
   * Optional callback when an event is clicked directly
   * (Not the 3-dot menu)
   *
   * @param {CalendarEventData} event - The clicked event
   * @param {MouseEvent} [mouseEvent] - The native mouse event, useful for positioning a context Menu
   */
  onEventClick?: (event: CalendarEventData, mouseEvent?: MouseEvent) => void;
}

/**
 * Event card component props
 *
 * @interface CalendarEventProps
 */
export interface CalendarEventProps {
  /**
   * Event data
   */
  event: CalendarEventData;

  /**
   * Background color for the event card
   */
  backgroundColor: string;

  /**
   * Click handler for the event
   */
  onClick?: () => void;

  /**
   * Whether this is the last event in the list (no bottom margin)
   */
  isLast?: boolean;
}
