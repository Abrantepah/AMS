import {
  HttpError,
  useGetIdentity,
  useGo,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import { NumberField, useSimpleList } from "@refinedev/antd";
import { IIdentity } from "../../../interfaces";
import {
  Card,
  Divider,
  Flex,
  List,
  Skeleton,
  Tag,
  Typography,
  theme,
} from "antd";
import { PaginationTotal } from "../../paginationTotal";
import { EyeOutlined } from "@ant-design/icons";
import { useStyles } from "./styled";
import { useLocation } from "react-router-dom";


interface ICourse {
    id: number;
    name: string;
    code: string;
    year: number;
    lecturer: number;
    department: number[];
}

export const ClassListCard = () => {
  const { styles, cx } = useStyles();
  const { token } = theme.useToken();
  const { data: user } = useGetIdentity<IIdentity>();
  const t = useTranslate();
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();

  const {
    listProps: classListProps,
  } = useSimpleList<ICourse, HttpError>({
    resource: `lecturerClasses/${user?.id}`,
  });
// @ts-ignore
  const allClasses = classListProps.dataSource?.all_classes_info ?? []

  // console.log(allClasses);
  
  return (
    <>
      <Divider style={{ margin: "16px 0px" }} />
      <List
        {...classListProps}
        pagination={{
          ...classListProps.pagination,
          showTotal: (total) => (
            <PaginationTotal total={total} entityName={"classes"} />
          ),
        }}
        dataSource={allClasses}
        grid={{
          gutter: [16, 16],
          column: 4,
          xxl: 4,
          xl: 4,
          lg: 3,
          md: 2,
          sm: 1,
          xs: 1,
        }}
        renderItem={(item) => (
          <List.Item style={{ height: "100%" }}>
            <Card
              key={
              // @ts-ignore
                `data-${item.department.id}`
              }
              hoverable
              bordered={false}
              className={styles.card}
              styles={{
                body: {
                  padding: "50px 20px",
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
                        // @ts-ignore
                        to: `${showUrl("report", `${item.department.id}/${item.courses[0].course.id}`)}`,
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
                        // @ts-ignore
                        to: `${showUrl("report", item.department.id)}`,
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
                        // @ts-ignore
                        tooltip: item.department.dname,
                      }}
                    >
                      {
                        // @ts-ignore
                        item.department.dname
                      }
                    </Typography.Title>

                    {/* <NumberField
                      value={
                        // @ts-ignore
                        item.courses[0].course.year
                      }
                      style={{
                        paddingLeft: "8px",
                        marginLeft: "auto",
                      }}
                    /> */}
                  </Flex>
                }
                description={
                  // @ts-ignore
                  `${item.courses[0].course.code} : ${item.courses[0].course.name}`
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
