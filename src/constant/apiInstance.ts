import { CreateAxiosDefaults, AxiosRequestHeaders } from "axios";
import axios from "axios";

const TOKEN_CYBERSOFT =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJOT0RFSlMgQ1lCRVJTT0ZUIiwiSGV0SGFuU3RyaW5nIjoiMDEvMDYvMjAyNiIsIkhldEhhblRpbWUiOiIxNzgwMjcyMDAwMDAwIiwibmJmIjoxNzM1NjY0NDAwLCJleHAiOjE3ODA0MTk2MDB9.E0ES7jnDntzqJitecHAICoV_SQpFXeZ9DDPekC1FV_w";

export const apiInstance = (config?: CreateAxiosDefaults) => {
  const api = axios.create(config);
  api.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        TokenCybersoft: TOKEN_CYBERSOFT,
        Authorization: "Bearer" + " " + localStorage.getItem("USER"),
      } as unknown as AxiosRequestHeaders,
    };
  });
  return api;
};
