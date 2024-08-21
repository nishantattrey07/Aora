import { StyleSheet, Text, View, ScrollView,Image } from "react-native";
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
const Sign_In = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })
  return (
    <SafeAreaView className="bg-primary  h-full"> 
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center items-left px-4">
          
          <Image
            source={images.logo}
            className="w-[115px] h-[35px]"
            resizeMode="contain"
          />

          <Text className="mt-7 text-white text-2xl font-psemibold "> Sign in</Text>
          <FormField
            title='Email'
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default Sign_In

