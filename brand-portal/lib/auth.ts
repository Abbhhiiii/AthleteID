// Simulated auth state (in production, use sessions/cookies)
export interface AuthState {
  brandId: string
  brandName: string
  email: string
  isAuthenticated: boolean
}

const AUTH_STORAGE_KEY = 'brand_auth_state'

export function getAuthState(): AuthState | null {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem(AUTH_STORAGE_KEY)
  return stored ? JSON.parse(stored) : null
}

export function setAuthState(auth: AuthState) {
  if (typeof window === 'undefined') return

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth))
}

export function clearAuthState() {
  if (typeof window === 'undefined') return

  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function isAuthenticated(): boolean {
  return getAuthState()?.isAuthenticated ?? false
}
