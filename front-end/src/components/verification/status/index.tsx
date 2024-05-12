import { Tag, Typography, theme } from "antd";
import { CheckCircleOutlined, StopOutlined } from "@ant-design/icons";
import { useTranslate } from "@refinedev/core";
import { useConfigProvider } from "../../../context";
import { IStore } from "../../../interfaces";

type Props = {
  value: IStore["isActive"];
};

export const StoreStatus = ({ value }: Props) => {
  const t = useTranslate();
  const { token } = theme.useToken();
  const { mode } = useConfigProvider();
  const isDark = mode === "dark";

  return (
    <Tag
      color={value ? "green" : "default"}
      style={{
        color: value ? token.colorSuccess : token.colorTextTertiary,
        marginInlineEnd: 0,
      }}
      icon={value ? <CheckCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} /> : <StopOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
    >
      <Typography.Text
        style={{
          color: value
            ? isDark
              ? token.green7
              : "#3C8618"
            : isDark
              ? token.colorTextTertiary
              : token.colorTextTertiary,
        }}
      >
        {t(`stores.fields.isActive.${value}`)}
      </Typography.Text>
    </Tag>
  );
};
