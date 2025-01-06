import { Client, CreateClientBody, UpdateClientBody } from "@core/modules/clients/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import Button from "@design/Button/Button";
import DefaultView from "@design/View/DefaultView";
import { Variables } from "@style/theme";
import { useMutation } from "@tanstack/react-query";
import { ScrollView, StyleSheet } from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ControlledTextField from "@functional/Form/ControlledTextField";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";

const schema = yup.object().shape({
  name: yup.string().required(),
});

type Props<T> = {
  label: string;
  initialData: DefaultValues<T>;
  updateMethod: (data: T) => Promise<Client | null>;
  onSuccess: () => void;
};

const ClientForm = <T extends CreateClientBody | UpdateClientBody>({
  label,
  initialData,
  updateMethod,
  onSuccess,
}: Props<T>) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<T>({
    defaultValues: initialData,
    resolver: yupResolver(schema),
  });

  const { mutate, error, isPending } = useMutation({
    mutationFn: updateMethod,
    onSuccess: () => {
      onSuccess();
    },
  });

  const handleOnSubmit = (data: FieldValues) => {
    mutate(data as T);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="always">
      <DefaultView>
        {!!error && <ErrorMessage error={error} />}

        <ControlledTextField
          control={control}
          label="Client name"
          name="name"
          placeholder="client name"
          disabled={isPending}
        />

        <Button style={styles.button} onPress={handleSubmit(handleOnSubmit)} disabled={isPending}>
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
