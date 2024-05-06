import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../utils/baseURL';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['menu', 'category', 'sub_category', 'color', 'collection', 'style', 'slider', 'product', 'user', 'order', 'siteSetting', 'banner', 'video'],
  endpoints: () => ({}),
});
