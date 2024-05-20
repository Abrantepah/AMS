import { Card, Form, Input, theme } from "antd";
import { useConfigProvider } from "../../context";
import { CheckCircleOutlined } from "@ant-design/icons";
import { SaveButton } from "@refinedev/antd";

type Props = {
  handleFinish: () => void,
  setCode: any,
};

export const CodeCard = ({ handleFinish, setCode }: Props) => {
  const { token } = theme.useToken();
  const { mode } = useConfigProvider();

  return (
    <Card
      styles={{
        body: {
          padding: 50,
        },
      }}
    >
      <Form layout="vertical">
      <Form.Item
          // name="email"
          name={"verificationcode"}
          label={"Verification Code"}
          rules={[
            { required: true },
            {
              // type: "number",
              message: "Invalid Vefication code",
            },
          ]}
        >
          <Input
            onChange={(e) => setCode(e.currentTarget.value)}
            size="large"
            placeholder={"Verification Code"}
          />
      </Form.Item>
        <SaveButton
          style={{
            marginLeft: "auto",
            width: '100%'
          }}
          htmlType="submit"
          onClick={handleFinish}
          type="primary"
          icon={<CheckCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>}
        >
          Verify
        </SaveButton>
      </Form>
    </Card>
  );
};
