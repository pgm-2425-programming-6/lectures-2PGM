import { getClientById, updateClient } from "@core/modules/clients/api";
import ErrorMessage from "@design/Alert/ErrorMessage";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import ClientForm from "@functional/Clients/Form/ClientForm";
import { Variables } from "@style/theme";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const UpdateClient = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: client,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["clients", id],
    queryFn: () => getClientById(id),
  });

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["clients"],
    });
    router.back();
  };

  if (error) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!client || isLoading) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: "Edit client" }} />
      <ClientForm
        label="Pas aan"
        updateMethod={updateClient}
        onSuccess={handleSuccess}
        initialData={client}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: Variables.sizes.sm,
  },
});

export default UpdateClient;
