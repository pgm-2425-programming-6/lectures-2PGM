import { createProject } from "@core/modules/projects/api";
import ProjectForm from "@functional/Projects/Form/ProjectForm";
import { Variables } from "@style/theme";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const CreateProject = () => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ title: "Add project" }} />
      <ProjectForm
        label="Toevoegen"
        updateMethod={createProject}
        onSuccess={() => router.back()}
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
