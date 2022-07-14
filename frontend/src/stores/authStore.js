import { defineStore } from "pinia";
import axios from "axios";
import { authUrl } from "../utils/baseUrl";
export const useAuthStore = defineStore({
  id: "auth",
  state:() => ({
    user: JSON.parse(localStorage.getItem("token")),
    loading: false,
  }),

  actions: {
    async register(username, email, password ) {
      this.loading = true;
      const user = await axios.post(`${authUrl}/register`, { username, email, password});
      this.user = user;
      this.loading = false;
      localStorage.setItem("token", JSON.stringify(user))
    },

    async login(email, password) {
      const user = await axios.post(`${authUrl}/login`, { email, password});
      this.user = user;
      localStorage.setItem("token", JSON.stringify(user))
    },

    async logOut() {
      this.loading = true;
      this.user = null;
      this.loading = false;
      localStorage.removeItem("token");
    }
  }
});

