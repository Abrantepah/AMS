import {
  HttpError,
  useGo,
  useList,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import { NumberField, useSimpleList } from "@refinedev/antd";
import { ICategory, IProduct } from "../../../interfaces";
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
import { ProductStatus } from "../status";
import { PaginationTotal } from "../../paginationTotal";
import { EyeOutlined, TagOutlined } from "@ant-design/icons";
import { useMemo } from "react";
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

export const CourseListCard = () => {
  const { styles, cx } = useStyles();
  const { token } = theme.useToken();
  const t = useTranslate();
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();

  const {
    listProps: courseListProps,
    filters,
    setFilters,
  } = useSimpleList<ICourse, HttpError>({
    resource: `generateCode/${1}`,
    pagination: {
      current: 1,
      pageSize: 12,
    },
    filters: {
      initial: [
        {
          field: "courses.id",
          operator: "in",
          value: [],
        },
      ],
    },
  });
// @ts-ignore
  const allCourses = courseListProps.dataSource?.courses ?? []

  console.log(allCourses);
  

  // const { data: categoryData, isLoading: categoryIsLoading } = useList<
  //   ICategory,
  //   HttpError
  // >({
  //   resource: "categories",
  //   pagination: {
  //     mode: "off",
  //   },
  // });
  // const categories = categoryData?.data || [];

  // const categoryFilters = useMemo(() => {
  //   const filter = filters.find((filter) => {
  //     if ("field" in filter) {
  //       return filter.field === "category.id";
  //     }

  //     return false;
  //   });

  //   const filterValues = filter?.value?.map((value: string | number) =>
  //     Number(value),
  //   );

  //   return {
  //     operator: filter?.operator || "in",
  //     value: (filterValues || []) as number[],
  //   };
  // }, [filters]).value;

  // const hasCategoryFilter = categoryFilters?.length > 0;

  // const handleOnTagClick = (categoryId: number) => {
  //   const newFilters = categoryFilters;
  //   const hasCurrentFilter = newFilters.includes(categoryId);
  //   if (hasCurrentFilter) {
  //     newFilters.splice(newFilters.indexOf(categoryId), 1);
  //   } else {
  //     newFilters.push(categoryId);
  //   }

  //   setFilters([
  //     {
  //       field: "category.id",
  //       operator: "in",
  //       value: newFilters,
  //     },
  //   ]);
  // };

  return (
    <>
      <Divider style={{ margin: "16px 0px" }} />
      <List
        {...courseListProps}
        pagination={{
          ...allCourses.pagination,
          showTotal: (total) => (
            <PaginationTotal total={total} entityName={"courses"} />
          ),
        }}
        dataSource={allCourses}
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
                `data-${item.id}`
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
                        // @ts-ignore
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
              // actions={[
              //   <Flex
              //     key="actions"
              //     justify="space-between"
              //     style={{
              //       padding: "0 16px",
              //     }}
              //   >
              //     <Typography.Text key="category.title">
              //       {
              //         categories.find(
              //           (category) => category.id === item.category.id,
              //         )?.title
              //       }
              //     </Typography.Text>
              //     <ProductStatus key="status" value={item.isActive} />
              //   </Flex>,
              // ]}
            >
              <Card.Meta
                title={
                  <Flex>
                    <Typography.Title
                      level={5}
                      ellipsis={{
                        rows: 1,
                        // @ts-ignore
                        tooltip: item.name,
                      }}
                    >
                      {
                        // @ts-ignore
                        item.name
                      }
                    </Typography.Title>

                    <NumberField
                      value={
                        // @ts-ignore
                        item.year
                      }
                      style={{
                        paddingLeft: "8px",
                        marginLeft: "auto",
                      }}
                      // options={{
                      //   style: "currency",
                      //   currency: "USD",
                      // }}
                    />
                  </Flex>
                }
                description={
                        // @ts-ignore
                  item.code
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </>
  );
};
