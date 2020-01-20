import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 8,
    padding: 20,
    borderRadius: 10,
  },
});

const Card = props => {
  const { style, children } = props;
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export default Card;
