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
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { data: user } = useGetIdentity<IIdentity>();
  const go = useGo();
  const { editUrl } = useNavigation();
  const t = useTranslate();
  const { token } = theme.useToken();
  const breakpoint = Grid.useBreakpoint();
  const { mutate } = useCreate();



    const handleGenerateCode = async () => {
    try {
      mutate({
        resource: `generateCode/${user?.id}/${params.id}`,
        values: {
          latitude: '',
          longitude: ''
        },
      }, {
        onSuccess: () => {
          // refetch()
        },
      })


    } catch (error) {
      console.log("Error creating data:", error);
      
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
  // console.log(courses);
  

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
      width={breakpoint.sm ? "90%" : "100%"}
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
      <Flex
        align="center"
        justify="center"
        style={{
          padding: "16px 16px 16px 0",
          height: "100px"
        }}
        
      >
        <Button
          style={{
            backgroundColor: 'green' ,
            color: 'white',
            fontSize: '20px',
            height: "50px"
          }}
          icon={<EditOutlined onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />}
          onClick={handleGenerateCode}
        >
          {t("Generate Code")}
        </Button>
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
        <Typography.Text type="secondary" style={{textAlign: 'center', padding: '70px 0px', fontSize: 50, fontStyle: 'italic'}}>No Code Generated</Typography.Text>
      </Flex>
    </Drawer>
  );
};