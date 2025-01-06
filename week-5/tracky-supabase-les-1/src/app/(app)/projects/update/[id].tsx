import { getProjectById, updateProject } from "@core/modules/projects/api";
import ErrorMessage from "@design/Alert/ErrorMessage";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import ProjectForm from "@functional/Projects/Form/ProjectForm";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

const UpdateProject = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const {
    data: project,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["projects", id],
    queryFn: () => getProjectById(id),
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["projects"],
    });
    router.back();
  };

  if (error) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!project || isLoading) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  // remove client from project
  const { client, ...data } = project;

  return (
    <>
      <Stack.Screen options={{ title: "Edit project" }} />
      <ProjectForm
        initialData={data}
        updateMethod={updateProject}
        onSuccess={handleSuccess}
        label="Aanpassen"
      />
    </>
  );
};

export default UpdateProject;
