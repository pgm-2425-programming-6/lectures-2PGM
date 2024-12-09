import { createClient } from "@core/modules/clients/api";
import ClientForm from "@functional/Clients/Form/ClientForm";
import { Variables } from "@style/theme";
import { useQueryClient } from "@tanstack/react-query";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";

const CreateClient = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["clients"],
    });
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ title: "Add client" }} />
      <ClientForm
        label="Toevoegen"
        updateMethod={createClient}
        onSuccess={handleSuccess}
        initialData={{ name: "" }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: Variables.sizes.sm,
  },
});

export default CreateClient;
