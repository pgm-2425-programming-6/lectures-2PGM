import { FlatList, ListRenderItem } from "react-native";
import Icons from "@expo/vector-icons/Feather";
import EmptyView from "@design/View/EmptyView";
import Divider from "@design/List/Divider";
import DefaultView from "@design/View/DefaultView";
import DataView from "./DataView";
import { QueryKey } from "@tanstack/react-query";

type Props<T> = {
  name: QueryKey;
  method: () => Promise<T[] | null>;
  onAddItem: () => void;
  emptyIcon: keyof typeof Icons.glyphMap;
  emptyTitle: string;
  emptyDescription: string;
  renderItem: ListRenderItem<T>;
};

const DataListView = <T extends { id: number }>({
  name,
  method,
  renderItem,
  onAddItem,
  emptyIcon,
  emptyTitle,
  emptyDescription,
}: Props<T>) => {
  return (
    <DataView
      name={name}
      method={method}
      render={(data) =>
        data.length === 0 ? (
          <EmptyView icon={emptyIcon} title={emptyTitle} description={emptyDescription} onPress={onAddItem} />
        ) : (
          <DefaultView padding={false}>
            <FlatList
              ItemSeparatorComponent={() => <Divider />}
              data={data}
              keyExtractor={(item) => String(item.id)}
              renderItem={renderItem}
            />
          </DefaultView>
        )
      }
    />
  );
};

export default DataListView;
