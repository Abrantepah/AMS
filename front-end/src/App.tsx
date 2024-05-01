import React from "react";
import { Authenticated, Refine } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  // ThemedLayoutV2,
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
  ShoppingOutlined,
  ShopOutlined,
  DashboardOutlined,
  UserOutlined,
  UnorderedListOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import jsonServerDataProvider from "@refinedev/simple-rest";
import { authProvider } from "./authProvider";

import "dayjs/locale/de";

import { DashboardPage } from "./pages/dashboard";
import { OrderList, OrderShow } from "./pages/orders";
import { AuthPage } from "./components/pages/auth";
import { CustomerShow, CustomerList } from "./pages/customers";
import { CourierList, CourierCreate, CourierEdit } from "./pages/couriers";
import {
  CourseList,
  CourseCreate,
  CourseEdit,
  CourseShow,
} from "./pages/courses";
import { StoreCreate, StoreEdit, StoreList } from "./pages/verification";
import { CategoryList } from "./pages/categories";
import { useTranslation } from "react-i18next";
import { Header, Title } from "./components";
import { BikeWhiteIcon } from "./components/icons";
import { ConfigProvider } from "./context";
import { useAutoLoginForDemo } from "./hooks";

import "@refinedev/antd/dist/reset.css";

const App: React.FC = () => {
  // This hook is used to automatically login the user.
  // We use this hook to skip the login page and demonstrate the application more quickly.
  const { loading } = useAutoLoginForDemo();
  const role = localStorage.getItem('role');

  // const API_URL = "https://api.finefoods.refine.dev";
  const API_URL = "https://knust-ams.up.railway.app/api";
  const dataProvider = jsonServerDataProvider(API_URL);

  // const { t, i18n } = useTranslation();

  // const i18nProvider = {
  //   translate: (key: string, params: object) => t(key, params),
  //   changeLocale: (lang: string) => i18n.changeLanguage(lang),
  //   getLocale: () => i18n.language,
  // };
  // @ts-ignore
  const parsedRole = JSON.parse(role)
  console.log(parsedRole?.role);
  

  if (loading) {
    return null;
  }

  const commonResources = [
    {
      name: "dashboard",
      list: "/",
      meta: {
        label: "Dashboard",
        icon: <DashboardOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
      },
    },
  ];
// @ts-ignore
  const condtionalResources = parsedRole?.role === 'lecturer' ?
    [
      {
        name: "courses",
        list: "/courses",
        create: "/courses/new",
        edit: "/courses/:id/edit",
        show: "/courses/:id",
        meta: {
          icon: <TagsOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
        },
      },
    ]
    :
    [
      {
        name: "verification",
        list: "/verification",
        create: "/verification/new",
        edit: "/verification/:id/edit",
        meta: {
          icon: <ShopOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />,
        },
      },
    ];
  
  const resources = [...commonResources, ...condtionalResources];

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
            resources={resources}
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

                {/* <Route path="/orders">
                  <Route index element={<OrderList />} />
                  <Route path=":id" element={<OrderShow />} />
                </Route>

                <Route
                  path="/customers"
                  element={
                    <CustomerList>
                      <Outlet />
                    </CustomerList>
                  }
                >
                  <Route path=":id" element={<CustomerShow />} />
                </Route> */}

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

                {/* <Route path="/categories" element={<CategoryList />} />

                <Route path="/couriers">
                  <Route
                    path=""
                    element={
                      <CourierList>
                        <Outlet />
                      </CourierList>
                    }
                  >
                    <Route path="new" element={<CourierCreate />} />
                  </Route>

                  <Route path=":id/edit" element={<CourierEdit />} />
                </Route>  */}
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
                      // formProps={{
                      //   initialValues: {
                      //     email: "demo@refine.dev",
                      //     password: "demodemo",
                      //   },
                      // }}
                    />
                  }
                />
                <Route
                  path="/lecturer-login"
                  element={
                    <AuthPage
                      title={<img src={ logo } alt="logo" /> }
                      type="register"
                      // formProps={{
                      //   initialValues: {
                      //     email: "demo@refine.dev",
                      //     password: "demodemo",
                      //   },
                      // }}
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
