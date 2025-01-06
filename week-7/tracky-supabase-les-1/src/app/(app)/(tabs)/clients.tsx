import { getClients } from "@core/modules/clients/api";
import { Client } from "@core/modules/clients/types";
import HeaderButtonLink from "@design/Button/HeaderButtonLink";
import ListItem from "@design/List/ListItem";
import DataListView from "@functional/Data/DataListView";
import { useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";

const Clients = () => {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButtonLink href="clients/create" title="Add client" icon="plus" />,
    });
  }, [navigation]);

  return (
    <DataListView
      name={["clients"]}
      method={getClients}
      renderItem={({ item }: { item: Client }) => (
        <ListItem onPress={() => router.push(`/clients/update/${item.id}`)} title={item.name} />
      )}
      onAddItem={() => router.push("/clients/create")}
      emptyIcon="briefcase"
      emptyTitle="Nog geen klanten"
      emptyDescription="Voeg je eerste klant toe"
    />
  );
};

export default Clients;
