import { useTranslate } from "@refinedev/core";
import { ListButton } from "@refinedev/antd";
import { Flex, Divider, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { StoreForm } from "../../components";

export const StoreCreate = () => {
  const t = useTranslate();

  return (
    <>
      <Typography.Title style={{ fontSize: 25}}>Mark Attendance</Typography.Title>
      <Divider />
      <StoreForm action="create" />
    </>
  );
};
