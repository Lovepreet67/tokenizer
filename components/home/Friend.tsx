import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {HomeStackNavigation} from '../../navigators/StackNavigatorHome.tsx';
import {scaled, verticalSacled} from '../../constants/sizes.ts';
import {COLORS} from '../../constants/colors.ts';

interface friendProps {
  name: string;
}

/**
 *@description component which will display friend as an icon (having name initial at the center of the rounded container) and a
 * actual name at the bottom.
 * @param name fullname of the friend .
 */
const Friend: React.FC<friendProps> = ({name}) => {
  const navigation = useNavigation<HomeStackNavigation>();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Interactions', {friendUsername: name});
      }}>
      <View style={styles.container}>
        <View
          style={[
            styles.icon,
            {
              backgroundColor: COLORS.getRandomColor(),
            },
          ]}>
          <Text style={styles.iconText}>{name.charAt(0).toUpperCase()}</Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="middle" style={styles.nameText}>
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  icon: {
    width: scaled(50),
    height: verticalSacled(50),
    borderRadius: scaled(25),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalSacled(5),
  },
  iconText: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  nameText: {
    width: scaled(80), // Adjust the constant width as needed
    textAlign: 'center',
    fontSize: scaled(16),
  },
});
export default Friend;
