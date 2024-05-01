import { Col, Row, theme, Spin, Typography, Flex } from "antd";
import { useStoreForm } from "./useStoreForm";
import { StoreFormFields } from "./fields";
import { UseFormProps } from "@refinedev/antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CardWithPlot } from "../../card";

type Props = {
  action: UseFormProps["action"];
};

export const StoreForm = (props: Props) => {
  const { token } = theme.useToken();
  const {
    formProps,
    saveButtonProps,
    formLoading,
    isFormDisabled,
    setIsFormDisabled,
  } = useStoreForm({
    action: props.action,
  });

  return (
    <Spin spinning={formLoading}>
      <Row gutter={32} wrap>
        <Col xs={24} md={12} lg={9} style={{marginTop: 64}}>
          <StoreFormFields
            formProps={formProps}
            saveButtonProps={saveButtonProps}
            action={props.action}
            isFormDisabled={isFormDisabled}
            setIsFormDisabled={setIsFormDisabled}

          />
        </Col>
        <Col
          xs={24}
          md={12}
          lg={12}
          style={{
            height: "432px",
            marginTop: "64px",
          }}
        >
        <CardWithPlot
          icon={
            <CheckCircleOutlined
              style={{
                fontSize: 14,
                color: token.colorPrimary,
              }} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
          }
          bodyStyles={{padding:'37px'}}
          title={"Verified Course"}
          
        >
          <Flex style={{justifyContent: 'space-between', marginBottom: '15px'}}>
            <Typography
              style={{
                fontSize: 16,
                fontWeight: 600
              }}
            >
            
            {
              // @ts-ignore
              'Course Code'}
            </Typography>
            <Typography.Text>
            
            {
              // @ts-ignore
              'CSM 183'}
            </Typography.Text>
          </Flex>
          <Flex style={{justifyContent: 'space-between', marginBottom:'15px'}}>
            <Typography
              style={{
                fontSize: 16,
                fontWeight: 600
              }}
            >
            
            {
              // @ts-ignore
              'Course'}
            </Typography>
            <Typography.Text>
            
            {
              // @ts-ignore
              'Introduction To Computers'}
            </Typography.Text>
          </Flex>
          <Flex style={{justifyContent: 'space-between'}}>
            <Typography
              style={{
                fontSize: 16,
                fontWeight: 600
              }}
            >
            
            {
              // @ts-ignore
              'Session number'}
            </Typography>
            <Typography.Text>
            
            {
              // @ts-ignore
              '2'}
            </Typography.Text>
          </Flex>
        </CardWithPlot>
      </Col>

    </Row>
  </Spin>
  );
};
