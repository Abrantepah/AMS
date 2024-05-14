import React, { useEffect, useState } from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  ErrorComponent,
} from "@refinedev/antd";

import logo from "./components/assets/ams_logo.svg"

import { ThemedLayoutV2 } from "./components/layout";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {

  ShopOutlined,
  DashboardOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import jsonServerDataProvider from "@refinedev/simple-rest";
import { authProvider } from "./authProvider";

import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { AuthPage } from "./components/pages/auth";
import { Header, Title } from "./components";
import { ConfigProvider } from "./context";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
  const API_URL = "https://knust-ams.up.railway.app/api";
  const dataProvider = jsonServerDataProvider(API_URL);

  return (
    <BrowserRouter>
      <ConfigProvider theme={{
        token: {
          colorPrimary: "#A2121C",
        },
      }}>
        <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={dataProvider}
            authProvider={authProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: "dashboard",
                list: "/",
                meta: {
                  label: "Dashboard",
                  icon: <DashboardOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
                },
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <Authenticated
                    key="authenticated-routes"
                    fallback={<CatchAllNavigate to="/student-login" />}
                  >
                    <ThemedLayoutV2 Header={Header} Title={Title}>
                      <div
                        style={{
                          maxWidth: "1200px",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        <Outlet />
                      </div>
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route index element={<DashboardPage />} />

              </Route>

              <Route
                element={
                  <Authenticated key="auth-pages" fallback={<Outlet />}>
                    <NavigateToResource resource="dashboard" />
                  </Authenticated>
                }
              >
                <Route
                  path="/student-login"
                  element={
                    <AuthPage
                      title={<img src={logo} alt="logo" />}
                      type="login"
                    />
                  }
                />
                <Route
                  path="/lecturer-login"
                  element={
                    <AuthPage
                      title={<img src={ logo } alt="logo" /> }
                      type="register"
                    />
                  }
                />
                <Route
                  path="/forgot-password"
                  element={<AuthPage title={<img src={ logo } alt="logo" /> } type="forgotPassword" />}
                />
                <Route
                  path="/update-password"
                  element={<AuthPage title={<img src={ logo } alt="logo" /> } type="updatePassword" />}
                />
              </Route>

              <Route
                element={
                  <Authenticated key="catch-all">
                    <ThemedLayoutV2 Header={Header} Title={Title}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
              >
                <Route path="*" element={<ErrorComponent />} />
              </Route>
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
