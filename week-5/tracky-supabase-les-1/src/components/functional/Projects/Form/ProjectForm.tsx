import { Project, CreateProjectBody, UpdateProjectBody } from "@core/modules/projects/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import Button from "@design/Button/Button";
import TextField from "@design/Form/TextField";
import DefaultView from "@design/View/DefaultView";
import ClientsSpinnerField from "@functional/Clients/Spinner/ClientsSpinnerField";
import { Variables } from "@style/theme";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

// todo refactor to react-hook-form

type Props<T> = {
  initialData: T;
  updateMethod: (data: T) => Promise<Project | null>;
  onSuccess: () => void;
  label: string;
};

const ProjectForm = <T extends CreateProjectBody | UpdateProjectBody>({
  initialData,
  updateMethod,
  onSuccess,
  label,
}: Props<T>) => {
  const [data, setData] = useState<T>(initialData);

  const handleInput = (name: string, value: string | number) => {
    setData(() => ({ ...data, [name]: value }));
  };

  const { mutate, error, isPending } = useMutation({
    mutationFn: updateMethod,
    onSuccess: () => {
      onSuccess();
    },
  });

  const handleSubmit = () => {
    mutate(data);
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
          disabled={isPending}
        />

        <ClientsSpinnerField
          label="Client"
          name="client_id"
          onChange={(id: number | string) => handleInput("client_id", id)}
          value={data.id ?? ""}
          disabled={isPending}
        />
        <Button disabled={isPending} style={styles.button} onPress={handleSubmit}>
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
