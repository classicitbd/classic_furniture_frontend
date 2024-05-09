import { api } from "../../api/apiSlice";

export const singleProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSingleProduct: builder.query({
      query: ({ slug }) => ({
        url: `/product/${slug}`,
        method: "GET",
      }),
    }),
    providersTags: ["singleProduct"],
  }),
});

export const { useGetSingleProductQuery } = singleProductApi;
