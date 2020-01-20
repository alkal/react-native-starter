import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';

import Colors from '../constants/colors';

const styles = StyleSheet.create({
  headerBase: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIOS: {
    backgroundColor: 'white',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  headerAndroid: {
    backgroundColor: Colors.primary,
    borderBottomColor: 'transparent',
    borderBottomWidth: 0,
  },
  headerTitle: {
    fontSize: 24,
    color: Platform.OS === 'ios' ? Colors.primary : 'white',
  },
});

const Header = props => (
  <View
    style={{
      ...styles.headerBase,
      ...Platform.select({
        ios: styles.headerIOS,
        android: styles.headerAndroid,
      }),
    }}
  >
    <Text style={styles.headerTitle}>{props.title}</Text>
  </View>
);

export default Header;
