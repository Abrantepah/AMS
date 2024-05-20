import { Card, Flex, Spin, Typography, theme } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { SaveButton } from "@refinedev/antd";
import { useOne } from "@refinedev/core";
import { useEffect, useState } from "react";

type Props = {
  code: any,
  userId: any,
  handleMarkStartAttendance: () => void,
  handleMarkEndAttendance: () => void
};



export const AttendanceCard = ({ userId, code, handleMarkEndAttendance, handleMarkStartAttendance }: Props) => {

  // const { data: user } = useGetIdentity<IIdentity>();
  
  // @ts-ignore
  code = code != ''? code : !(localStorage.getItem('verificationCode'))? '' : JSON.parse(localStorage.getItem('verificationCode')).code
  // @ts-ignore
  userId = userId != ''? userId : !(localStorage.getItem('attendance-auth'))? '' : JSON.parse(localStorage.getItem('attendance-auth')).id
  // console.log(user?.id);
  const [retrievedAttendance,setRetrievedAttendance] = useState({
    time_remaining: Date.now(),
    match_start_attended: false
  })

  const { data: checkStartData, isLoading } = useOne({
    // @ts-ignore
    resource: `MarkAttendance/${userId}`,
    id: `${code}/`
  })

    useEffect(() => {
      localStorage.setItem('checkStart', JSON.stringify(checkStartData))
      // @ts-ignore
    const data = localStorage.getItem('checkStart') == 'undefined' || !(localStorage.getItem('checkStart')) ?  undefined : JSON.parse(localStorage.getItem('checkStart')).data
      if (data != undefined) {
        setRetrievedAttendance(data)
      }
    }, [checkStartData])
  // @ts-ignore
  
  const remainingTime = new Date(retrievedAttendance?.time_remaining).getTime()
  const currentTime = Date.now()
  console.log(retrievedAttendance);
  

  return (
    <Spin spinning={isLoading}>
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
            onClick={handleMarkStartAttendance}
            disabled={
              // // @ts-ignore
              retrievedAttendance?.match_start_attended == true && remainingTime > currentTime
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
              !(retrievedAttendance?.match_start_attended == true && remainingTime > currentTime) 
              }
          htmlType="submit"
          onClick={handleMarkEndAttendance}
          type="primary"
          icon={<CheckCircleOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}/>}
        >
          End
        </SaveButton>
        </Flex>
      </Card>  
    </Spin>
  );
};
