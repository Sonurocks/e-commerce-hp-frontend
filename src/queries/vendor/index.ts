import { AxiosError } from "axios";
import { apiClient } from "@/utility/api";

/**
 * Vendor registration types
 */
export interface VendorRegistrationData {
  name: string;
  email: string;
  phone: string;
  organizationName?: string;
}

export interface VendorRegistrationResponse {
  message?: string;
  error?: string;
  detail?: string;
  data?: {
    id?: string;
    [key: string]: unknown;
  };
}

/**
 * Register a new vendor
 * @param payload - Vendor registration data
 * @returns Promise with registration response
 */
export const registerVendorQn = async (
  payload: VendorRegistrationData
): Promise<VendorRegistrationResponse> => {
  try {
    const response = await apiClient.post("/vendor/auth/register", payload);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};

