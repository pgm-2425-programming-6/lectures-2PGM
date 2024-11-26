import { getClients } from "@core/modules/clients/api";
import { Client } from "@core/modules/clients/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import Divider from "@design/List/Divider";
import ListItem from "@design/List/ListItem";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import EmptyView from "@design/View/EmptyView";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

const placeholderData = [
  {
    id: 1,
    name: "Client 1",
  },
  {
    id: 2,
    name: "Client 2",
  },
  {
    id: 3,
    name: "Client 3",
  },
];

const Clients = () => {
  const [clients, setClients] = useState<Client[] | null>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    getClients()
      .then((data) => {
        setClients(data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!clients) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  if (clients.length === 0) {
    return (
      <DefaultView>
        <EmptyView
          icon="briefcase"
          title="Nog geen klanten"
          description="Voeg je eerste klant toe"
          onPress={() => {}}
        />
      </DefaultView>
    );
  }

  return (
    <DefaultView padding={false}>
      <FlatList
        data={clients}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => <ListItem onPress={() => {}} title={item.name} />}
      />
    </DefaultView>
  );
};

export default Clients;
