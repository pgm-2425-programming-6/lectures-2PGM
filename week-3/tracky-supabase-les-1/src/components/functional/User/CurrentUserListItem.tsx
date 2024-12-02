import ListProfileItem from "@design/List/Profile/ListProfileItem";
import useUser from "@functional/Auth/useUser";

type Props = {
  onPress: () => void;
};

const CurrentUserListItem = ({ onPress }: Props) => {
  const user = useUser();
  return <ListProfileItem title="John Doe" avatarText="JD" description={user.email} onPress={onPress} />;
};

export default CurrentUserListItem;
