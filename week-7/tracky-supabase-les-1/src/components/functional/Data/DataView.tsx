import ErrorMessage from "@design/Alert/ErrorMessage";
import LoadingIndicator from "@design/Loading/LoadingIndicator";
import CenteredView from "@design/View/CenteredView";
import DefaultView from "@design/View/DefaultView";
import { QueryKey, useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";

type Props<T> = {
  name: QueryKey;
  method: () => Promise<T | null>;
  render: (data: T) => React.ReactNode;
  showTitle?: boolean;
  getTitle?: (data: T) => string;
};

const DataView = <T extends Object>({ name, method, render, getTitle, showTitle = false }: Props<T>) => {
  const { data, isError, error, isLoading } = useQuery({
    queryKey: name,
    queryFn: method,
  });

  if (isError) {
    return (
      <DefaultView>
        <ErrorMessage error={error} />
      </DefaultView>
    );
  }

  if (isLoading || !data) {
    return (
      <CenteredView>
        <LoadingIndicator />
      </CenteredView>
    );
  }

  return (
    <>
      {showTitle && getTitle && <Stack.Screen options={{ title: getTitle(data) }} />}
      {render(data)}
    </>
  );
};

export default DataView;
