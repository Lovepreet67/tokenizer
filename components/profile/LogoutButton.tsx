import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

interface Props {
  onPress: () => void;
}

const LogoutButton: React.FC<Props> = ({onPress}) => {
  return (
    <View style={styles.outer}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 10,
    width: width * 0.9, // 90% of the parent's width
    marginBottom: 20, // Places the button at the bottom with some space
    paddingVertical: 12,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
