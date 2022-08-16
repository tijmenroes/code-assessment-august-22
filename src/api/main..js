import Axios from 'axios'
import VueCookies from "vue-cookies";

const api = Axios.create({
  baseURL: "http://localhost:8000/api", // TODO: .env 
  headers: { Accept: "application/json", Authorization: `Bearer ${VueCookies.get("token")}`  },
});

export default api