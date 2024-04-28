import { useGo, useList, useNavigation, useShow } from "@refinedev/core";
import { NumberField, useTable } from "@refinedev/antd";
import { Typography, Table, theme, Space, Flex, Card, Tag, List, Divider } from "antd";
import { useStyles } from "../../course/list-card/styled";
import { OrderActions, PaginationTotal, ProductStatus } from "../..";

import { IOrder } from "../../../interfaces";
// import { useStyles } from "./styled";
import { getUniqueListWithCount } from "../../../utils";
import { EyeOutlined } from "@ant-design/icons";

export const RecentCourses: React.FC = () => {
  const go = useGo();
  const { showUrl } = useNavigation()
  const { token } = theme.useToken();
  const { styles, cx } = useStyles();

  const { queryResult:courseData } = useShow({
    resource: "generateCode",
    id: 1
    
  });

  const courses = courseData.data?.data.courses ?? [];

  const { show } = useNavigation();
  console.log(courses)

  return (
    <>
      {courses.map((item: any) => (
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
          cover={
            <>
              <Tag
                onClick={() => {
                  // return go({
                  //   to: `${showUrl("courses", item.id)}`,
                  //   query: {
                  //     to: pathname,
                  //   },
                  //   options: {
                  //     keepQuery: true,
                  //   },
                  //   type: "replace",
                  // });
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
      ))}        
    </>
  );
};
