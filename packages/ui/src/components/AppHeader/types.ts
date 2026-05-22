/**
 * Types for AppHeader component.
 */

// ----------------------------------------------------------------------

/** Single timezone zone configuration */
export interface TimezoneZone {
  /** Display label, e.g. "London" */
  label: string;
  /** IANA timezone identifier, e.g. "Europe/London" */
  tz: string;
  /** Emoji flag, e.g. "🇬🇧" */
  flag: string;
}

/** Props for the AppHeader component */
export interface AppHeaderProps {
  /** Greeting subtitle text, e.g. "Hello Admin lektus !" */
  greetingSubtitle?: string;
  /** Greeting title text, e.g. "Good Morning" */
  greetingTitle?: string;
  /** All timezone zones to display in the clock bar */
  zones: readonly TimezoneZone[];
  /**
   * Labels of "core" zones always shown on smaller screens (laptop breakpoint).
   * On larger screens (lg+), all zones are shown.
   * @default Shows all zones at every size
   */
  coreZoneLabels?: readonly string[];
  /** Search field placeholder text */
  searchPlaceholder?: string;
  /** Controlled search value */
  searchValue?: string;
  /** Search value change handler */
  onSearchChange?: (value: string) => void;
  /** Number of unread notifications (0 = badge hidden) */
  notificationCount?: number;
  /** Notification bell click handler */
  onNotificationClick?: () => void;
  /**
   * Optional slot to render extra items in the right section
   * (e.g. role badge, user avatar, profile menu).
   * Rendered after the notification bell.
   */
  rightSlot?: React.ReactNode;
  /**
   * Optional callback to open the mobile sidebar/menu.
   * When provided, a Menu icon is rendered on mobile/laptop breakpoints.
   */
  onMobileMenuOpen?: () => void;
}
