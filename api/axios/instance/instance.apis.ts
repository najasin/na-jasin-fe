/* eslint-disable no-param-reassign */
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { getCookie } from 'cookies-next'

import { logOnDev } from './instance.helpers'
import { CustomAxiosInterface } from './instance.types'

export const instance: CustomAxiosInterface = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  withCredentials: true,
  timeout: 30000,
})

/* request interceptors */
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    /**
     * request 직전 공통으로 진행할 작업
     */
    if (config && config.headers) {
      const act = getCookie('act')
      const rft = getCookie('rft')

      if (act && rft) {
        config.headers.Authorization = act
        config.headers.Refresh = rft
      }
    }

    if (process.env.NODE_ENV === 'development') {
      const { method, url } = config
      logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`)
    }

    return config
  },
  (error: AxiosError | Error): Promise<AxiosError> =>
    /**
     * request 에러 시 작업
     */
    Promise.reject(error),
)

/* response interceptors */
instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    /**
     * http status가 20X이고, http response가 then으로 넘어가기 직전 호출
     */
    if (process.env.NODE_ENV === 'development') {
      const { method, url } = response.config
      const { status } = response
      logOnDev(`🚁 [API] ${method?.toUpperCase()} ${url} | Response ${status}`)
    }

    return response
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    /**
     * http status가 20X가 아니고, http response가 catch로 넘어가기 직전 호출
     */
    if (process.env.NODE_ENV === 'development') {
      // if (axios.isAxiosError(error)) {
      //   const { message } = error
      //   const { method, url } = error.config as InternalAxiosRequestConfig
      //   const { status, statusText } = error.response as AxiosResponse
      //   logOnDev(
      //     `🚨 [API] ${method?.toUpperCase()} ${url} | Error ${status} ${statusText} | ${message}`,
      //   )
      //   switch (status) {
      //     case 401: {
      //       // 로그인 필요 메시지 연결
      //       break
      //     }
      //     case 403: {
      //       // 권한 필요 메시지 연결
      //       break
      //     }
      //     case 404: {
      //       // 잘못된 요청 메시지 연결
      //       break
      //     }
      //     case 500: {
      //       // 서버 문제 발생 메시지 연결
      //       break
      //     }
      //     default: {
      //       // 알 수 없는 오류 발생 메시지 연결
      //       break
      //     }
      //   }
      // } else {
      //   logOnDev(`🚨 [API] | Error ${error.message}`)
      // }
    }
    return Promise.reject(error)
  },
)
