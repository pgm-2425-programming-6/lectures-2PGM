import { getProjectById, updateProject } from "@core/modules/projects/api";
import DataView from "@functional/Data/DataView";
import ProjectForm from "@functional/Projects/Form/ProjectForm";
import { useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

const UpdateProject = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["projects"],
    });
    router.back();
  };

  return (
    <DataView
      name={["projects", id]}
      method={() => getProjectById(id)}
      render={(data) => {
        // remove client from project
        const { client, ...project } = data;
        return (
          <>
            <Stack.Screen options={{ title: "Edit project" }} />
            <ProjectForm
              initialData={project}
              updateMethod={updateProject}
              onSuccess={handleSuccess}
              label="Aanpassen"
            />
          </>
        );
      }}
    />
  );
};

export default UpdateProject;
