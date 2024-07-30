import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import { categoriesData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export default function Categories({ activeCategory, setActiveCategory }) {
  return (
    <Animated.View
      entering={FadeInDown.duration(1000).springify()}
      className="mt-4"
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoriesData.map((category, index) => {
          let isActiveCategory = category.name == activeCategory;
          let activeImageClass = isActiveCategory
            ? " border border-amber-500 border-4"
            : " border border-white border-4 ";
          let actveTextClass = isActiveCategory
            ? "text-black font-bold "
            : "text-gray-500 font-medium";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => setActiveCategory(category.name)}
              className="flex items-center space-y-1"
            >
              <View className={`rounded-full p-[2px] ${activeImageClass}`}>
                <Image
                  className="rounded-full object-fill object-center"
                  source={{ uri: category.image }}
                  onError={(error) =>
                    console.log("Image Load Error:", error.nativeEvent.error)
                  }
                  style={{ width: hp(7), height: hp(7) }}
                />
              </View>
              <Text
                style={{ fontSize: hp(1.6) }}
                className={`text-center ${actveTextClass}`}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
