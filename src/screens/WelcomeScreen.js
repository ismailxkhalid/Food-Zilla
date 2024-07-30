import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const ring1padding = useSharedValue(0);
  const ring2padding = useSharedValue(0);

  const navigation = useNavigation();
  // Animation for logo
  useEffect(() => {
    ring1padding.value = 0;
    ring2padding.value = 0;
    setTimeout(
      () => (ring1padding.value = withSpring(ring1padding.value + wp(10))),
      200
    );
    setTimeout(
      () => (ring2padding.value = withSpring(ring2padding.value + wp(8))),
      300
    );

    // Navigation to Home Screen after 4 seconds
    setTimeout(() => navigation.navigate("Home"), 2000);
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-amber-600">
      <View className="flex-1 items-center justify-center bg-amber-600 space-y-10">
        <StatusBar style="auto" />
        {/* Logo image with ring Animations */}
        <Animated.View
          className="bg-white/20 rounded-full"
          style={{ padding: ring1padding }}
        >
          <Animated.View
            className="bg-white/20 rounded-full "
            style={{ padding: ring2padding }}
          >
            <Image
              source={require("../../assets/foodLogo.png")}
              className=" rounded-full object-cover"
              style={{ width: wp(60), height: hp(28) }}
            />
          </Animated.View>
        </Animated.View>

        {/* Welcome Text */}
        <View className="space-y-2 flex items-center">
          <Text
            style={{ fontSize: hp(5) }}
            className="text-white font-bold tracking-widest "
          >
            Food Zilla
          </Text>
          <Text
            style={{ fontSize: wp(4) }}
            className="text-white font-medium tracking-widest"
          >
            Where Every Recipe Tells a Story
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}