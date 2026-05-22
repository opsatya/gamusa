/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to create layout for admin dashboard pages.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 02/02/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Box } from '@mui/material';
import { useAuth } from '@lektus/auth';

/* Relative Imports */
import Footer from '../../components/Footer';

/* Local Imports */
import { Header, Sidebar } from './components';
import styles from './index.style';

// ----------------------------------------------------------------------

/**
 * A single sidebar API item from the server.
 * Defined here so the layout doesn't depend on a specific app's service types.
 */
export interface SidebarApiItem {
  key: string;
  visible: boolean;
  badge: Record<string, number | null> | string | null;
  children?: SidebarApiItem[];
}

/**
 * Navigation item for the sidebar.
 *
 * @interface NavItem
 * @property {string} [key] - Unique key matching the sidebar API response
 * @property {string} title - Display title
 * @property {string} href - Route path
 * @property {React.ElementType} [icon] - Icon component
 * @property {NavItem[]} [children] - Child items
 * @property {number} [badgeCount] - Badge notification count (0 = hidden)
 */
export interface NavItem {
  key?: string;
  title: string;
  href: string;
  icon?: React.ElementType;
  children?: NavItem[];
  // hasBadge?: boolean; // [KEPT FOR ROLLBACK] dot indicator
  badgeCount?: number;
  isDisabled?: boolean;
  tag?: string;
  /** Optional section label rendered as a group header above this item */
  groupLabel?: string;
}

/**
 * Interface used to create outer design layout for all admin dashboard pages.
 *
 * @interface UserDashboardLayoutProps
 * @property {node} children - contains the child components.
 * @property {NavItem[]} [sidebarItems] - Permission-filtered sidebar items (fallback)
 * @property {NavItem[]} [sidebarRegistry] - Full sidebar registry with keys (for API merge)
 * @property {function} [onFetchSidebar] - Async function to fetch sidebar config from API
 * @property {function} [onSidebarRefresh] - Called with refresh fn so parent can trigger re-fetch
 */
export interface UserDashboardLayoutProps {
  children: React.ReactNode;
  logoSrc: string;
  faviconSrc?: string;
  logoutIconSrc?: string;
  sidebarItems?: NavItem[];
  sidebarRegistry?: NavItem[];
  footerText?: string;
  onProfileSave?: (data: any) => Promise<any>;
  onProfileUpload?: (files: File[], folder: string) => Promise<any>;
  onFetchSidebar?: () => Promise<any>;
  onSidebarRefresh?: (refreshFn: () => void) => void;
  /**
   * Real-time badge counts keyed by sidebar item key.
   * When provided, these override the badge counts from the sidebar API response.
   * Supplied by NotificationProvider via socket events.
   */
  badgeOverrides?: Record<string, number>;
  /**
   * Called when the user clicks a sidebar navigation item.
   * Receives the item's key so the caller can resolve badge notifications.
   */
  onSidebarItemClick?: (key: string) => void;
  defaultRoleLabel?: string;
  hidePhone?: boolean;
  renderHeader?: (props: {
    handleMobileNavOpen: () => void;
    isCollapsed: boolean;
  }) => React.ReactNode;
}

// ----------------------------------------------------------------------

/**
 * Extract the total badge count from a sidebar badge.
 * Sums all numeric values > 0 in the badge object.
 * Handles badge as: object, JSON string, or null.
 *
 * @param badge - Badge data
 * @returns Total badge count (0 if no notifications)
 */
const getBadgeCount = (
  badge: Record<string, number | null> | number | string | null | undefined
): number => {
  if (badge === null || badge === undefined) return 0;

  // If badge is a direct integer, return it
  if (typeof badge === 'number') return badge > 0 ? badge : 0;

  let parsed: any = badge;
  if (typeof badge === 'string') {
    try {
      parsed = JSON.parse(badge);
    } catch {
      return 0;
    }
  }

  // Parsed could be a number from JSON string (e.g. "2")
  if (typeof parsed === 'number') return parsed > 0 ? parsed : 0;

  if (typeof parsed !== 'object' || parsed === null) return 0;

  // Sum all numeric values > 0
  return Object.values(parsed).reduce<number>(
    (sum, value) =>
      sum +
      (typeof value === 'number' && (value as number) > 0
        ? (value as number)
        : 0),
    0
  );
};

// /**
//  * [KEPT FOR ROLLBACK] Check if a badge has any truthy notification value.
//  */
// const hasBadgeNotification = (
//   badge: Record<string, number | null> | string | null | undefined
// ): boolean => {
//   if (!badge) return false;
//   let parsed: any = badge;
//   if (typeof badge === 'string') {
//     try { parsed = JSON.parse(badge); } catch { return false; }
//   }
//   if (typeof parsed !== 'object' || parsed === null) return false;
//   return Object.values(parsed).some(
//     (value) => typeof value === 'number' && (value as number) > 0
//   );
// };

/**
 * Merge sidebar API response with the full sidebar registry.
 * Only items with `visible: true` in the API response are shown.
 * Badge counts are added based on the API badge data.
 *
 * @param apiSidebar - API response sidebar items
 * @param registry - Full sidebar registry with icons/routes
 * @returns Merged and filtered NavItem array
 */
const buildSidebarFromApi = (
  apiSidebar: SidebarApiItem[],
  registry: NavItem[]
): NavItem[] => {
  // Build a lookup map from API data: key → SidebarApiItem
  const apiMap = new Map<string, SidebarApiItem>();
  apiSidebar.forEach((item) => apiMap.set(item.key, item));

  return registry
    .filter((regItem) => {
      const apiItem = apiMap.get(regItem.key || '');
      if (apiItem) return apiItem.visible;
      // Group with no direct API entry: show if any child is visible in the top-level API map
      if (regItem.children?.length) {
        return regItem.children.some((child) => {
          const childApi = apiMap.get(child.key || '');
          return childApi?.visible ?? false;
        });
      }
      return false;
    })
    .map((regItem) => {
      const apiItem = apiMap.get(regItem.key || '');
      const merged: NavItem = {
        ...regItem,
        badgeCount: apiItem ? getBadgeCount(apiItem.badge) : 0,
      };

      if (regItem.children?.length) {
        // Build child lookup: first try parent's own children, then top-level API map
        const childApiMap = new Map<string, SidebarApiItem>();
        apiItem?.children?.forEach((child) =>
          childApiMap.set(child.key, child)
        );

        merged.children = regItem.children
          .filter((childReg) => {
            const childApi =
              childApiMap.get(childReg.key || '') ??
              apiMap.get(childReg.key || '');
            return childApi?.visible ?? false;
          })
          .map((childReg) => {
            const childApi =
              childApiMap.get(childReg.key || '') ??
              apiMap.get(childReg.key || '');
            return {
              ...childReg,
              badgeCount: childApi ? getBadgeCount(childApi.badge) : 0,
            };
          });

        if (merged.children.length === 0) return null;
      }

      return merged;
    })
    .filter(Boolean) as NavItem[];
};

// ----------------------------------------------------------------------

/**
 * Outer design layout for all admin dashboard pages
 *
 * @component
 * @param {node} children - contains the child components
 */
const UserDashboardLayout: React.FC<UserDashboardLayoutProps> = ({
  children,
  sidebarItems,
  sidebarRegistry,
  footerText,
  logoSrc,
  faviconSrc,
  logoutIconSrc,
  onProfileSave,
  onProfileUpload,
  onFetchSidebar,
  onSidebarRefresh, // ← destructure kiya
  badgeOverrides,
  onSidebarItemClick,
  defaultRoleLabel,
  hidePhone,
  renderHeader,
}): React.ReactElement => {
  /* Hooks */
  const { user } = useAuth();

  /* States */
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sidebarApiData, setSidebarApiData] = useState<SidebarApiItem[] | null>(
    null
  );

  const handleMobileNavOpen = useCallback(() => setMobileNavOpen(true), []);
  const handleMobileNavClose = useCallback(() => setMobileNavOpen(false), []);
  const handleToggleCollapse = useCallback(
    () => setIsCollapsed((prev) => !prev),
    []
  );

  // Use refs for callback props so refreshSidebar stays stable across re-renders.
  // This prevents the sidebar from re-fetching when DashboardWrapper re-renders
  // due to URL query param changes (inner tab switches).
  const onFetchSidebarRef = useRef(onFetchSidebar);
  onFetchSidebarRef.current = onFetchSidebar;

  const onSidebarRefreshRef = useRef(onSidebarRefresh);
  onSidebarRefreshRef.current = onSidebarRefresh;

  /**
   * Fetches latest sidebar data from API and updates state.
   * Exposed via onSidebarRefresh so any page can trigger a re-fetch
   * (e.g. after approve/reject action).
   *
   * Stable — does NOT depend on `onFetchSidebar` prop directly;
   * reads from ref so it never causes effect re-runs.
   */
  const refreshSidebar = useCallback(() => {
    const fetcher = onFetchSidebarRef.current;
    if (!fetcher) return;
    fetcher()
      .then((res: any) => {
        if (res?.success && res?.data?.sidebar) {
          setSidebarApiData(res.data.sidebar);
        }
      })
      .catch(() => {
        // Silent fail — keep existing sidebar data
      });
  }, []); // ← empty deps: reads from ref

  /* Register refreshSidebar with context so pages can call it */
  useEffect(() => {
    onSidebarRefreshRef.current?.(refreshSidebar);
  }, [refreshSidebar]); // refreshSidebar is now stable, runs only once

  /* Fetch sidebar config from API on initial load (when user is available) */
  useEffect(() => {
    if (user) {
      refreshSidebar();
    }
  }, [user]); // ← intentionally omitting refreshSidebar to run once on mount

  /**
   * Build the final sidebar items:
   * 1. If API data is available AND registry exists → merge (API-driven)
   * 2. Otherwise → use permission-filtered sidebarItems (fallback)
   */
  const finalSidebarItems = useMemo(() => {
    let items: NavItem[];
    if (sidebarApiData && sidebarRegistry?.length) {
      items = buildSidebarFromApi(sidebarApiData, sidebarRegistry);
    } else {
      // Fallback: permission-filtered items from sidebarConfig(permissions)
      items = sidebarItems || [];
    }

    // Apply real-time badge overrides from socket (NotificationProvider).
    // Only applies when badgeOverrides is provided; individual overrides only
    // update keys present in the overrides object.
    if (badgeOverrides) {
      items = items.map((item) => ({
        ...item,
        badgeCount:
          item.key !== undefined && badgeOverrides[item.key] !== undefined
            ? badgeOverrides[item.key]
            : item.badgeCount,
        children: item.children?.map((child) => ({
          ...child,
          badgeCount:
            child.key !== undefined && badgeOverrides[child.key] !== undefined
              ? badgeOverrides[child.key]
              : child.badgeCount,
        })),
      }));
    }

    return items;
  }, [sidebarApiData, sidebarRegistry, sidebarItems, badgeOverrides]);

  /* Output */
  return (
    <Box sx={styles.rootStyle}>
      <Sidebar
        openMobile={isMobileNavOpen}
        onMobileClose={handleMobileNavClose}
        sidebarItems={finalSidebarItems}
        logoSrc={logoSrc}
        faviconSrc={faviconSrc}
        logoutIconSrc={logoutIconSrc}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        onItemClick={onSidebarItemClick}
        defaultRoleLabel={defaultRoleLabel}
        hidePhone={hidePhone}
      />
      <Box sx={styles.wrapperStyle}>
        {renderHeader ? (
          <Box sx={(theme) => styles.header(theme, isCollapsed)}>
            {renderHeader({
              handleMobileNavOpen,
              isCollapsed,
            })}
          </Box>
        ) : (
          <Header
            onMobileNavOpen={handleMobileNavOpen}
            isCollapsed={isCollapsed}
            onProfileSave={onProfileSave}
            onProfileUpload={onProfileUpload}
          />
        )}
        <Box sx={(theme) => styles.containerStyle(theme, !!renderHeader)}>
          {children}
        </Box>
        <Footer containerStyle={styles.footer} footerText={footerText} />
      </Box>
    </Box>
  );
};

export default memo(UserDashboardLayout);
