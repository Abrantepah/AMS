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
import {
  CourseList,
  CourseCreate,
  CourseEdit,
  CourseShow,
} from "./pages/courses";
import { StoreCreate, StoreEdit } from "./pages/verification";
import { Header, Title } from "./components";
import { ConfigProvider } from "./context";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
  const API_URL = "https://knust-ams.up.railway.app/api";
  const dataProvider = jsonServerDataProvider(API_URL);

 
  // @ts-ignore
  const [role, setRole] = useState(JSON.parse(localStorage.getItem('role')));
  
    useEffect(() => {
      // const handleStorageChange = () => {
      // @ts-ignore
      setRole(JSON.parse(localStorage.getItem('role')));
    // };

    // window.addEventListener('storage', handleStorageChange);

    // return () => {
    //   window.removeEventListener('storage', handleStorageChange);
      // };
      // @ts-ignore
    }, []);
  

  // @ts-ignore
  console.log(localStorage.getItem('role'));
  
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
            // i18nProvider={i18nProvider}
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
              // @ts-ignore
              role?.role === 'lecturer' ? {
                name: "courses",
                list: "/courses",
                create: "/courses/new",
                edit: "/courses/:id/edit",
                show: "/courses/:id",
                meta: {
                  icon: <TagsOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
                },
              }
              : 
              {
                name: "verification",
                list: "/verification",
                create: "/verification/new",
                edit: "/verification/:id/edit",
                meta: {
                  icon: <ShopOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
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

                <Route
                  path="/courses"
                  element={
                    <CourseList>
                      <Outlet />
                    </CourseList>
                  }
                >
                  <Route path="new" element={<CourseCreate />} />
                  <Route path=":id" element={<CourseShow />} />
                  <Route path=":id/edit" element={<CourseEdit />} />
                </Route>

                <Route path="/verification">
                  <Route index element={<StoreCreate />} />
                  <Route path="new" element={<StoreCreate />} />
                  <Route path=":id/edit" element={<StoreEdit />} />
                </Route>

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
