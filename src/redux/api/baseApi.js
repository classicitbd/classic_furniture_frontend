/* eslint-disable no-unused-vars */
import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "../../helpers/axios/axiosBaseQuery";
import { tagTypesList } from "../tag-types";
import { getBaseUrl } from "../../helpers/config/envConfig";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: (builder) => ({}),
  tagTypes: tagTypesList,
});
