import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default function App() {
  const [userNumber, setUserNumber] = useState('');
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const configureNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = numOfRounds => {
    setGuessRounds(numOfRounds);
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={err => console.log(err)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View>
          <Header title="Guess a Number" />
          {userNumber ? (
            guessRounds <= 0 ? (
              <GameScreen
                userChoice={userNumber}
                onGameOver={gameOverHandler}
              />
            ) : (
              <GameOverScreen
                userNumber={1}
                roundsNumber={1}
                startNewGame={configureNewGameHandler}
              />
            )
          ) : (
            <StartGameScreen onStartGame={startGameHandler} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
