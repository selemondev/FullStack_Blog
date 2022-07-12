import { defineStore } from "pinia";
import axios from "axios";
const registerUrl = "http://localhost:5000/api/auth/register";
const loginUrl = "http://localhost:5000/api/auth/login"
export const useAuthStore = defineStore({
  id: "auth",
  state:() => ({
    user: JSON.parse(localStorage.getItem("token")),
    loading: false,
  }),

  actions: {
    async register(username, email, password ) {
      this.loading = true;
      const user = await axios.post(registerUrl, { username, email, password});
      this.user = user;
      this.loading = false;
      localStorage.setItem("token", JSON.stringify(user))
    },

    async login(email, password) {
      const user = await axios.post(loginUrl, { email, password});
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

