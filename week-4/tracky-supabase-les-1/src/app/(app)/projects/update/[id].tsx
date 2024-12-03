import { getProjectById, updateProject } from "@core/modules/projects/api";
import { ProjectWithClient } from "@core/modules/projects/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import ProjectForm from "@functional/Projects/Form/ProjectForm";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

const UpdateProject = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [project, setProject] = useState<ProjectWithClient | null>();
  const [error, setError] = useState<unknown | null>();

  useEffect(() => {
    if (!id) {
      router.back();
    }

    const fetchData = async () => {
      try {
        const data = await getProjectById(id);
        if (data) {
          setProject(data);
        } else {
          throw new Error("No data returned from API");
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!project) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  // remove clienet from project
  const { client, ...data } = project;

  return (
    <>
      <Stack.Screen options={{ title: "Edit project" }} />
      <ProjectForm
        initialData={data}
        updateMethod={updateProject}
        onSuccess={() => router.back()}
        label="Aanpassen"
      />
    </>
  );
};

export default UpdateProject;
