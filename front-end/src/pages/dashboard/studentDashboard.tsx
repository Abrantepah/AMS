import { Row, Col, theme, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
  CardWithPlot,
  RecentCourses,
  CardWithContent,
} from "../../components";
import {
  CheckCircleOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import { CreateButton, List } from "@refinedev/antd";
import { useApiUrl, useGetIdentity, useGo, useNavigation, useShow } from "@refinedev/core";
import { useLocation } from "react-router-dom";
import { IIdentity} from "../../interfaces";


export const StudentDashboardPage = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const { data: user } = useGetIdentity<IIdentity>();
  const go = useGo();
  const { listUrl } = useNavigation();
  const pathname = useLocation()

  //   const { queryResult: lecturerCourses } = useShow({
  //     resource: "generateCode",
  //     id: user?.id
  // });

  // const courses = lecturerCourses.data?.data.courses ?? [];

  

  return (
    <List
      title={t("dashboard.overview.title")}
      headerProps={{
        subTitle: `Hello ${user?.name}`
      }}
      headerButtons={(props) => (
        <CreateButton
          {...props.createButtonProps}
          key="create"
          size="large"
          onClick={() => {
            return go({
              to: `${listUrl("courses")}`,
              query: {
                to: pathname,
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        >
          {t("Add course")}
        </CreateButton>
      )}
    >
      {/* <Row gutter={[16, 32]}>
        <Col md={24}>
          <Row gutter={[30, 30]}>
            <Col xl={{ span: 8 }} lg={10} md={10} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <CheckCircleOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                }
                bodyStyles={{ textAlign: "right", paddingRight: "30px" }}
                title={t("Active Courses")}
                handleClick={() => {
                  return go({
                    to: `${listUrl("courses")}`,
                    query: {
                      to: pathname,
                    },
                    options: {
                      keepQuery: true,
                    },
                    type: "replace",
                  });
                }}
              >
                <Typography
                  style={{
                    fontSize: 50,
                    fontWeight: 700
                  }}
                >
                  
                  {
                    // @ts-ignore
                    courses.length}
                </Typography>
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 8 }} lg={10} md={10} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <CheckCircleOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  />
                }
                bodyStyles={{textAlign: "right", paddingRight: "30px"}}
                title={t("Total Sessions Recorded")}
                handleClick={() => {
                  return go({
                    to: `${listUrl("courses")}`,
                    query: {
                      to: pathname,
                    },
                    options: {
                      keepQuery: true,
                    },
                    type: "replace",
                  });
                }}
              >
                <Typography
                  style={{
                    fontSize: 50,
                    fontWeight: 700
                  }}
                >14</Typography>
              </CardWithPlot>
            </Col>
            <Col xl={{ span: 8 }} lg={10} md={10} sm={24} xs={24}>
              <CardWithPlot
                icon={
                  <CheckCircleOutlined
                    style={{
                      fontSize: 14,
                      color: token.colorPrimary,
                    }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}                  />
                }
                title={t("Completed Courses")}
                bodyStyles={{textAlign: "right", paddingRight: "30px"}}
                handleClick={() => {
                  return go({
                    to: `${listUrl("courses")}`,
                    query: {
                      to: pathname,
                    },
                    options: {
                      keepQuery: true,
                    },
                    type: "replace",
                  });
                }}
              >
                <Typography
                  style={{
                    fontSize: 50,
                    fontWeight: 700
                  }}
                >0</Typography>
              </CardWithPlot>
            </Col>
          </Row>
        </Col>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <CardWithContent
            bodyStyles={{
              padding: "1px 0px 0px 0px",
            }}
            icon={
              <ShoppingOutlined
                style={{
                  fontSize: 14,
                  color: token.colorPrimary,
                }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}              />
            }
            title={t("Recently Accessed Courses")}
          >
            <RecentCourses />
          </CardWithContent>
        </Col>
      </Row> */}
    </List>
  );
};
