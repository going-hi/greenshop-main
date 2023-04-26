import { GetServerSidePropsContext, NextPage } from "next";
import React from "react";
import { checkAuth } from "../../utils/checkAuth";

const DashboardPage: NextPage = () => {
  return (
    <main>
      <h1>Дашбоард</h1>
    </main>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }
  return {
    props: {},
  };
};

export default DashboardPage;
