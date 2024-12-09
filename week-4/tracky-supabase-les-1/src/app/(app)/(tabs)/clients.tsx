import { getClients } from "@core/modules/clients/api";
import { Client } from "@core/modules/clients/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import HeaderButtonLink from "@design/Button/HeaderButtonLink";
import Divider from "@design/List/Divider";
import ListItem from "@design/List/ListItem";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import EmptyView from "@design/View/EmptyView";
import { useQuery } from "@tanstack/react-query";
import { useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

const Clients = () => {
  const router = useRouter();
  const navigation = useNavigation();

  const {
    data: clients,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButtonLink href="clients/create" title="Add client" icon="plus" />,
    });
  }, [navigation]);

  if (error) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!clients || isLoading) {
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
          onPress={() => router.push("/clients/create")}
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
        renderItem={({ item }) => (
          <ListItem onPress={() => router.push(`/clients/update/${item.id}`)} title={item.name} />
        )}
      />
    </DefaultView>
  );
};

export default Clients;
