import {
  BaseKey,
  HttpError,
  useGetIdentity,
  useGetToPath,
  useGo,
  useNavigation,
  useOne,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Avatar,
  Button,
  Divider,
  Flex,
  Grid,
  List,
  Typography,
  theme,
} from "antd";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { Drawer } from "../../drawer";
import { ICategory, IIdentity, IProduct } from "../../../interfaces";
import { DeleteButton, NumberField } from "@refinedev/antd";
import { ProductStatus } from "../status";
import { EditOutlined } from "@ant-design/icons";

type Props = {
  id?: BaseKey;
  onClose?: () => void;
  onEdit?: () => void;
};

export const CourseDrawerShow = (props: Props) => {
  const { listUrl } = useNavigation()
  const pathname = useLocation()
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { data: user } = useGetIdentity<IIdentity>();
  const go = useGo();
  const { editUrl } = useNavigation();
  const t = useTranslate();
  const { token } = theme.useToken();
  const breakpoint = Grid.useBreakpoint();

  const { queryResult } = useShow<IProduct, HttpError>({
    resource: `generateCode/${user?.id}`,
    id: params.id,
  });
  const courses = queryResult.data?.data;

  console.log(user);
  

  const handleDrawerClose = () => {
    if (props?.onClose) {
      props.onClose();
      return;
    }

    go({
      to:
        // searchParams.get("to") ??
        // getToPath({
        //   action: "list",
        // }) ??

        `${listUrl("courses")}`,
      query: {
        to: pathname,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  return (
    <Drawer
      open={true}
      width={breakpoint.sm ? "80%" : "100%"}
      zIndex={1001}
      onClose={handleDrawerClose}
    >
      <Flex vertical align="left" justify="center" style={{margin: "20px"}}>
        <Typography.Title>
          CSM 183: Introduction to Computers
        </Typography.Title>
      </Flex>
      <Flex
        vertical
        style={{
          backgroundColor: token.colorBgContainer,
        }}
      >
        <Flex
          vertical
          style={{
            padding: "16px",
          }}
        >
          <Typography.Title level={5}>{courses?.name}</Typography.Title>
          <Typography.Text type="secondary">
            {courses?.description}
          </Typography.Text>
        </Flex>
        <Divider
          style={{
            margin: 0,
            padding: 0,
          }}
        />
        <List
          dataSource={[
            {
              label: (
                <Typography.Text type="secondary">
                  {t("Course price")}
                </Typography.Text>
              ),
              value: (
                <NumberField
                  value={courses?.price || 0}
                  options={{
                    style: "currency",
                    currency: "USD",
                  }}
                />
              ),
            },
            {
              label: (
                <Typography.Text type="secondary">
                  {t("Course category")}
                </Typography.Text>
              ),
              // value: <Typography.Text>{category?.title}</Typography.Text>,
            },
            {
              label: (
                <Typography.Text type="secondary">
                  {t("products.fields.isActive.label")}
                </Typography.Text>
              ),
              value: <ProductStatus value={!!courses?.isActive} />,
            },
          ]}
          renderItem={(item) => {
            return (
              <List.Item>
                <List.Item.Meta
                  style={{
                    padding: "0 16px",
                  }}
                  avatar={item.label}
                  title={item.value}
                />
              </List.Item>
            );
          }}
        />
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        style={{
          padding: "16px 16px 16px 0",
        }}
      >
        <DeleteButton
          type="text"
          recordItemId={courses?.id}
          resource="products"
          onSuccess={() => {
            handleDrawerClose();
          }}
        />
        <Button
          icon={<EditOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
          onClick={() => {
            if (props?.onEdit) {
              return props.onEdit();
            }

            return go({
              to: `${editUrl("products", courses?.id || "")}`,
              query: {
                to: "/products",
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        >
          {t("actions.edit")}
        </Button>
      </Flex>
    </Drawer>
  );
};
