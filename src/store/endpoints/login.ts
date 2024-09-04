import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginApi = createApi({
  reducerPath: `auth`,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://reqres.in/api/",
  }),

  endpoints: (builder) => ({
    login: builder.mutation<
      { token: string},
      { email: string; password: string }
    >({
      query(data) {
        return {
          url: `/login`,
          method: `POST`,
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginMutation } = loginApi;
