import { useEffect, useState } from "react";
import { UseFormProps, useForm } from "@refinedev/antd";
import { useDebounceValue } from "usehooks-ts";
import { useGetIdentity } from "@refinedev/core";
import {
  convertLatLng,
  LatLng,
  getAddressWithLatLng,
  getLatLngWithAddress,
} from "../../../utils";
import { IIdentity, IStore } from "../../../interfaces";


type Props = {
  action: UseFormProps["action"];
};

export const useStoreForm = (props: Props) => {
  const [isFormDisabled, setIsFormDisabled] = useState(() =>
    props.action === "edit" ? true : false,
  );
  const { data: user } = useGetIdentity<IIdentity>();

  const form = useForm<IStore>({
    resource: `verification_api/${user?.id}/`,
    action: props.action,
    redirect: false,
    onMutationSuccess: () => {
      setIsFormDisabled(true);
    },
  });
  const store = form.queryResult?.data?.data;

  const [latLng, setLatLng] = useState<Partial<LatLng>>({
    lat: props.action === "create" ? 39.66853 : undefined,
    lng: props.action === "create" ? -75.67602 : undefined,
  });



  const handleMapOnDragEnd = async ({
    lat,
    lng,
  }: {
    lat: number;
    lng: number;
  }) => {
    // get address with lat lng and set form field
    const data = await getAddressWithLatLng({ lat, lng });
    if (data) {
      // set form field with address value
      form.formProps.form?.setFieldValue(["address", "text"], data.address);
    }
  };

  const handleSetIsFormDisabled = (value: boolean) => {
    form.formProps.form?.resetFields();
    setIsFormDisabled(value);
  };

  const isLoading = form.queryResult?.isFetching || form.formLoading;

  return {
    ...form,
    store,
    formLoading: isLoading,
    latLng,
    isFormDisabled,
    setIsFormDisabled: handleSetIsFormDisabled,
    handleMapOnDragEnd,
  };
};
