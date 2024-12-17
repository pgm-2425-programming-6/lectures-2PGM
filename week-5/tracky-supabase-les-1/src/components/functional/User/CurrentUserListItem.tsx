import { formatName, getInitials } from "@core/modules/profiles/utils";
import ListProfileItem from "@design/List/Profile/ListProfileItem";
import useUser from "@functional/Auth/useUser";

const CurrentUserListItem = () => {
  const user = useUser();

  const handlePress = () => {};

  return (
    <ListProfileItem
      title={formatName(user)}
      avatarText={getInitials(user)}
      description={user.email}
      onPress={handlePress}
    />
  );
};

export default CurrentUserListItem;
