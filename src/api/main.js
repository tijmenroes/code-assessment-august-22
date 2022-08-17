import Axios from "axios";
import VueCookies from "vue-cookies";

const api = Axios.create({
  baseURL: process.env.VUE_APP_API,
  headers: { Accept: "application/json" },
});

if (VueCookies.get("token")) {
  api.defaults.headers.Authorization = `Bearer ${VueCookies.get("token")}`;
}

export default api;
