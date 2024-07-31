import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "reanimated-masonry-list";
import { mealData } from "../constants";
import Animated, { BounceIn, FadeInDown } from "react-native-reanimated";
import Loading from "./Loading";
import CachedImage from "../utils/CachedImage";
import { useNavigation } from "@react-navigation/native";

export default function Recipes({ categories, recipes }) {
  return (
    <View className="mt-4">
      <Text style={{ fontSize: hp(3) }} className="font-bold tracking-wider">
        Recipes
      </Text>
      <View className="mt-2">
        {categories.length == 0 || recipes.length == 0 ? (
          <Loading size="large" className="mt-48" />
        ) : (
          <MasonryList
            data={recipes}
            keyExtractor={(item) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }) => <RecpieCard item={item} index={i} />}
            // refreshing={isLoadingNext}
            // onRefresh={() => refetch({ first: ITEM_CNT })}
            onEndReachedThreshold={0.1}
            // onEndReached={() => loadNext(ITEM_CNT)}
          />
        )}
      </View>
    </View>
  );
}

const RecpieCard = ({ item, index }) => {
  const navigation = useNavigation();
  let isEven = index % 2 == 0;
  return (
    <Animated.View
      entering={FadeInDown.delay(index * 300)
        .duration(2000)
        .springify()
        .damping(20)}
      className="mb-4"
    >
      <Pressable
        onPress={() => navigation.navigate("RecipeDetails", { ...item })}
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        className="flex justify-center mb-4 spacy-y-1"
      >
        {/* <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/20 object-cover object-center"
        /> */}

        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/20 object-cover object-center"
        />

        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold text-neutral-600 ml-2 "
        >
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + " ..."
            : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};
