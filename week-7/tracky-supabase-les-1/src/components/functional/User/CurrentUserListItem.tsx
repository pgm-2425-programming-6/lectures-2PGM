import { updateProfileAvatar } from "@core/modules/profiles/api";
import { formatName, getInitials } from "@core/modules/profiles/utils";
import { getAvatarUrl } from "@core/modules/storage/utils";
import ListProfileItem from "@design/List/Profile/ListProfileItem";
import { useAuthContext } from "@functional/Auth/AuthProvider";
import useUser from "@functional/Auth/useUser";
import ImagePickerDialog from "@functional/ImagePicker/ImagePickerDialog";
import { useState } from "react";

const CurrentUserListItem = () => {
  const user = useUser();
  const { refresh } = useAuthContext();
  const [showDialog, setShowDialog] = useState(false);

  const handlePress = () => {
    setShowDialog(true);
  };

  const handleOnImage = async (image: string) => {
    try {
      // update profile with new avatar
      await updateProfileAvatar(user.id, image);
      // refresh the current user
      refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ListProfileItem
        title={formatName(user)}
        avatarText={getInitials(user)}
        avatarUrl={user.avatar ? getAvatarUrl(user.avatar) : undefined}
        description={user.email}
        onPress={handlePress}
      />
      {showDialog && <ImagePickerDialog onDismiss={() => setShowDialog(false)} onImage={handleOnImage} />}
    </>
  );
};

export default CurrentUserListItem;
