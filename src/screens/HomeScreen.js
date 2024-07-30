import { View, Text, ScrollView } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-amber-600">
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          className="space-y-6"
        >
          <Text className="text-3xl font-bold text-center">Home</Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
