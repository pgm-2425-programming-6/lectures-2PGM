import { createProject } from "@core/modules/projects/api";
import ProjectForm from "@functional/Projects/Form/ProjectForm";
import { Variables } from "@style/theme";
import { useQueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const CreateProject = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["projects"],
    });
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: "Add project" }} />
      <ProjectForm
        label="Toevoegen"
        updateMethod={createProject}
        onSuccess={handleSuccess}
        initialData={{ name: "", client_id: -1 }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: Variables.sizes.sm,
  },
});

export default CreateProject;
