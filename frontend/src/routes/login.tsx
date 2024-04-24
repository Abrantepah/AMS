import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useLogin } from "@refinedev/core";

import { Title } from "@/components";
import { AuthPage } from "@/components/pages/auth";
import { demoCredentials } from "@/providers";

export const LoginPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { mutate } = useLogin();

  const emailFromSearchParams = searchParams.get("email");
  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  const initialValues = emailFromSearchParams
    ? { email: emailFromSearchParams }
    : demoCredentials;

  useEffect(() => {
    if (accessToken && refreshToken) {
      mutate({
        accessToken,
        refreshToken,
      });
    }
  }, [accessToken, refreshToken]);

  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues,
      }}
      contentProps={{
        className: "auth-page",
        // title: "Login As Student"
      }}
      title={<Title collapsed={false} />}

    />
  );
};
