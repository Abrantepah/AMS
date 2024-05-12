import { theme } from "antd";
import { useTranslation } from "react-i18next";

import { CreateButton, List } from "@refinedev/antd";
import { useGetIdentity, useGo, useNavigation } from "@refinedev/core";
import { useLocation } from "react-router-dom";
import { IIdentity} from "../../interfaces";


export const StudentDashboardPage = () => {
  const { t } = useTranslation();
  const { data: user } = useGetIdentity<IIdentity>();
  const go = useGo();
  const { listUrl } = useNavigation();
  const pathname = useLocation()

  //   const { queryResult: lecturerCourses } = useShow({
  //     resource: "generateCode",
  //     id: user?.id
  // });

  // const courses = lecturerCourses.data?.data.courses ?? [];

  

  return (
    <List
      title={t("dashboard.overview.title")}
      headerProps={{
        subTitle: `Hello ${user?.name}`
      }}
      headerButtons={(props) => (
        <CreateButton
          {...props.createButtonProps}
          key="create"
          size="large"
          onClick={() => {
            return go({
              to: `${listUrl("courses")}`,
              query: {
                to: pathname,
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        >
          {t("Add course")}
        </CreateButton>
      )}
    >

    </List>
  );
};
