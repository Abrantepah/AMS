import {
  BaseKey,
  HttpError,
  useGetIdentity,
  useGetToPath,
  useGo,
  useNavigation,
  useCreate,
  useShow,
  useTranslate,
} from "@refinedev/core";
import {
  Divider,
  Flex,
  Grid,
  Spin,
  Typography,
  theme,
} from "antd";
import { useLocation, useParams } from "react-router-dom";
import { Drawer } from "../../drawer";
import { IIdentity } from "../../../interfaces";
import { QrcodeOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { SaveButton } from "@refinedev/antd";

type Props = {
  id?: BaseKey;
  onClose?: () => void;
  onEdit?: () => void;
};

interface ICourse {
    id: number;
    name: string;
    code: string;
    year: number;
    lecturer: number;
    department: number[];
}

export const CourseDrawerShow = (props: Props) => {
  const { listUrl } = useNavigation()
  const pathname = useLocation()
  const params = useParams();
  const { data: user } = useGetIdentity<IIdentity>();
  const go = useGo();
  const t = useTranslate();
  const { token } = theme.useToken();
  const breakpoint = Grid.useBreakpoint();
  const { mutate, data:codeData, isLoading } = useCreate();

  const [isButtonDisabled, setButtonDisabled] = useState(false);


    useEffect(() => {
    const data = localStorage.getItem('storedCode');
    if (data == 'undefined' || !data) {
      localStorage.setItem('storedCode', JSON.stringify(codeData))
    }
    
  }, [codeData])
  const retrievedCode = !(localStorage.getItem('storedCode')) || localStorage.getItem('storedCode') == 'undefined' ? {
    code: "No Generated Code"
  }
  :
  // @ts-ignore
  JSON.parse(localStorage.getItem('storedCode'))
  
  const handleGenerateCode = async () => {
    setButtonDisabled(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          mutate({
            resource: `generateCode/${user?.id}/${params.id}/`,
            values: {
              latitude: latitude,
              longitude: longitude
            },
          }, {
            onSuccess: () => {
              // refetch()
              setButtonDisabled(false);
            },
          });
        } catch (error) {
          console.log("Error creating data:", error);
          setButtonDisabled(false);
        }
      }, (error) => {
        console.log("Error getting location:", error);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };


  const { queryResult } = useShow<ICourse, HttpError>({
    resource: `generateCode/${user?.id}`,
    id: params.id,
  });
  const courses = queryResult.data?.data ?? {};
  // @ts-ignore
  const courseArray = courses.courses ?? [];
  // @ts-ignore
  const selectedCourse = courseArray[(params?.id) - 1] ?? {
    id: "No Id",
    name: "No Course",
    code: "No Code",
    year: "No year",
    lecturer: "No Lecturer",
  }
  // @ts-ignore
  const availableSession = courses.session ?? {
    id: "No Id",
  };
  
  const mainCode = codeData?.data?.code ??  "No Generated Code"
  
  console.log(retrievedCode.code);
  

  const handleDrawerClose = () => {
    if (props?.onClose) {
      props.onClose();
      return;
    }

    go({
      to:`${listUrl("courses")}`,
      query: {
        to: pathname,
      },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
    localStorage.setItem('storedCode', 'undefined')
  };

  return (
    <Drawer
      open={true}
      width={breakpoint.sm ? "60%" : "100%"}
      zIndex={1001}
      onClose={handleDrawerClose}
    >
      <Flex vertical align="left" justify="center" style={{margin: "20px"}}>
        <Typography.Title>
          
          {
            // @ts-ignore
            `${selectedCourse.code} : ${selectedCourse.name}`
          }
        </Typography.Title>
      </Flex>
      <Flex
        vertical
        style={{
          backgroundColor: token.colorBgContainer,
          padding: "40px",
          margin: 40,
          borderRadius: 10
        }}
      >
        <Flex gap={100}
          style={{
            width: "100%",
          }}
        >
          <Typography.Title level={5}>Session</Typography.Title>
          <Typography.Text type="secondary" style={{fontSize: 18}}>
            {availableSession.id}
          </Typography.Text>
        </Flex>
        <Divider
          style={{
            margin: 0,
            padding: 10,
          }}
        />
        <Typography.Text style={{color: 'red', fontSize: 16, fontStyle: 'italic'}}>Every session has time limit of 15 minutes</Typography.Text>
      </Flex>
      <Spin spinning={isLoading}>
        <Flex
          align="center"
          justify="center"
          style={{
            padding: "16px 16px 16px 0",
            height: "100px"
          }}
          
        >
          <SaveButton
            style={{
              backgroundColor: 'green' ,
              color: 'white',
              fontSize: '20px',
              height: "50px"
            }}
            htmlType="submit"
            disabled={isButtonDisabled}
            icon={isButtonDisabled?<Spin tip style={{color: 'white'}} /> :<QrcodeOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
            onClick={handleGenerateCode}
          >
            {isButtonDisabled? "Generating...": "Generate Code"}
          </SaveButton>
        </Flex>
        <Flex
          vertical
          style={{
            backgroundColor: token.colorBgContainer,
            padding: "40px",
            margin: 40,
            borderRadius: 10
          }}
        >
          <Flex gap={100}
            style={{
              width: "100%",
            }}
          >
            <Typography.Text type="secondary" style={{fontSize: 16, fontStyle: 'italic'}}>
              Generated code appears below
            </Typography.Text>
          </Flex>
          <Divider
            style={{
              margin: 10,
              padding: 10,
            }}
          />
          <Typography.Text type="secondary" style={{ textAlign: 'center', padding: '70px 0px', fontSize: 50, fontStyle: 'italic' }}>{ codeData == undefined? retrievedCode.code : mainCode }</Typography.Text>
        </Flex>
      </Spin>
    </Drawer>
  );
};