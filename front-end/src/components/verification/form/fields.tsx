import { useEffect, useRef } from "react";
import { UseFormProps, useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/antd";
import {
  SaveButton,
  UseFormReturnType,
} from "@refinedev/antd";
import {
  Form,
  Input,
  Card,
  InputRef,
} from "antd";
import _debounce from "lodash/debounce";
import { IIdentity, IStore } from "../../../interfaces";
import { CheckCircleOutlined } from "@ant-design/icons";

type Props = {
  mutate: any;
  // saveButtonProps: UseFormReturnType<IStore>["saveButtonProps"];
  action: UseFormProps["action"];
  isFormDisabled: boolean;
  setIsFormDisabled: (value: boolean) => void;

};

export const StoreFormFields = ({
  mutate,
  // saveButtonProps,
  isFormDisabled,
}: Props) => {
  const titleInputRef = useRef<InputRef>(null);
  const { formProps, saveButtonProps } = useForm()
  const {data: user } = useGetIdentity<IIdentity>()


  useEffect(() => {
    if (!isFormDisabled) {
      titleInputRef.current?.focus();
    }
  }, [isFormDisabled]);



  const handleFinish = async (values: any) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const updatedValues = {
        ...values,
        latitude: 6.6720338,
        longitude: -1.5693139,
      };
        const response = await mutate({
          resource: `verification_api/${user?.id}/`,
          
          values: {
            verificationcode: updatedValues.verificationcode,
            latitude: updatedValues.latitude,
            longitude: updatedValues.longitude
          }, 
        }, {
            onSuccess: () => {
            // refetch()
            
            },
          })
        
      console.log(response);
      
    });
  } else {
    // Geolocation is not supported
    // Handle it according to your application's requirements
    alert("Please allow location access");
  }
};



  return (
    <Form {...formProps} layout="vertical" disabled={isFormDisabled} onFinish={handleFinish}>

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
            size="large"
            placeholder={"Verification Code"}
          />
      </Form.Item>
        <SaveButton
          {...saveButtonProps}
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
    </Form>
  );
};
