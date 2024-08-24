import { StyleSheet, Text, View, ScrollView,Image,TouchableOpacity } from "react-native";
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Redirect, router } from "expo-router";
const Sign_In = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  return (
    <SafeAreaView className="bg-primary  h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center items-left px-4 mt-20">
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="mt-9 mb-4 text-white text-2xl font-psemibold ">
            {" "}
            Sign in
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            placeholder="mypersonalemail@aora.com"
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            placeholder="mypass 🤫"
            otherStyles="mt-5"
            keyboardType="password"
          />
          <TouchableOpacity onPress={() => console.log("forgot password")}>
            <Text className="text-right text-gray-400 mt-3 align-bottom">
              Forgot Password
            </Text>
          </TouchableOpacity>
          <CustomButton
            title="Log In"
            textStyles="font-pmedium text-lg"
            containerStyle="mt-10"
          />

          <View className="flex-row justify-center items-center w-full mt-8">
            <Text className="text-white">Don't have an account? </Text>
            <TouchableOpacity
              onPress={() => {
                router.push("/sign_up")
              }}
            >
              <Text className="text-secondary font-psemibold">Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Sign_In

