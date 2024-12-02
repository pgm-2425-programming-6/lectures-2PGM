import { Client, CreateClientBody, UpdateClientBody } from "@core/modules/clients/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import Button from "@design/Button/Button";
import TextField from "@design/Form/TextField";
import DefaultView from "@design/View/DefaultView";
import { Variables } from "@style/theme";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

type Props<T> = {
  label: string;
  initialData: T;
  updateMethod: (data: T) => Promise<Client | null>;
  onSuccess: (data: Client) => void;
};

const ClientForm = <T extends CreateClientBody | UpdateClientBody>({
  label,
  initialData,
  updateMethod,
  onSuccess,
}: Props<T>) => {
  const [data, setData] = useState(initialData);
  const [error, setError] = useState<unknown | null>(null);

  const handleInput = (name: string, value: string) => {
    setData(() => ({ ...data, [name]: value }));
  };

  const handleSubmit = () => {
    updateMethod(data)
      .then((response) => {
        if (response) {
          onSuccess(response);
        }
      })
      .catch((error: any) => {
        setError(error);
      });
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
        />
        <Button style={styles.button} onPress={handleSubmit}>
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
