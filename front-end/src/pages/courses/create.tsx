import { useGetToPath, useGo, useNavigation } from "@refinedev/core";
import { CourseDrawerForm } from "../../components/course/drawer-form";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export const CourseCreate = () => {
  const getToPath = useGetToPath();
  const [searchParams] = useSearchParams();
  const { listUrl } = useNavigation()
  const params = useParams();
  const go = useGo();
  const pathname = useLocation();

  return (
    <CourseDrawerForm
      action="create"
      onMutationSuccess={() => {
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
      }}
    />
  );
};
