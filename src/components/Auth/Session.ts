const SESSION_TOKEN = "session_token"

export const setToken = (token: string) => {
  localStorage.setItem(SESSION_TOKEN, token)
}

export const getToken = (): string => {
  return localStorage.getItem(SESSION_TOKEN) || ""
}

export const removeToken = () => localStorage.removeItem(SESSION_TOKEN)
