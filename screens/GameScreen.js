import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
  Dimensions,
} from 'react-native';
import NumberContainer from '../components/Number';
import Card from '../components/Card';

import MainButton from '../components/MainButton';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 40 : 10,
    width: 300,
    maxWidth: '80%',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '80%',
  },
  listContainer: {
    width: Dimensions.get('window').width > 350 ? '60%' : '80%',
    flex: 1,
  },
  list: {
    flexGrow: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  }
  return rndNum;
};

// const renderListItem = (value, numOfRound) => (
//   <View key={value} style={styles.listItem}>
//     <Text># {numOfRound}</Text>
//     <Text>{value}</Text>
//   </View>
// );

const renderListItem = (listLength, itemData) => (
  <View style={styles.listItem}>
    <Text># {listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
);

const GameScreen = ({ userChoice, onGameOver }) => {
  const initialGuess = generateRandomBetween(1, 100, userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [rounds, setRounds] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get('window').height
  );
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    };
  });

  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver, rounds]);

  const nextGuessHandler = direction => {
    if (
      (direction === 'lower' && currentGuess < userChoice) ||
      (direction === 'greater' && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [
        { text: 'Sorry!', style: 'cancel' },
      ]);
      return;
    }
    if (direction === 'lower') {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    setRounds(curRounds => curRounds + 1);
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]);
  };

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess</Text>
        <View style={styles.controls}>
          <MainButton
            title="LOWER"
            icon="md-remove"
            clickBtn={() => {
              nextGuessHandler('lower');
            }}
          />
          <NumberContainer>{currentGuess}</NumberContainer>
          <MainButton
            title="GREATER"
            icon="md-add"
            clickBtn={() => {
              nextGuessHandler('greater');
            }}
          />
        </View>
        <View style={styles.listContainer}>
          <FlatList
            keyExtractor={item => item}
            data={pastGuesses}
            renderItem={item => renderListItem(pastGuesses.length, item)}
            contentContainerStyle={styles.list}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton
          title="LOWER"
          icon="md-remove"
          clickBtn={() => {
            nextGuessHandler('lower');
          }}
        />
        <MainButton
          title="GREATER"
          icon="md-add"
          clickBtn={() => {
            nextGuessHandler('greater');
          }}
        />
      </Card>
      <View style={styles.listContainer}>
        {/* <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses &&
            pastGuesses.length > 0 &&
            pastGuesses.map((guess, index) => renderListItem(guess, index + 1))}
        </ScrollView> */}
        <FlatList
          keyExtractor={item => item}
          data={pastGuesses}
          renderItem={item => renderListItem(pastGuesses.length, item)}
          contentContainerStyle={styles.list}
        />
      </View>
    </View>
  );
};

export default GameScreen;
