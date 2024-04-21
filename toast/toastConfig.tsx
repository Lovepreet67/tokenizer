import {Text, View} from 'react-native';
import React from 'react';

/*
  1. Create the config
*/
const toastConfig = {
  tomatoToast: (text1: string) => (
    <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
      <Text>{text1}</Text>
    </View>
  ),
};

export default toastConfig;
