import { getClientById, updateClient } from "@core/modules/clients/api";
import ClientForm from "@functional/Clients/Form/ClientForm";
import DataView from "@functional/Data/DataView";
import { Variables } from "@style/theme";
import { useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const UpdateClient = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["clients"],
    });
    router.back();
  };

  return (
    <DataView
      name={["clients", id]}
      method={() => getClientById(id)}
      render={(data) => (
        <>
          <Stack.Screen options={{ title: "Edit client" }} />
          <ClientForm
            label="Pas aan"
            updateMethod={updateClient}
            onSuccess={handleSuccess}
            initialData={data}
          />
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: Variables.sizes.sm,
  },
});

export default UpdateClient;
