import axios from "axios";

export const getIPAddress = () => {
  /*axios.get("https://api.ipify.org?format=json").then((response) => {
    return response.data.ip;
  });*/
  return "127.0.0.1";
};
