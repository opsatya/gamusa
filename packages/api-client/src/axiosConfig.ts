/**
 * @copyright @2025 Techechelons Infosolutions Pvt. Ltd. All rights reserved.
 * @description Page to define the configrations for axios.
 * --------------------------------------------------------------------
 * Creation Details
 * @author Shashikant Yadav
 * Date Created: 09/07/2025
 * FDO Ref:
 * TDO Ref:
 * RTM Ref:
 * Test Case Ref:
 */

// ----------------------------------------------------------------------

import axios, { AxiosHeaders, AxiosInstance } from 'axios';

/**
 * @description Interface to define the options for the axios client.
 * @property baseURL - The base URL for the axios client.
 * @property onUnauthorized - The callback function to be called when the response status is 401.
 */
export interface ApiClientOptions {
  baseURL: string;
  getAccessToken: () => string | undefined;
  removeAccessToken: () => void;
  getCompanySlug?: () => string | null | undefined;
  onUnauthorized?: () => void;
}

/**
 * @description Function to create the axios client.
 * @param options - The options for the axios client.
 * @returns The axios client.
 */
export function createApiClient(options: ApiClientOptions): AxiosInstance {
  const client = axios.create({
    baseURL: `${options.baseURL}/api/v1`,
    timeout: 30_000,
  });

  client.interceptors.request.use(
    (config) => {
      // Ensure headers is always an AxiosHeaders instance
      if (!config.headers) {
        config.headers = new AxiosHeaders();
      }

      const token = options.getAccessToken();
      if (token) {
        config.headers.set('authorization', `Bearer ${token}`);
      }

      const rawSlug = options.getCompanySlug?.();
      const companySlug = rawSlug ? rawSlug.trim().toLowerCase() : undefined;
      if (companySlug) {
        config.headers.set('x-company-slug', companySlug);
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        options.removeAccessToken();
        options.onUnauthorized?.();
      }
      return Promise.reject(error);
    }
  );

  return client;
}
