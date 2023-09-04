import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useIsFocused } from "@react-navigation/native";

const SplashScreen = () => {
  const isFocused = useIsFocused();
  const { handleUserSession } = useContext(UserContext);

  useEffect(() => {
    if (isFocused) {
      handleUserSession();
    }
  }, [isFocused])

  return null;
}

export default SplashScreen;