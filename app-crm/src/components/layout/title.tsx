import React from "react";

import type { RefineLayoutThemedTitleProps } from "@refinedev/antd";
import { useLink } from "@refinedev/core";

import { Space, theme, Typography } from "antd";

import logo_mobile from "../assets/knust-mobile.svg"
import logo from "../assets/title.svg"

const { useToken } = theme;

export const Title: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
}) => {
  const { token } = useToken();
  const Link = useLink();

  return (
    <Link
      to="/login/student"
      style={{
        display: "inline-block",
        textDecoration: "none",
      }}
    >
      <Space
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "inherit",
          ...wrapperStyles,
        }}
      >
        <div
          style={{
            height: "24px",
            width: "24px",
            color: token.colorPrimary,
            marginBottom: "16px",
            marginRight: "5px"
          }}
        >
          <img src={logo_mobile} alt="logo" height={40} />
        </div>

        {!collapsed && (
          <Typography.Title
          style={{
            fontSize: "inherit",
            marginBottom: 0,
          }}
          >
          <img src={logo} alt="logo" height={45} />

          </Typography.Title>
        )}
      </Space>
    </Link>
  );
};
