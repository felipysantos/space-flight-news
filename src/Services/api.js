import axios from "axios";

const Api = axios.create({
  baseURL: `https://api.spaceflightnewsapi.net/v3/articles`,
});
export default Api;
