import { Flex, Divider, Typography, Button, Drawer, Spin, theme, Col, Row, Card, Form, Input } from "antd";
import { CardWithPlot, StoreForm } from "../../components";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useGetIdentity, useTranslate, useCreate, useShow, HttpError } from "@refinedev/core";
import { IIdentity } from "../../interfaces";
import { SaveButton} from "@refinedev/antd";
import { useEffect, useState } from "react";

export const StoreCreate = () => {

  const { data: user } = useGetIdentity<IIdentity>();
  const t = useTranslate();
  const { token } = theme.useToken();
  const { mutate, data:courseData, isLoading } = useCreate();
  const [code, setCode] = useState('')

// @ts-ignore
  const retrievedCode = localStorage.getItem('storedData') != 'undefined'|| !(localStorage.getItem('storedData'))? JSON.parse(localStorage.getItem('storedData')) : {
    courses: {
      id: "N/A",
      code: "N/A",
      name: "N/A",
      expiration_time: "N/A"
    },
    session: {
      id: "N/A",
      expiration_time: "N/A"
    }
  }
  // console.log(retrievedCode);

  useEffect(() => {
    const data = localStorage.getItem('storedData');
    if (data == 'undefined' || !data) {
      localStorage.setItem('storedData', JSON.stringify(courseData))
    }
    
  }, [courseData])
  
const handleFinish = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = 6.6860058;  {/*position.coords.latitude*/}
      const longitude = -1.6008305; {/*position.coords.longitude*/} 

      try {
          mutate({
          resource: `verification_api/${user?.id}/`,
          values: {
            verificationcode: code,
            latitude: latitude,
            longitude: longitude
          },
        }, {
          onSuccess: () => {
            // refetch()
          },
        });

      } catch (error) {
        console.log("Error creating data:", error);
      }
    }, (error) => {
      console.log("Error getting location:", error);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};



  
  const verifiedCourse = courseData?.data?.courses ?? {
    id: "N/A",
    name: "N/A",
    code: "N/A",

  }


  const courseSession = courseData?.data?.session ?? {
    id: "N/A",
    expiration_time: "N/A"
  }

  const sessionTime = new Date(courseSession.expiration_time).toLocaleTimeString();

  
  // @ts-ignore
  const retrievedSessionTime = new Date(retrievedCode?.data.session.expiration_time).toLocaleTimeString()

  
  console.log();
  


  return (
    <>
  <Typography.Title style={{ fontSize: 25}}>Mark Attendance</Typography.Title>
    <Divider />    
    <Spin spinning={isLoading}>
      <Row gutter={32} wrap>
        <Col xs={24} md={12} lg={9} style={{marginTop: 64}}>

            <Card
              styles={{
                body: {
                  padding: 50,
                },
              }}
            >
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
            </Card>
        </Col>
        <Col xs={24} md={12} lg={9} style={{marginTop: 64}}>

            <Card
              styles={{
                body: {
                  padding: 50,
                },
              }}
            >
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
            </Card>
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
              retrievedCode == 'undefined' ?  verifiedCourse.code : retrievedCode?.data.courses.code
            }
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
              retrievedCode == 'undefined' ? verifiedCourse.name : retrievedCode?.data.courses.name
            }
            </Typography.Text>
          </Flex>
          <Flex style={{justifyContent: 'space-between', marginBottom: '15px'}}>
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
              retrievedCode == 'undefined' ? courseSession.id : retrievedCode?.data.session.id
            }
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
              'Code expiration time'}
            </Typography>
            <Typography.Text>
            
            {
              // @ts-ignore
              retrievedCode == 'undefined'? sessionCode.expiration_time === "N/A" ? sessionCode.expiration_time:
              sessionTime : retrievedSessionTime
            }
            </Typography.Text>
          </Flex>   
        </CardWithPlot>
      </Col>

    </Row>
    </Spin>
</>
  );
};
