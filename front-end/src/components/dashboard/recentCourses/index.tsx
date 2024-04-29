import { useGetIdentity, useGo, useList, useNavigation, useShow } from "@refinedev/core";
import { NumberField, useTable } from "@refinedev/antd";
import { Typography, Table, theme, Space, Flex, Card, Tag, List, Divider, Row, Col } from "antd";
import { useStyles } from "../../course/list-card/styled";
import { CardWithPlot, OrderActions, PaginationTotal, ProductStatus } from "../..";

import { IIdentity, IOrder } from "../../../interfaces";
// import { useStyles } from "./styled";
import { getUniqueListWithCount } from "../../../utils";
import { CheckCircleOutlined, EyeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

export const RecentCourses: React.FC = () => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation()
  const { data: user } = useGetIdentity<IIdentity>();
  const { token } = theme.useToken();
  const { styles, cx } = useStyles();

  const { queryResult:courseData } = useShow({
    resource: "generateCode",
    id: user?.id
  });

  const courses = courseData.data?.data.courses ?? [];

  const { show } = useNavigation();
  console.log(courses)

  return (
    <>
      <Row gutter={[8, 8]} style={{marginTop: "10px"}}>
        {courses.map((item: any) => (
          <Col xl={{ span: 24 }} lg={10} md={10} sm={24} xs={24}>
            <Card
              hoverable
              bordered={false}
              className={styles.card}
              styles={{
                body: {
                  padding: 16,
                },
                cover: {
                  position: "relative",
                },
                actions: {
                  marginTop: "auto",
                },
              }}
              onClick={() => {
                return go({
                  to: `${showUrl("courses", item.id)}`,
                  query: {
                    to: pathname,
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: "replace",
                });
              }}
              cover={
                <>
                  <Tag
                    onClick={() => {
                      return go({
                        to: `${showUrl("courses", item.id)}`,
                        query: {
                          to: pathname,
                        },
                        options: {
                          keepQuery: true,
                        },
                        type: "replace",
                      });
                    }}
                    className={cx(styles.viewButton, "viewButton")}
                    icon={<EyeOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
                  >
                    View
                  </Tag>
                </>
              }
            >
              <Card.Meta
                title={
                  <Flex>
                    <Typography.Title
                      level={5}
                      ellipsis={{
                      rows: 1,
                      tooltip: item.name,
                      }}
                    >
                      {item.name}
                    </Typography.Title>

                  </Flex>
                }
                description={item.code}
              />
            </Card>
          </Col>
        ))} 
      </Row>       
    </>
  );
};
