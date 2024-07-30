import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import Animated, {
  BounceIn,
  BounceInRight,
  Easing,
} from "react-native-reanimated";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Starter");
  return (
    <SafeAreaView className="flex-1 bg-white ">
      <View className="flex-1 bg-white mx-4">
        <StatusBar style={Platform.OS === "android" ? "light" : "dark"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="space-y-6"
        >
          {/* Avatar and Bell Icon */}
          <View
            style={{ marginTop: hp(1) }}
            className="flex-row justify-between items-center"
          >
            <Image
              source={{
                uri: "https://avatars.githubusercontent.com/u/109650150?v=4",
              }}
              className=" rounded-full"
              style={{ width: hp(5), height: hp(5) }}
            />

            <BellIcon color="gray" size={hp(4)} />
          </View>

          {/* Greetings and punch line  */}
          <View className=" space-y-2 mb-2">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold text-gray-700 tracking-wider"
            >
              Hello, Ismail!{" "}
              <Animated.View entering={BounceIn.duration(1000)}>
                <Text>👋</Text>
              </Animated.View>
            </Text>
            <Text
              style={{ fontSize: hp(3) }}
              className=" text-gray-700  font-semibold tracking-wider"
            >
              Cook, Create, and Enjoy{" "}
              <Text className="font-bold text-amber-600">Delicious</Text>{" "}
              Moments
            </Text>
          </View>

          {/* Search Bar  */}
          <View className="bg-gray-200 rounded-full  flex-row items-center px-2 py-1 border border-slate-300">
            <TextInput
              placeholder="Search any recipe"
              placeholderTextColor={"gray"}
              style={{ fontSize: hp(1.7) }}
              className="pl-3 py-1 tracking-wider flex-1"
            />
            <View className="bg-white/80 rounded-full p-3">
              <MagnifyingGlassIcon
                color="orange"
                size={hp(3)}
                strokeWidth={3}
              />
            </View>
          </View>

          {/* Categories */}
          <Categories
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
