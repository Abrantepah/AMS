import { useGetToPath, useGo } from "@refinedev/core";
import { CourseDrawerForm } from "../../components/course/drawer-form";
import { useSearchParams } from "react-router-dom";

export const CourseCreate = () => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const go = useGo();

  return (
    <CourseDrawerForm
      action="create"
      onMutationSuccess={() => {
        go({
          to:
            searchParams.get("to") ??
            getToPath({
              action: "list",
            }) ??
            "",
          query: {
            to: undefined,
          },
          options: {
            keepQuery: true,
          },
          type: "replace",
        });
      }}
    />
  );
};
