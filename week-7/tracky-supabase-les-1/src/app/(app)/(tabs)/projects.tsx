import { getProjects } from "@core/modules/projects/api";
import HeaderButton from "@design/Button/HeaderButtonLink";
import ListItem from "@design/List/ListItem";
import DataListView from "@functional/Data/DataListView";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

const Projects = () => {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton href="projects/create" title="Add client" icon="plus" />,
    });
  }, [navigation]);

  return (
    <DataListView
      name={["projects"]}
      method={getProjects}
      renderItem={({ item }) => (
        <ListItem onPress={() => router.push(`/projects/update/${item.id}`)} title={item.name} />
      )}
      onAddItem={() => router.push("/projects/create")}
      emptyIcon="folder"
      emptyTitle="Nog geen projecten"
      emptyDescription="Voeg je eerste project toe"
    />
  );
};

export default Projects;
