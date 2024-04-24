import React from "react";

import { Title } from "@/components";
import { AuthPage } from "@/components/pages/auth";

export const RegisterPage: React.FC = () => {
  return (
    <AuthPage
      type="register"
      title={<Title collapsed={false} />}

    />
  );
};
