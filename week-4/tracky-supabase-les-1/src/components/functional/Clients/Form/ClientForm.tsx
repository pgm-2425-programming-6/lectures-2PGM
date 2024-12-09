import { Client, CreateClientBody, UpdateClientBody } from "@core/modules/clients/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import Button from "@design/Button/Button";
import TextField from "@design/Form/TextField";
import DefaultView from "@design/View/DefaultView";
import { Variables } from "@style/theme";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

type Props<T> = {
  label: string;
  initialData: T;
  updateMethod: (data: T) => Promise<Client | null>;
  onSuccess: () => void;
};

const ClientForm = <T extends CreateClientBody | UpdateClientBody>({
  label,
  initialData,
  updateMethod,
  onSuccess,
}: Props<T>) => {
  const [data, setData] = useState(initialData);

  const handleInput = (name: string, value: string) => {
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
          placeholder="client name"
          onChangeText={(name) => handleInput("name", name)}
          value={data.name ?? ""}
          disabled={isPending}
        />
        <Button style={styles.button} onPress={handleSubmit} disabled={isPending}>
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
export default ClientForm;
