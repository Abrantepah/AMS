import { Col, Row, theme, Spin, Typography, Flex } from "antd";
import { useCreate } from "@refinedev/core";
import { StoreFormFields } from "./fields";
import { UseFormProps } from "@refinedev/antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CardWithPlot } from "../../card";
import { useState } from "react";

type Props = {
  action: UseFormProps["action"];
};

export const
  StoreForm = (props: Props) => {
    const [isFormDisabled, setIsFormDisabled] = useState(() =>
    props.action === "edit" ? true : false,
  );
  const { token } = theme.useToken();
  const { data, isLoading, mutate } = useCreate();
  
    // console.log(createData);
    

  return (
    <Spin spinning={isLoading}>
      <Row gutter={32} wrap>
        <Col xs={24} md={12} lg={9} style={{marginTop: 64}}>
          <StoreFormFields
            mutate={mutate}
            // saveButtonProps={saveButtonProps}
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
