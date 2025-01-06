import { getProfiles } from "@core/modules/profiles/api";
import { formatName } from "@core/modules/profiles/utils";
import ListItem from "@design/List/ListItem";
import DataListView from "@functional/Data/DataListView";

const Profiles = () => {
  return (
    <DataListView
      name={["profiles"]}
      method={getProfiles}
      renderItem={({ item }) => <ListItem onPress={() => {}} title={formatName(item)} />}
      emptyIcon="user"
      emptyTitle="Nog geen gebruikers"
      emptyDescription="Er zijn nog geen gebruikers toegevoegd."
    />
  );
};

export default Profiles;
