import React from 'react';
import {Text, StyleSheet, View} from 'react-native';

interface DescriptionTextProps {
  keyt: string;
  value: string | number;
}

const DescriptionText: React.FC<DescriptionTextProps> = ({keyt, value}) => {
  return (
    <View style={styles.outer}>
      <Text style={styles.key}>{keyt}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  key: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: '4%',
    marginBottom: '0%',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'black',
    marginTop: '4%',
    marginBottom: '0%',
  },
});

export default DescriptionText;
