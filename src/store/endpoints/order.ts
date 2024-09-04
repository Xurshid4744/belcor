import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const getOrder = createApi({
  reducerPath: `order`,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://66d5a18cf5859a704266df37.mockapi.io/api/v1/",
  }),

  endpoints: (builder) => ({
    orders: builder.query<any, { status: string }>({
      query({ status }) {
        return {
          url: `/order?status=${status}`,
          method: `GET`,
        };
      },
    }),
  }),
});

export const { useOrdersQuery } = getOrder;
