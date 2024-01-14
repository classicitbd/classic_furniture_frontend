import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  tagTypes: ['menu', 'category', 'sub_category', 'color', 'collection', 'style', 'slider', 'product', 'user', 'order'],
  endpoints: () => ({}),
});