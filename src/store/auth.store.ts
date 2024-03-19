import { defineStore } from "pinia";

interface AuthState {
  token: string | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: (): AuthState => ({
    token: sessionStorage.getItem("token") || null,
  }),
  getters: {
    isLoggedIn(state): boolean {
      return !!state.token;
    },
  },
  actions: {
    saveSession(token: string | null): void {
      this.token = token;
      sessionStorage.setItem("token", token as string);
    },
    logout(): void {
      this.token = null;
      sessionStorage.removeItem("token");
    },
  },
});
