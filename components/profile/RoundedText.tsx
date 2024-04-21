import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { COLORS } from "../../constants/colors.ts";

interface Props {
  characters: string;
}

const RoundedText: React.FC<Props> = ({characters}) => {
  return (
    <View style={styles.outer}>
      <View style={styles.container}>
        <Text style={styles.text}>{characters}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.getRandomColor(),
    borderRadius: 50, // Adjust according to your preference
    width: 100, // Adjust width as needed
    height: 100, // Adjust height as needed
  },
  text: {
    color: 'white',
    fontSize: 60,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default RoundedText;
