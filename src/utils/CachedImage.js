import AsyncStorage from "@react-native-async-storage/async-storage"; // For local storage
import { useEffect, useState } from "react";
import Animated from "react-native-reanimated";

export default function CachedImage(props) {
  const [cachedSource, setCachedSource] = useState(null);

  // Destructure uri from props, which is the URL of the image to display
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        // Try to get the cached image data from AsyncStorage using the image URL as the key
        const cachedImageData = await AsyncStorage.getItem(uri);

        if (cachedImageData) {
          // If cached image data exists, update the state to use this cached data
          setCachedSource({ uri: cachedImageData });
        } else {
          // If no cached data, fetch the image from the internet
          const response = await fetch(uri);

          // Convert the response into a blob (binary large object)
          const imageBlob = await response.blob();

          // Convert the blob into a Base64 encoded string
          const base64Data = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          });

          // Store the Base64 encoded image data in AsyncStorage
          await AsyncStorage.setItem(uri, base64Data);

          // Update the state with the new Base64 image data
          setCachedSource({ uri: base64Data });
        }
      } catch (error) {
        console.log("Error in getCachedImage:", error);
        setCachedSource({ uri });
      }
    };

    getCachedImage();
  }, [uri]); // Dependency array to rerun the effect if the uri changes

  return <Animated.Image source={cachedSource} {...props} />;
}
