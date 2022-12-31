import { useState, useEffect } from "react";
import * as Font from "expo-font";

export const useResources = () => {
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          "nunito-sans-bold": require("../assets/fonts/NunitoSans-Bold.ttf"),
          "nunito-sans-regular": require("../assets/fonts/NunitoSans-Regular.ttf"),
          "nunito-sans-light": require("../assets/fonts/NunitoSans-Regular.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setIsLoadingComplete(true);
      }
    };

    loadFonts();
  }, []);

  return isLoadingComplete;
};
