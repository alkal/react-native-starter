import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 3,
    borderColor: 'black',
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

const GameOverScreen = ({ roundsNumber, userNumber, startNewGame }) => (
  <ScrollView>
    <View style={styles.screen}>
      <Text>The Game is Over!</Text>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={300}
          source={require('../assets/success.png')}
          // source={{
          //   uri:
          //     'https://www.wallpaperup.com/uploads/wallpapers/2013/03/21/56140/108b7479f8f1f392409a99f36d7eb720-700.jpg',
          // }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text>Number of rounds: {roundsNumber}</Text>
      <Text>Number was:{userNumber}</Text>
      <Button title="New Game" onPress={startNewGame} />
    </View>
  </ScrollView>
);

export default GameOverScreen;
