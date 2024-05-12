import { List } from "@refinedev/antd";
import { PropsWithChildren } from "react";

import { ClassListCard } from "../../components/report";

export const ReportList = ({ children }: PropsWithChildren) => {


  return (
    <List
      breadcrumb={false}
    >
      { <ClassListCard />}
      {children}
    </List>
  );
};
