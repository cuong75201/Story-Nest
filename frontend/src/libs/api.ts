import axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import type { Response as ApiResponse } from './response'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const ACCESS_TOKEN_KEY = 'accessToken'

export const tokenStorage = {
  get: () => localStorage.getItem(ACCESS_TOKEN_KEY),
  set: (token: string) => localStorage.setItem(ACCESS_TOKEN_KEY, token),
  remove: () => localStorage.removeItem(ACCESS_TOKEN_KEY),
}

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const accessToken = tokenStorage.get()

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`)
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<null>>) => {
    const httpStatus = error.response?.status
    const responseData = error.response?.data

    if (httpStatus === 401) {
      tokenStorage.remove()
      window.dispatchEvent(new CustomEvent('auth:unauthorized'))
    }

    const apiError: ApiResponse<null> = responseData ?? {
      status: false,
      status_code: httpStatus ?? 0,
      message: error.message || 'API request failed',
      data: null,
      error: {
        code: error.code ?? 'REQUEST_FAILED',
        details: null,
      },
    }

    return Promise.reject(apiError)
  },
)

const extractResponse = <T>(response: AxiosResponse<ApiResponse<T>>) =>
  response.data

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.get<ApiResponse<T>>(url, config).then(extractResponse),

  post: <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    axiosInstance
      .post<ApiResponse<T>>(url, data, config)
      .then(extractResponse),

  put: <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    axiosInstance
      .put<ApiResponse<T>>(url, data, config)
      .then(extractResponse),

  patch: <T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
  ) =>
    axiosInstance
      .patch<ApiResponse<T>>(url, data, config)
      .then(extractResponse),

  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    axiosInstance.delete<ApiResponse<T>>(url, config).then(extractResponse),
}
