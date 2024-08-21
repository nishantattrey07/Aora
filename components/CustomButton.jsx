import { TouchableOpacity, Text } from 'react-native'
import React from 'react'

const CustomButton = ({title,containerStyle,handlePress,textStyles,isLoading}) => {
  return (
      <TouchableOpacity className={`bg-secondary items-center justify-center
        rounded-xl min-h-[58px] ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
        onPress={handlePress}
        disabled={isLoading}>
          <Text className={`text-primary ${textStyles}`}> { title }</Text>
    </TouchableOpacity>
  )
}

export default CustomButton