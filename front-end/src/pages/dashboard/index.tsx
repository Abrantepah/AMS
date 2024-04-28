import { Row, Col, theme, Dropdown, MenuProps, Button, Flex, Typography } from "antd";
import { useTranslation } from "react-i18next";
import {
  CardWithPlot,
  RecentCourses,
  TrendingMenu,
  CardWithContent,
  TrendUpIcon,
  TrendDownIcon,
} from "../../components";
import {
  CheckCircleOutlined,
  DownOutlined,
  RiseOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMemo, useState } from "react";
import { CreateButton, List, NumberField } from "@refinedev/antd";
import { useApiUrl, useGo, useList, useNavigation } from "@refinedev/core";
import { useLocation } from "react-router-dom";
import dayjs from "dayjs";
import { ICourses} from "../../interfaces";

type DateFilter = "lastWeek" | "lastMonth";

const DATE_FILTERS: Record<
  DateFilter,
  {
    text: string;
    value: DateFilter;
  }
> = {
  lastWeek: {
    text: "lastWeek",
    value: "lastWeek",
  },
  lastMonth: {
    text: "lastMonth",
    value: "lastMonth",
  },
};

export const DashboardPage: React.FC = () => {
  const { token } = theme.useToken();
  const { t } = useTranslation();
  const API_URL = useApiUrl();
  const go = useGo();
  const { listUrl } = useNavigation();
  const pathname = useLocation()

    const { data: lecturerCourses } = useList({
    resource: "generateCode/1",
  });

  const courses = useMemo(() => {
      // @ts-ignore
      const data = lecturerCourses?.data ?? {};
      if (!data)
        return {
          data: [],
      };

    return {
      data: data,
    };
    }, [lecturerCourses]);
  // @ts-ignore
  // console.log(courses.data.courses.length);
  

  return (
    <List
      title={t("dashboard.overview.title")}
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
      <Row gutter={[16, 30]}>
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
                  
                  {/* {
                    // @ts-ignore
                    courses.data.courses.length} */}
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
      </Row>
    </List>
  );
};
