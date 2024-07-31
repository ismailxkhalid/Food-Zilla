import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import CachedImage from "../utils/CachedImage";

export default function Categories({
  activeCategory,
  handleChangeCategory,
  categories,
}) {
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
        {categories.map((category, index) => {
          let isActiveCategory = category.strCategory == activeCategory;
          let activeImageClass = isActiveCategory
            ? " border border-amber-500 border-4"
            : " border border-white border-4 ";
          let actveTextClass = isActiveCategory
            ? "text-black font-bold "
            : "text-gray-500 font-medium";

          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleChangeCategory(category.strCategory)}
              className="flex items-center -mx-2 "
            >
              <View className={`rounded-full p-[4px] ${activeImageClass}`}>
                {/* <Image
                  className="rounded-full object-fill object-center"
                  source={{ uri: category.strCategoryThumb }}
                  onError={(error) =>
                    console.log("Image Load Error:", error.nativeEvent.error)
                  }
                  style={{ width: hp(6), height: hp(6) }}
                /> */}
                <CachedImage
                  className="rounded-full object-fill object-center"
                  uri={category.strCategoryThumb}
                  onError={(error) =>
                    console.log("Image Load Error:", error.nativeEvent.error)
                  }
                  style={{ width: hp(6), height: hp(6) }}
                />
              </View>
              <Text
                style={{ fontSize: hp(1.6) }}
                className={`text-center ${actveTextClass}`}
              >
                {category.strCategory}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
