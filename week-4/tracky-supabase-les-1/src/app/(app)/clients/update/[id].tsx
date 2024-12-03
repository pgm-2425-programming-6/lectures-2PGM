import { createClient, getClientById, updateClient } from "@core/modules/clients/api";
import { Client } from "@core/modules/clients/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import ClientForm from "@functional/Clients/Form/ClientForm";
import { Variables } from "@style/theme";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

const UpdateClient = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [client, setClient] = useState<Client | null>();
  const [error, setError] = useState<unknown | null>();
  const router = useRouter();

  useEffect(() => {
    if (!id) {
      router.back();
    }

    const fetchData = async () => {
      try {
        const data = await getClientById(id);
        if (data) {
          setClient(data);
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

  if (!client) {
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
        onSuccess={() => router.back()}
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
