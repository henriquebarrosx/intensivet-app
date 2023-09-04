import { Alert } from "react-native";
import { useContext, useState } from "react";

import { Session } from "../../models/Session";
import { UserContext } from "../../context/UserContext";
import { disablePushNotification, enablePushNotification } from "../../utils/notification";

export const useViewModel = () => {
  const { userData, setUserData } = useContext(UserContext);
  const  [shouldReceiveNotification, setNotificationState] = useState(!!userData?.expoToken);

  const removeCurrentSession = async (): Promise<void> => {
    await new Session().clear();
    setUserData(null);
  }

  const handlePushNotification = async (shouldReceiveNotification: boolean) => {
    try {
      if (shouldReceiveNotification) {
        const expoToken = await enablePushNotification();
        setUserData((prevState) => ({ ...prevState!, expoToken }));
        return;
      }
      
      await disablePushNotification();
      setUserData((prevState) => ({ ...prevState!, expoToken: '' }));
    }

    catch {
      Alert.alert(
        'Sentimos muito',
        'Houve um problema ao configurar as notificações'
      )
    }
  }

  return {
    setNotificationState,
    removeCurrentSession,
    handlePushNotification,
    shouldReceiveNotification,
    userThumbnail: userData?.current_account?.thumbnail,
  }
}