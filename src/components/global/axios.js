import axios from "axios";

export default axios.create({
  baseURL: "http://Foodpalbackend-env.eba-wsvaa3rp.ap-south-1.elasticbeanstalk.com",
  timeout: 1000,
});
