import React from 'react';
import {
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {scaled, SIZES} from '../../constants/sizes.ts';
import {COLORS} from '../../constants/colors.ts';
import {Image} from 'react-native';

type headerProps = {
  title: string;
  backButton: boolean;
};
/**
 * @description Custom header which contain title and optionaly back button for stach navigators depending on prop passed.
 * @param title
 * @param backButton
 */
const Header: React.FC<headerProps> = ({title, backButton}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.outer}>
      {backButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../../resources/png/back_arrow.png')} // You need to provide the image source
            style={{width: 20, height: 20, resizeMode: 'contain'}} // Adjust dimensions as needed
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    height: PixelRatio.getPixelSizeForLayoutSize(17),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginHorizontal: scaled(10),
    backgroundColor: '#fff',
    // backgroundColor:'blue'
  },
  title: {
    fontSize: SIZES.heading,
    fontWeight: '600',
    color: 'black',
  },
  backButton: {
    position: 'absolute',
    height: '100%',
    left: 0,
    // top: 0,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'red',
  },
  backButtonIcon: {
    fontSize: SIZES.heading,
    fontWeight: 'bold',
    fontFamily: 'roboto',
  },
});
export default Header;
