interface AuthResponse {
  accessToken: string
  refreshToken: string
  userId: number
  userType: string | null
}

interface LogoutResponse {
  status: string
  message: string
  data: null
}

export type { AuthResponse, LogoutResponse }
