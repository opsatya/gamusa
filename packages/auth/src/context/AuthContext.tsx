/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Provides authentication state and helpers across the app.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 30/01/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  SetStateAction,
} from 'react';

/* Relative Imports */
import { jwtDecode } from 'jwt-decode';

import { createCookieHelper } from '../index';
import { JWTPayload, UserEntity } from '@lektus/types';

// import { getProfileRequest } from "@/services/account";
// import { loginUserRequest, verifyOtpRequest } from "@/services/auth";
// import { isOnSuccessPage } from "@/utility/pageLocation";

/* Mock Data */
//TODO: Remove mock data after API integration
// import { mockOtpResponse, mockProfileResponse } from "@";
// import { Typography } from "@mui/material";
// import Loader from "@/components/Loader";

// ------------------------------
// Types/Interfaces
// ------------------------------

/* Enum */

enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  COMPANY_ADMIN = 'COMPANY_ADMIN',
  EMPLOYEE = 'EMPLOYEE',
  ADMIN = 'admin',
}

/**
 * @description Interface used for Auth Provider.
 * @property children - The children of the Auth Provider.
 * @property fetchProfile - The function to fetch the user profile.
 * @property onLoginSuccess - The callback function to be called when the user logs in successfully.
 * @property loader - The loader to be displayed when the user is logging in.
 */
export interface AuthProviderProps {
  children: React.ReactNode;
  cookieKey: string;
  refreshCookieKey?: string;
  fetchProfileRequest: () => Promise<any>;
  verifyOtpRequest: (
    email: string,
    otp: string,
    rememberMe: boolean
  ) => Promise<any>;
  onLoginSuccess?: () => void;
  loader?: React.ReactNode;
}

/**
 * Interface used for Auth Context.
 *
 * @interface AuthContextType
 * @property {boolean} isAuthenticated - is authenticated for session state.
 * @property {string|null} authToken - authToken for session state.
 * @property {any|null} user - user for session state.
 * @property {boolean} isPageLoaded - is Page Loaded for session state.
 * @property {func} verifyOtp - verify otp function for session state.
 * @property {func} LogoutUser - logout user function for session state.
 */
export interface AuthContextType {
  isAuthenticated: boolean;
  authToken: string | null;
  user: UserEntity | null;
  isPageLoaded: boolean | null;
  isLoadingProfile: boolean;
  hasPendingVerification: boolean;
  role: UserRole | null;
  permissions: string[];
  hasPermission: (permission: string | string[]) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  verifyOtp: (email: string, otp: string, rememberMe: boolean) => Promise<any>;
  logoutUser: () => void;
  setUser: (user: SetStateAction<UserEntity | null>) => void;
  completeAuthentication: () => void;
  updateUser: (userData: Partial<UserEntity>) => void;
}

// ------------------------------
// Create Context
// ------------------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ------------------------------
// Provider Component
// ------------------------------
export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  cookieKey,
  refreshCookieKey,
  fetchProfileRequest,
  verifyOtpRequest,
  loader,
}) => {
  const {
    getAccessToken,
    isValidToken,
    removeAccessToken,
    setAccessToken,
    setRefreshToken,
    removeRefreshToken,
  } = createCookieHelper(cookieKey, refreshCookieKey);

  const [user, setUser] = useState<UserEntity | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<UserRole | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [hasPendingVerification, setHasPendingVerification] = useState(false);
  const [permissions, setPermissions] = useState<string[]>([]);

  /* Functions */

  /**
   * Check if user has a specific permission
   * @param {string|string[]} permission - permission to check
   * @returns {boolean} - true if user has permission, false otherwise
   */
  const hasPermission = useCallback(
    (permission: string | string[]): boolean => {
      if (role === UserRole.ADMIN) return true;
      if (!permissions.length) return false;

      if (Array.isArray(permission)) {
        // Check if user has ALL permissions in the array
        return permission.every((p) => permissions.includes(p));
      }

      return permissions.includes(permission);
    },
    [permissions, role]
  );

  /**
   * Check if user has ANY of the given permissions
   * @param {string[]} permissionList - list of permissions to check
   * @returns {boolean} - true if user has any of the permissions, false otherwise
   */
  const hasAnyPermission = useCallback(
    (permissionList: string[]): boolean => {
      if (role === UserRole.ADMIN) return true;
      if (!permissions.length) return false;
      return permissionList.some((p) => permissions.includes(p));
    },
    [permissions, role]
  );

  /**
   * Update user function
   * @param {Partial<UserEntity>} updatedUser - updated user info
   * @returns {void}
   */
  const updateUser = useCallback((updates: Partial<UserEntity>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
  }, []);

  /**
   * Logout function
   * @returns {void}
   */
  const logoutUser = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();
    setIsAuthenticated(false);
    setAuthToken(null);
    setUser(null);
    setRole(null);
    setPermissions([]);
  }, []);

  /**
   * Get user's profile info
   * @returns {void}
   */
  const getUserProfile = useCallback(
    async (token?: string) => {
      const authTokenToUse = token || authToken;
      if (!authTokenToUse) {
        console.log('No auth token');
        return;
      }
      setIsLoadingProfile(true);
      try {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        const response: any = await fetchProfileRequest();
        //const response: any = mockProfileResponse;

        if (response.success && response.data) {
          let portalId: string | null = null;
          try {
            const decoded = jwtDecode<JWTPayload>(authTokenToUse);
            portalId = decoded.portalId ?? null;
          } catch {
            // silently ignore decode errors
          }

          // Resolve profile data: API may return { data: { profile: { ... } } }
          // or { data: { id, firstName, ... } } depending on the portal
          const profileData = response?.data?.profile || response?.data;

          const data: UserEntity = {
            id: profileData?.id || '',
            firstName: profileData?.firstName || '',
            lastName: profileData?.lastName || '',
            profilePhoto: profileData?.profilePhoto || null,
            gender: profileData?.gender || '',
            birthDate: profileData?.birthDate || null,
            address:
              profileData?.address ||
              profileData?.residenceAddress ||
              profileData?.residence_address ||
              '',
            email: profileData?.email || '',
            phone: profileData?.phone || '',
            createdAt: profileData?.createdAt || '',
            updatedAt: profileData?.updatedAt || '',
            isActive: profileData?.isActive || false,
            isSystemAdmin: profileData?.isSystemAdmin ?? false,
            unreadNotifications: profileData?.unreadNotifications || false,
            role: profileData?.role
              ? {
                  id: profileData.role.id || '',
                  name: profileData.role.name || '',
                }
              : null,
            company: profileData?.company
              ? {
                  id: profileData.company.id || '',
                  name: profileData.company.name || '',
                  description: profileData.company.description || '',
                  displayName: profileData.company.displayName || '',
                  slug: profileData.company.slug || '',
                  logo: profileData.company.logo || null,
                  logoUrl: profileData.company.logoUrl || null,
                }
              : null,
            portalId,
          };

          setUser(data);
          setRole(profileData?.role?.name);
          //setPermissions(profileData?.role?.permissions || []);
          setPermissions(profileData?.permissions || []);
        }
      } catch (err) {
        logoutUser();
      } finally {
        setIsLoadingProfile(false);
      }
    },
    [authToken, logoutUser, fetchProfileRequest]
  );

  /**
   * Verify OTP function
   * @param {string} email - email of the user
   * @param {string} otp - otp of the user
   * @param {boolean} rememberMe - remember me flag
   * @returns {void}
   */
  const verifyOtp = async (
    email: string,
    otp: string,
    rememberMe: boolean
  ): Promise<any> => {
    try {
      const response = await verifyOtpRequest(email, otp, rememberMe);
      if (response.success && response?.data?.accessToken) {
        const { accessToken, refreshToken } = response?.data;

        setAccessToken(accessToken, rememberMe);
        if (refreshToken) {
          setRefreshToken(refreshToken, rememberMe);
        }
        setHasPendingVerification(true);
        await completeAuthentication();
        return { success: true };
      }
    } catch (err) {
      console.log('error in user login', err);
      throw err;
    }
  };

  /**
   * Complete authentication function
   * @returns {void}
   */
  const completeAuthentication = useCallback(async () => {
    try {
      const accessToken = getAccessToken();

      if (accessToken && isValidToken(accessToken)) {
        setIsAuthenticated(true);
        setAuthToken(accessToken);
        setHasPendingVerification(false);

        await getUserProfile(accessToken);
      }
    } catch (error) {
      console.error('Complete auth error:', error);
      logoutUser();
    }
  }, [getUserProfile, logoutUser]);

  /**
   * Initialize authentication function
   * @returns {void}
   */
  const initAuth = async () => {
    try {
      const accessToken = getAccessToken();

      if (accessToken && isValidToken(accessToken)) {
        setIsAuthenticated(true);
        setAuthToken(accessToken);
        await getUserProfile(accessToken);
      }
    } catch (error) {
      console.error(' Auth init error:', error);
    } finally {
      setIsPageLoaded(true);
    }
  };

  /**
   * Initialize authentication on mount
   */
  useEffect(() => {
    initAuth();
  }, []);

  /**
   * Update getUserProfile dependency after initial load
   */
  useEffect(() => {
    if (authToken && isPageLoaded) {
      getUserProfile();
    }
  }, [authToken]);

  /**
   * Memoized context value
   */
  const value = useMemo<AuthContextType>(
    () => ({
      isAuthenticated,
      authToken,
      user,
      hasPendingVerification,
      isPageLoaded,
      isLoadingProfile,
      role,
      permissions,
      hasPermission,
      hasAnyPermission,
      verifyOtp,
      logoutUser,
      setUser,
      completeAuthentication,
      updateUser,
    }),
    [
      user,
      isAuthenticated,
      authToken,
      isPageLoaded,
      hasPendingVerification,
      role,
      permissions,
      isLoadingProfile,
      hasPermission,
      hasAnyPermission,
      completeAuthentication,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {isPageLoaded ? children : loader}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 * @returns {AuthContextType}
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
