import { StatusBar } from "expo-status-bar"; 
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import React from 'react'
import { ScrollView, View, Image,Text } from "react-native";
import {images} from '../constants'

const Welcome = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full h-full  items-center px-4">
          <Image
            source={images.logo}
            className="w-36 h-40"
            resizeMode="contain"
          />

          <Image
            source={images.cards}
            className="w-full h-64"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-3xl text-white text-center font-bold">
              {" "}
              Discover Endless Possibility With{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[130px] h-[14px] bottom-3 -right-52"
              resizeMode="contain"
            />

            <Text className="text-gray-400 text-center text-sm font-pregular">
              Where Creativity Meets Innovation: Embark on a Journey of
              Limitless Exploration with Aora{" "}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Welcome