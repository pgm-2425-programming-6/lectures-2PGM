import { getProjects } from "@core/modules/projects/api";
import { Project } from "@core/modules/projects/types";
import ErrorMessage from "@design/Alert/ErrorMessage";
import HeaderButton from "@design/Button/HeaderButtonLink";
import Divider from "@design/List/Divider";
import ListItem from "@design/List/ListItem";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import EmptyView from "@design/View/EmptyView";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList } from "react-native";

const Projects = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>();
  const [error, setError] = useState<unknown | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProjects();
        if (data) {
          setProjects(data);
        } else {
          throw new Error("No data returned from API");
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderButton href="projects/create" title="Add client" icon="plus" />,
    });
  }, [navigation]);

  if (error) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (!projects) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  if (projects.length === 0) {
    return (
      <DefaultView>
        <EmptyView
          icon="folder"
          title="Nog geen projecten"
          description="Voeg je eerste project toe"
          onPress={() => router.push("/projects/create")}
        />
      </DefaultView>
    );
  }

  return (
    <DefaultView padding={false}>
      <FlatList
        data={projects}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <ListItem onPress={() => router.push(`/projects/update/${item.id}`)} title={item.name} />
        )}
      />
    </DefaultView>
  );
};

export default Projects;
