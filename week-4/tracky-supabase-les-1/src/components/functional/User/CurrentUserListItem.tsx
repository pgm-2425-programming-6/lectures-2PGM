import { formatName, getInitials } from "@core/modules/profiles/utils";
import ListProfileItem from "@design/List/Profile/ListProfileItem";
import useUser from "@functional/Auth/useUser";

type Props = {
  onPress: () => void;
};

const CurrentUserListItem = ({ onPress }: Props) => {
  const user = useUser();

  return (
    <ListProfileItem
      title={formatName(user)}
      avatarText={getInitials(user)}
      description={user.email}
      onPress={onPress}
    />
  );
};

export default CurrentUserListItem;
