import axios from 'axios';
import axiosAuthRefresh, {
  AxiosAuthRefreshRequestConfig,
} from 'axios-auth-refresh';
import useAxios from 'axios-hooks';
import { z } from 'zod';
import { zh } from './helpers/zodHelpers';
import { userSchema } from './usersApi';

const baseApiPath = '/auth';

export const loginInputSchema = z.object({
  email: zh.email().required(),
  password: zh.string(50, 8).required(),
});
export type LoginInput = z.infer<typeof loginInputSchema>;

export const loginResponseSchema = userSchema;
export type LoginResponse = z.infer<typeof loginResponseSchema>;

export const changePasswordInputSchema = z
  .object({
    currentPassword: zh.string(50, 8).required(),
    newPassword: zh.string(50, 8).required(),
    confirmNewPassword: zh.string(50, 8).required(), // Used in client validation only
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must match New Password',
        path: ['confirmNewPassword'],
      });
    }
  });

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;

export const forgotPasswordInputSchema = z.object({
  email: zh.email().required(),
});
export type ForgotPasswordInput = z.infer<typeof forgotPasswordInputSchema>;

export const resetPasswordInputSchema = z
  .object({
    email: zh.email().required(),
    resetToken: zh.string().required(),
    newPassword: zh.string(50, 8).required(),
    confirmPassword: zh.string(50, 8).required(),
  })
  .superRefine(({ newPassword, confirmPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;

export const useLogin = () => {
  const config: AxiosAuthRefreshRequestConfig = {
    url: `${baseApiPath}/login`,
    method: 'POST',
    // Prevent refresh trigger on incorrect login
    skipAuthRefresh: true,
  };
  return useAxios<LoginResponse, LoginInput>(config);
};

export const useLogout = () => {
  return useAxios(`${baseApiPath}/logout`);
};

export const changePassword = (input: ChangePasswordInput) => {
  return axios
    .post<Boolean>(`${baseApiPath}/change-password/`, input)
    .then((res) => res.data);
};

export const forgotPassword = (input: ForgotPasswordInput) => {
  return axios
    .get<Boolean>(
      `${baseApiPath}/requestResetPassword/${encodeURIComponent(input.email)}`
    )
    .then((res) => res.data);
};

export const resetPassword = (input: ResetPasswordInput) => {
  return axios
    .post<Boolean>(`${baseApiPath}/resetPassword`, input)
    .then((res) => res.data);
};

// Add interceptor to refresh the auth token when it expires
// Then retry any failed requests
export const createAuthRefreshInterceptor = (onRefreshFailed?: () => any) => {
  axiosAuthRefresh(
    axios,
    () => {
      // Prevent looping if the refresh token is expired
      const refreshConfig: AxiosAuthRefreshRequestConfig = {
        skipAuthRefresh: true,
      };
      return axios.get(`${baseApiPath}/refresh`, refreshConfig).catch((err) => {
        onRefreshFailed?.();
        return Promise.reject(err);
      });
    },
    {
      // Prevent multiple refresh requests from being sent at the same time
      pauseInstanceWhileRefreshing: true,
    }
  );
};
