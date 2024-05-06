// import { useEffect, useState } from "react";
// import { UseFormProps, useForm } from "@refinedev/antd";

// import { useGetIdentity } from "@refinedev/core";

// import { IIdentity, IStore } from "../../../interfaces";


// type Props = {
//   action: UseFormProps["action"];
// };

// export const useStoreForm = (props: Props) => {
//   const [isFormDisabled, setIsFormDisabled] = useState(() =>
//     props.action === "edit" ? true : false,
//   );
//   const { data: user } = useGetIdentity<IIdentity>();

  
  
//   const form = useForm<IStore>({
//     resource: `verification_api/${user?.id}/`,
//     action: props.action,
//     redirect: 'create',
//     onMutationSuccess: () => {
//       setIsFormDisabled(true);
//     },
    
//   });



//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         form.formProps.form?.setFieldsValue({
//           latitude,
//           longitude,
//         });
//       });
//     }
//     else {
//       alert("Please allow location access")
//      }
// }, [form.formProps.form]);
//   const store = form.queryResult?.data?.data;
//   console.log(form.queryResult);
  
  
//   const handleSetIsFormDisabled = (value: boolean) => {
//     form.formProps.form?.resetFields();
//     setIsFormDisabled(value);
//   };

//   const isLoading = form.queryResult?.isFetching || form.formLoading;

//   return {
//     ...form,
//     store,
//     formLoading: isLoading,
//     isFormDisabled,
//     setIsFormDisabled: handleSetIsFormDisabled,
//   };
// };
