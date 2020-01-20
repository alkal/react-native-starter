import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/colors';

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
  },
});

const MainButton = props => {
  const { title, clickBtn, icon } = props;

  return (
    <TouchableNativeFeedback activeOpacity={0.8} onPress={clickBtn}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>
          {/* {icon && <Ionicons name={`${icon}`} size={24} color="white" />} */}
          {title}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default MainButton;
