import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import axios from "../axios/index";
import * as Api from "@/api";

export const checkAuth = async (ctx: GetServerSidePropsContext) => {
  const { _accessToken } = nookies.get(ctx);

  axios.defaults.headers.Authorization = "Bearer " + _accessToken;
  try {
    await Api.auth.getMe();
    return {
      props: {},
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/dashboard/auth",
        permanent: false,
      },
    };
  }
};
