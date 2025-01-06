import { getProfiles } from "@core/modules/profiles/api";
import { formatName } from "@core/modules/profiles/utils";
import ErrorMessage from "@design/Alert/ErrorMessage";
import Divider from "@design/List/Divider";
import ListItem from "@design/List/ListItem";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import EmptyView from "@design/View/EmptyView";
import { useQuery } from "@tanstack/react-query";
import { FlatList } from "react-native";

const Profiles = () => {
  const {
    data: profiles,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["profiles"],
    queryFn: getProfiles,
  });

  if (error) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!profiles || isLoading) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  if (profiles.length === 0) {
    return (
      <DefaultView>
        <EmptyView
          icon="user"
          title="Nog geen gebruikers"
          description="Er zijn nog geen gebruikers toegevoegd."
        />
      </DefaultView>
    );
  }

  return (
    <DefaultView padding={false}>
      <FlatList
        data={profiles}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => <ListItem onPress={() => {}} title={formatName(item)} />}
      />
    </DefaultView>
  );
};

export default Profiles;
