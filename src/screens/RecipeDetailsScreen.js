import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import CachedImage from "../utils/CachedImage";
import { ChevronLeftIcon, ClockIcon } from "react-native-heroicons/outline";
import {
  FireIcon,
  HeartIcon,
  MapPinIcon,
  Square3Stack3DIcon,
  UserGroupIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Loading from "../components/Loading";
import YoutubeIframe from "react-native-youtube-iframe";
// import YoutubeIframe from "react-native-youtube-iframe";

export default function RecipeDetailsScreen(props) {
  const navigation = useNavigation();
  const item = props.route.params;
  const [isFavorite, setIsFavorite] = useState(false);
  const [mealData, setMealData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal);
  }, []);

  // Function to filter out null or empty values
  const filterMealData = (meal) => {
    const filteredMeal = {};
    for (const [key, value] of Object.entries(meal)) {
      if (value !== null && value !== "") {
        filteredMeal[key] = value;
      }
    }
    return filteredMeal;
  };

  // Fuction to call API for Recipe Data by id
  const getMealData = async (id) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      // console.log("Response:", response.data.meals);
      if (response && response.data) {
        setMealData(response.data.meals[0]);

        setIsLoading(false);
        // console.log("MealData:", mealData);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Function to get indexes of non-empty or non-null strIngredient values
  function getNonEmptyIngredientIndexes(mealData) {
    // Assuming mealData is the variable holding the API response
    const ingredients = mealData;
    const indexes = [];

    // Loop through the strIngredient fields
    for (let i = 1; i <= 20; i++) {
      const ingredientKey = `strIngredient${i}`;
      const ingredientValue = ingredients[ingredientKey];

      // Check if the value is neither empty nor null
      if (ingredientValue && ingredientValue.trim() !== "") {
        indexes.push(i);
      }
    }

    return indexes;
  }

  //Get Youtube video id fnc
  function getYoutubeVideoId(url) {
    const regex = /[?&]v=([^&#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  return (
    <ScrollView
      className="bg-white flex-1"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 10 }}
    >
      <StatusBar style="light" />

      {/* Recipe Image */}
      <View className="flex-row justify-center">
        <CachedImage
          uri={item.strMealThumb}
          style={{
            width: wp(98),
            height: hp(50),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
          className=" object-cover object-center"
        />

        {/* Back and Favorite Button */}
        <View className="w-full absolute flex-row justify-between px-4 pt-14">
          {/* Back Button */}
          <TouchableOpacity
            className="bg-white p-2 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <ChevronLeftIcon color="#fbbf24" size={hp(3.5)} strokeWidth={4.5} />
          </TouchableOpacity>

          {/* Fav Button */}
          <TouchableOpacity
            onPress={() => setIsFavorite(!isFavorite)}
            className="bg-white p-2 rounded-full"
          >
            <HeartIcon
              color={isFavorite ? "red" : "gray"}
              size={hp(3.5)}
              strokeWidth={4.5}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Recipe Details */}
      {isLoading ? (
        <Loading size="large" className="mt-48" />
      ) : (
        <View className=" px-4 flex justify-between space-y-3 pt-8">
          {/* Name and Area */}
          <View className="space-y-2">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-gray-700 tracking-wide "
            >
              {mealData.strMeal}
            </Text>

            <Text
              style={{ fontSize: hp(2) }}
              className="text-gray-500 font-semibold"
            >
              <MapPinIcon color="red" size={hp(2)} strokeWidth={2} />
              {"  "}
              {mealData.strArea}
            </Text>
          </View>

          {/* Mics */}
          <View className="flex-row justify-around items-center">
            {/* Time */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="rounded-full bg-white flex items-center justify-center"
              >
                <ClockIcon color="gray" size={hp(4)} strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="text-gray-600 font-bold tracking-wider"
                >
                  25
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="text-gray-600 font-semibold "
                >
                  Mins
                </Text>
              </View>
            </View>
            {/* Servings */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="rounded-full bg-white flex items-center justify-center"
              >
                <UserGroupIcon color="gray" size={hp(4)} strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="text-gray-600 font-bold tracking-wider"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="text-gray-600 font-semibold "
                >
                  Serving
                </Text>
              </View>
            </View>
            {/* Calories */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="rounded-full bg-white flex items-center justify-center"
              >
                <FireIcon color="gray" size={hp(4)} strokeWidth={2.5} />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="text-gray-600 font-bold tracking-wider"
                >
                  250
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="text-gray-600 font-semibold "
                >
                  KCals
                </Text>
              </View>
            </View>
            {/* Intensity */}
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ width: hp(6.5), height: hp(6.5) }}
                className="rounded-full bg-white flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  color="gray"
                  size={hp(4)}
                  strokeWidth={2.5}
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="text-gray-600 font-bold tracking-wider"
                >
                  Ints
                </Text>
                <Text
                  style={{ fontSize: hp(1.5) }}
                  className="text-gray-600 font-semibold "
                >
                  Easy
                </Text>
              </View>
            </View>
          </View>

          {/* Ingredients */}
          <View className="space-y-3 pt-2 mx-2">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-gray-700 "
            >
              Ingredients
            </Text>
            <View className="space-y-3 ">
              {getNonEmptyIngredientIndexes(mealData).map((index) => (
                <View className="flex-row space-x-3 items-center" key={index}>
                  <View
                    style={{ height: hp(1.3), width: hp(1.3) }}
                    className="rounded-full bg-amber-300"
                  />
                  <View className="flex-row space-x-2">
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="text-gray-700 font-extrabold "
                    >
                      {mealData["strIngredient" + index]}
                    </Text>
                    <Text
                      style={{ fontSize: hp(1.7) }}
                      className="text-gray-600 font-medium "
                    >
                      ({mealData["strMeasure" + index]})
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Directions */}
          <View className="space-y-1 pt-3 mx-1">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold text-gray-700 "
            >
              Directions
            </Text>
            <Text style={{ fontSize: hp(1.6) }} className="text-gray-700">
              {mealData?.strInstructions}
            </Text>
          </View>

          {/* Recipe Video */}
          {mealData.strYoutube && (
            <View className="space-y-4 pt-3">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold text-gray-700 "
              >
                Recipe Video
              </Text>
              <View className="">
                <YoutubeIframe
                  videoId={getYoutubeVideoId(mealData.strYoutube)}
                  height={hp(50)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
}
