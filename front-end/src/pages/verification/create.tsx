import { Flex, Divider, Typography, Spin, theme, Col, Row, Card, Form, Input } from "antd";
import { CardWithPlot } from "../../components";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useGetIdentity, useTranslate, useCreate } from "@refinedev/core";
import { IIdentity } from "../../interfaces";
import { SaveButton} from "@refinedev/antd";
import { useEffect, useState } from "react";

export const StoreCreate = () => {

  const { data: user } = useGetIdentity<IIdentity>();
  const { token } = theme.useToken();
  const { mutate:courseMutate, data:courseData, isLoading } = useCreate();
  const { mutate:attendanceMutate, data:attendanceData, isLoading:attendanceLoading, isError: attendanceError } = useCreate();
  const [code, setCode] = useState('')
  const [attendanceToggle, setAttendanceToggle] = useState(true)


  if (attendanceError) {
    setAttendanceToggle(prevState => !prevState)
    localStorage.setItem('attendanceToggle', 'true')
    localStorage.removeItem('verificationCode')
  }
  
// @ts-ignore
  const retrievedCode = localStorage.getItem('storedData') != 'undefined'|| !(localStorage.getItem('storedData'))? JSON.parse(localStorage.getItem('storedData')) : {
    data: {
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
      const latitude = 5.5592846;  {/*position.coords.latitude*/}
      const longitude = -0.1974306; {/*position.coords.longitude*/} 

      try {
          courseMutate({
          resource: `verification_api/${user?.id}/`,
          values: {
            verificationcode: code,
            latitude: latitude,
            longitude: longitude
          },
        }, {
          onSuccess: () => {
            // refetch()
            setAttendanceToggle(prevState => !prevState)
            localStorage.setItem('attendanceToggle', 'false')
            localStorage.setItem('verificationCode', JSON.stringify({
              code: code
            }))
          },
        });

      } catch (error: any) {
        console.log(error.message);
      }
    }, (error) => {
      console.log("Error getting location:", error);
    });
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
};
  

const handleMarkAttendance = async () => {
  if (courseData != undefined) {
      try {
          attendanceMutate({
          resource: `MarkAttendance/${user?.id}/${code}/`,
          values: {},
        }, {
          onSuccess: () => {
            // refetch()
            setAttendanceToggle(prevState => !prevState)
            localStorage.removeItem('attendanceToggle')
            // @ts-ignore
            if (JSON.parse(localStorage.getItem('attendanceMarked'))) {
              
              localStorage.setItem('attendanceMarked', 'false')
            } else { 
              localStorage.setItem('attendanceMarked', 'true')
            }
            localStorage.removeItem('storedData')
            localStorage.removeItem('verificationCode')
          },
        });

      } catch (error) {
        console.log("Error marking attendance:", error);
      }

  } else {
    const code = localStorage.getItem('verificationCode')
      try {
          attendanceMutate({
          resource: `MarkAttendance/${user?.id}/${code}`,
            values: {
            attendance_type: "start"
          },
        }, {
          onSuccess: () => {
            // refetch()
            localStorage.removeItem('attendanceToggle')
            // @ts-ignore
            if (JSON.parse(localStorage.getItem('attendanceMarked'))) {
              
              localStorage.setItem('attendanceMarked', 'false')
            } else { 
              localStorage.setItem('attendanceMarked', 'true')
            }
            localStorage.removeItem('verificationCode')
            localStorage.removeItem('storedData')
            setAttendanceToggle(prevState => !prevState)
          },
          onError: () => {
            setAttendanceToggle(prevState => !prevState)
            localStorage.setItem('attendanceToggle', 'false')
            localStorage.removeItem('verificationCode')
          },
        });

      } catch (error) {
        console.log("Error marking attendance:", error);
      }
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

  // @ts-ignore
  console.log(JSON.parse(localStorage.getItem('attendanceToggle')));
  


  return (
    <>
  <Typography.Title style={{ fontSize: 25}}>Mark Attendance</Typography.Title>
    <Divider />    
    <Spin spinning={isLoading}>
        <Row gutter={32} wrap>
          {
          // @ts-ignore
          !(localStorage.getItem('attendanceToggle')) && attendanceToggle || JSON.parse(localStorage.getItem('attendanceToggle')) != false && attendanceToggle ? 
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
            :
            <Col xs={24} md={12} lg={9} style={{marginTop: 64}}>

                <Card
                  
                  styles={{
                    body: {
                      padding: 30,
                    },
                  }}
                >
                  <Typography.Text style={{
                    fontStyle: 'italic',
                    color: 'grey',
                  }}>
                    Note: Use the start button if this is the first session verification of the class otherwise use the end button
                  </Typography.Text>
                  <Flex gap={30} style={{marginTop: 35}}>
                  <SaveButton
                    style={{
                      marginLeft: "auto",
                      width: '100%',
                      backgroundColor: 'green'
                      }}
                      htmlType="submit"
                      onClick={handleMarkAttendance}
                      disabled={
                      // @ts-ignore
                        JSON.parse(localStorage.getItem('attendanceMarked'))
                      }
                      type="primary"
                      icon={<CheckCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>}
                      >
                    Start
                  </SaveButton>
                  <SaveButton
                    style={{
                      marginLeft: "auto",
                      width: '100%',
                      backgroundColor: 'red',
                    }}
                      disabled={
                        // @ts-ignore
                        JSON.parse(localStorage.getItem('attendanceMarked')) != true
                       }
                    htmlType="submit"
                    onClick={handleMarkAttendance}
                    type="primary"
                    icon={<CheckCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>}
                  >
                    End
                  </SaveButton>
                  </Flex>
                </Card>
            </Col>
          
          }
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
              verifiedCourse.code != 'N/A' ?  verifiedCourse.code : retrievedCode?.data.courses.code
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
              verifiedCourse.name != 'N/A' ? verifiedCourse.name : retrievedCode?.data.courses.name
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
              courseSession.id != 'N/A' ? courseSession.id : retrievedCode?.data.session.id
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
              courseSession.expiration_time != 'N/A'?
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
