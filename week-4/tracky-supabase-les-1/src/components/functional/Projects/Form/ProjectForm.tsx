import { Project, CreateProjectBody, UpdateProjectBody } from "@core/modules/projects/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import Button from "@design/Button/Button";
import TextField from "@design/Form/TextField";
import DefaultView from "@design/View/DefaultView";
import ClientsSpinnerField from "@functional/Clients/Spinner/ClientsSpinnerField";
import { Variables } from "@style/theme";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

type Props<T> = {
  initialData: T;
  updateMethod: (data: T) => Promise<Project | null>;
  onSuccess: (data: Project | null) => void;
  label: string;
};

const ProjectForm = <T extends CreateProjectBody | UpdateProjectBody>({
  initialData,
  updateMethod,
  onSuccess,
  label,
}: Props<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleInput = (name: string, value: string | number) => {
    setData(() => ({ ...data, [name]: value }));
  };

  const handleSubmit = () => {
    setIsLoading(true);
    updateMethod(data)
      .then((response) => {
        if (response) {
          onSuccess(response);
        }
      })
      .catch((error: any) => {
        setError(error);
        setIsLoading(false);
      });
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <DefaultView>
        {!!error && <ErrorMessage error={error} />}

        <TextField
          label="Name"
          name="name"
          placeholder="project name"
          onChangeText={(name) => handleInput("name", name)}
          value={data.name ?? ""}
        />

        <ClientsSpinnerField
          label="Client"
          name="client_id"
          onChange={(id: number | string) => handleInput("client_id", id)}
          value={data.id ?? ""}
        />
        <Button disabled={isLoading} style={styles.button} onPress={handleSubmit}>
          {label}
        </Button>
      </DefaultView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: Variables.sizes.sm,
  },
});

export default ProjectForm;
