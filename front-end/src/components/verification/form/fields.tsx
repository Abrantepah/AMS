import { useEffect, useRef } from "react";
import { UseFormProps } from "@refinedev/core";
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
import { IStore } from "../../../interfaces";

type Props = {
  formProps: UseFormReturnType<IStore>["formProps"];
  saveButtonProps: UseFormReturnType<IStore>["saveButtonProps"];
  action: UseFormProps["action"];
  isFormDisabled: boolean;
  setIsFormDisabled: (value: boolean) => void;

};

export const StoreFormFields = ({
  formProps,
  saveButtonProps,
  isFormDisabled,
}: Props) => {
  const titleInputRef = useRef<InputRef>(null);


  useEffect(() => {
    if (!isFormDisabled) {
      titleInputRef.current?.focus();
    }
  }, [isFormDisabled]);


  return (
    <Form {...formProps} layout="vertical" disabled={isFormDisabled}>

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
                message: "Invalid reference number",
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
          type="primary"
          icon={null}
        >
          Verify
        </SaveButton>
      </Card>
    </Form>
  );
};
