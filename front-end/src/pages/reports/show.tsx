import {
  useTranslate,
  HttpError,
  getDefaultFilter,
  useExport,
  useGo,
  useNavigation,
  useGetIdentity
} from "@refinedev/core";
import {
  List,
  useTable,
  FilterDropdown,
  ExportButton,
} from "@refinedev/antd";
import {
  Table,
  Typography,
  theme,
  InputNumber,
} from "antd";

import { IIdentity, IUser, IUserFilterVariables } from "../../interfaces";
import { SearchOutlined } from "@ant-design/icons";
import { PaginationTotal } from "../../components";
import { PropsWithChildren } from "react";
import { useLocation, useParams } from "react-router-dom";

export const ReportShow = ({ children }: PropsWithChildren) => {
  const go = useGo();
  const { pathname } = useLocation();
  const { showUrl } = useNavigation();
  const params = useParams();
  const t = useTranslate();
  const { token } = theme.useToken();
  const { data: user } = useGetIdentity<IIdentity>();
  const { tableProps, filters,} = useTable<
    IUser,
    HttpError,
    IUserFilterVariables
    >({
    resource: `studentsTable/${user?.id}/${params.id}/`,
    filters: {
      initial: [
        {
          field: "classes",
          operator: "contains",
          value: 5,
        },
      ],
    },
    syncWithLocation: true,
    });
  // @ts-ignore
  const reportData = tableProps.dataSource?.student_info ?? [];
  // @ts-ignore
  const sessionLength = tableProps.dataSource?.student_info[0]?.student_course.course ?? ""
// console.log(sessionLength);

  const { isLoading, triggerExport } = useExport<IUser>({
    // sorters,
    filters,
    // pageSize: 50,
    // maxItemCount: 50,
    mapData: (item) => {
      return {
        id: item.id,
        fullName: item.fullName,
        gsm: item.gsm,
        isActive: item.isActive,
        createdAt: item.createdAt,
      };
    },
  });

  return (
    <List
      breadcrumb={false}
      headerProps={{
        extra: <ExportButton onClick={triggerExport} loading={isLoading} />,
      }}
    >
      <Typography.Title style={{fontSize: 30, marginBlock: 30}}>
        {`${sessionLength.code == undefined? "course code": sessionLength.code} : ${sessionLength.name == undefined? "course": sessionLength.name}`}
      </Typography.Title>
      <Table
        {...tableProps}
        dataSource={reportData}
        rowKey={"student.id"}
        scroll={{ x: true }}
        pagination={{
          ...tableProps.pagination,
          showTotal: (total) => (
            <PaginationTotal total={total} entityName="students" />
          ),
        }}
      >
        <Table.Column
          key="reference"
          dataIndex={
          // @ts-ignore
            "student"
          }
          title="Reference Number"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value.reference}
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="index"
          dataIndex={
          // @ts-ignore
            "student"
          }
          title="Index Number"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value.index}
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="name"
          dataIndex={
          // @ts-ignore
            "student"
          }
          title="Full Name"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value.name}
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="strikes"
          dataIndex={
          // @ts-ignore
            "student"
          }
          title="Strikes"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value.Total_strike}
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week 1"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 1"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[0].attended == true ? 1 : value[0].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week2"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 2"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[1].attended == true ? 1 : value[1].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week3"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 3"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[2].attended == true ? 1 : value[2].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week4"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 4"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[3].attended == true ? 1 : value[3].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week 5"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 5"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[4].attended == true ? 1 : value[4].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week6"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 6"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[5].attended == true ? 1 : value[5].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week7"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 7"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[6].attended == true ? 1 : value[6].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week8"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 8"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[7].attended == true ? 1 : value[7].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week9"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 9"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[8].attended == true ? 1 : value[8].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week10"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 10"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[9].attended == true ? 1 : value[9].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week11"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 11"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[10].attended == true ? 1 : value[10].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week12"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 12"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[11].attended == true ? 1 : value[11].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week13"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 13"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[12].attended == true ? 1 : value[12].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week14"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 14"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[13].attended == true ? 1 : value[13].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
        <Table.Column
          key="week15"
          dataIndex={
          // @ts-ignore
            "student_sessions"
          }
          title="Week 15"
          render={(value) => (
            <Typography.Text
              style={{
                whiteSpace: "nowrap",
              }}
            >
              {value[14].attended == true ? 1 : value[14].attended == false ? 0 : "N/A" }
            </Typography.Text>
          )}
          filterIcon={(filtered) => (
            <SearchOutlined
              style={{
                color: filtered ? token.colorPrimary : undefined,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>
          )}
          defaultFilteredValue={getDefaultFilter("orderNumber", filters, "eq")}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <InputNumber
                addonBefore="#"
                style={{ width: "100%" }}
                placeholder={t("id")}
              />
            </FilterDropdown>
          )}
        />
      </Table>
      {children}
    </List>
  );
};
