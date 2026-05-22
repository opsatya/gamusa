/**
 * @copyright @2026 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define helper functions for authentication.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 29/01/2026
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

/* Imports */
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------------------------

/* Interfaces */
interface DecodedToken {
  exp: number;
  iat: number;
  id: string;
  role: string;
}

export function createCookieHelper(cookieKey: string, refreshKey?: string) {
  const cookieConfig: Cookies.CookieAttributes = {
    path: '/',
    sameSite: 'strict',
    secure:
      typeof window !== 'undefined' && window.location.protocol === 'https:',
  };

  const setAccessToken = (accessToken: string, isRememberMe: boolean): void => {
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + (isRememberMe ? 30 : 1));
    Cookies.set(cookieKey, accessToken, {
      ...cookieConfig,
      expires: expiresDate,
    });
  };

  const removeAccessToken = (): void => {
    Cookies.remove(cookieKey, { path: '/' });
  };

  const getAccessToken = (): string | undefined => {
    return Cookies.get(cookieKey);
  };

  const setRefreshToken = (
    refreshToken: string,
    isRememberMe: boolean
  ): void => {
    if (!refreshKey) return;
    const expiresDate = new Date();
    expiresDate.setDate(expiresDate.getDate() + (isRememberMe ? 30 : 1));
    Cookies.set(refreshKey, refreshToken, {
      ...cookieConfig,
      expires: expiresDate,
    });
  };

  const removeRefreshToken = (): void => {
    if (!refreshKey) return;
    Cookies.remove(refreshKey, { path: '/' });
  };

  const getRefreshToken = (): string | undefined => {
    if (!refreshKey) return;
    return Cookies.get(refreshKey);
  };

  const isValidToken = (token: string | null): boolean => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return !!decoded.exp && decoded.exp > currentTime;
    } catch (error) {
      console.error('Failed to decode token:', error);
      return false;
    }
  };

  const getDecodedToken = (token: string): DecodedToken => {
    return jwtDecode<DecodedToken>(token);
  };

  return {
    setAccessToken,
    removeAccessToken,
    getAccessToken,
    setRefreshToken,
    removeRefreshToken,
    getRefreshToken,
    isValidToken,
    getDecodedToken,
  };
}
