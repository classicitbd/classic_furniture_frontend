import { api } from "../../api/apiSlice";

export const categoryWiseProductApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCategoryWiseProduct: builder.query({
      query: () => ({
        url: `/product/category_match_product`,
        method: "GET",
      }),
    }),
    providersTags: ["categoryWiseProduct"],
  }),
});

export const { useGetCategoryWiseProductQuery } = categoryWiseProductApi;
