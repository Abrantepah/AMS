import {
  HttpError,
  getDefaultFilter,
  useGo,
  useNavigation,
  useTranslate,
} from "@refinedev/core";
import {
  FilterDropdown,
  NumberField,
  getDefaultSortOrder,
  useSelect,
  useTable,
} from "@refinedev/antd";
import { ICategory, IProduct } from "../../../interfaces";
import {
  Avatar,
  Button,
  Input,
  InputNumber,
  Select,
  Table,
  Typography,
  theme,
} from "antd";
import { ProductStatus } from "../status";
import { PaginationTotal } from "../../paginationTotal";
import { EyeOutlined, SearchOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

interface ICourse {
    id: number;
    name: string;
    code: string;
    year: number;
    lecturer: number;
    department: number[];
}

export const CourseListTable = () => {
  const { token } = theme.useToken();
  const t = useTranslate();
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();

  const { tableProps } = useTable<ICourse, HttpError>({
    resource: `generateCode/${1}`,
    filters: {
      initial: [
        {
          field: "name",
          operator: "contains",
          value: "",
        },
        {
          field: "code",
          operator: "in",
          value: [],
        },
        {
          field: "year",
          operator: "in",
          value: [],
        },
      ],
    }, 
  });
  // @ts-ignore
  const allCourses = tableProps.dataSource?.courses ?? []
  
  console.log(allCourses);
  

  // const { selectProps: categorySelectProps, queryResult } =
  //   useSelect<ICategory>({
  //     resource: "categories",
  //     optionLabel: "title",
  //     optionValue: "id",
  //     defaultValue: getDefaultFilter("category.id", filters, "in"),
  //   });

  // const categories = queryResult?.data?.data || [];

  return (
    <Table
      {...tableProps}
      dataSource={allCourses}
    >
      <Table.Column
        title={
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            ID #
          </Typography.Text>
        }
        dataIndex="id"
        key="id"
        width={80}
        render={(value) => (
          <Typography.Text
            style={{
              whiteSpace: "nowrap",
            }}
          >
            #{value}
          </Typography.Text>
        )}
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        )}
        // defaultFilteredValue={getDefaultFilter("id", filters, "eq")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <InputNumber
              addonBefore="#"
              style={{ width: "100%" }}
              placeholder={t("Filter courses")}
            />
          </FilterDropdown>
        )}
      />
      {/* <Table.Column
        title={t("Course Image")}
        dataIndex="images"
        key="images"
        render={(images: IProduct["images"]) => {
          return (
            <Avatar
              shape="square"
              src={images?.[0]?.thumbnailUrl || images?.[0]?.url}
              alt={images?.[0].name}
            />
          );
        }}
      /> */}
      <Table.Column
        title={t("Course Name")}
        dataIndex="name"
        key="name"
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
            }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        )}
        // defaultFilteredValue={getDefaultFilter("name", filters, "contains")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder={t("course name")} />
          </FilterDropdown>
        )}
        render={(value: string) => {
          return (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value}
            </Typography.Text>
          );
        }}
      />
      <Table.Column
        title={t("Code")}
        dataIndex="code"
        key="code"
        filterIcon={(filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}          />
        )}
        // defaultFilteredValue={getDefaultFilter(
        //   "description",
        //   filters,
        //   "contains",
        // )}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Input placeholder={t("course code")} />
          </FilterDropdown>
        )}
        render={(description: string) => {
          return (
            <Typography.Paragraph
              ellipsis={{ rows: 1, tooltip: true }}
              style={{
                maxWidth: "400px",
                marginBottom: 0,
              }}
            >
              {description}
            </Typography.Paragraph>
          );
        }}
      />
      <Table.Column
        title={t("Year")}
        dataIndex="year"
        key="year"
        align="right"
        sorter
        // defaultSortOrder={getDefaultSortOrder("price", sorters)}
        render={(price: number) => {
          return (
            <NumberField
              value={price}
              style={{
                width: "80px",
                fontVariantNumeric: "tabular-nums",
                whiteSpace: "nowrap",
              }}
            />
          );
        }}
      />
      {/* <Table.Column<IProduct>
        title={t("category")}
        dataIndex={["category", "title"]}
        key="category.id"
        width={128}
        // defaultFilteredValue={getDefaultFilter("category.id", filters, "in")}
        filterDropdown={(props) => {
          return (
            <FilterDropdown
              {...props}
              selectedKeys={props.selectedKeys.map((item) => Number(item))}
            >
              <Select
                // {...categorySelectProps}
                style={{ width: "200px" }}
                allowClear
                mode="multiple"
                placeholder={t("category")}
              />
            </FilterDropdown>
          );
        }}
        render={(_, record) => {
          const category = categories.find(
            (category) => category?.id === record.category?.id,
          );

          return (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {category?.title || "-"}
            </Typography.Text>
          );
        }}
      /> */}
      {/* <Table.Column
        title={t("Active Courses")}
        dataIndex="isActive"
        key="isActive"
        sorter
        defaultSortOrder={getDefaultSortOrder("isActive", sorters)}
        defaultFilteredValue={getDefaultFilter("isActive", filters, "in")}
        filterDropdown={(props) => (
          <FilterDropdown {...props}>
            <Select
              style={{ width: "200px" }}
              allowClear
              mode="multiple"
              placeholder={t("Active course")}
            >
              <Select.Option value="true">
                {t("Active")}
              </Select.Option>
              <Select.Option value="false">
                {t("Completed")}
              </Select.Option>
            </Select>
          </FilterDropdown>
        )}
        render={(isActive: boolean) => {
          return <ProductStatus value={isActive} />;
        }}
      /> */}
      <Table.Column
        title={t("Details")}
        key="actions"
        fixed="right"
        align="center"
        render={(_, record: ICourse) => {
          return (
            <Button
              icon={<EyeOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
              onClick={() => {
                return go({
                  to: `${showUrl("courses", record.id)}`,
                  query: {
                    to: pathname,
                  },
                  options: {
                    keepQuery: true,
                  },
                  type: "replace",
                });
              }}
            />
          );
        }}
      />
    </Table>
  );
};
