import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

// import Swiper from "react-native-deck-swiper";
import defaultGif from './../assets/Roulette/default.gif';

import baby from './../assets/Roulette/win/lit-baby.gif';
import leonardo from './../assets/Roulette/win/leonardo-di-caprio-cheers.gif';
//import gorilla from './../assets/Roulette/win/monkey-gorilla.gif;
import ozon671games from './../assets/Roulette/win/ozon-ozon671games.gif';
import victory from './../assets/Roulette/win/victory-winning.gif';

import cringe from './../assets/Roulette/lose/cringe.gif';
import ozonAngry from './../assets/Roulette/lose/ozon-angry.gif';
import ozon from './../assets/Roulette/lose/ozon.gif';
import kramer from './../assets/Roulette/lose/kramer.gif';
import sadWalk from './../assets/Roulette/lose/sad-walk.gif';
import txtSad from './../assets/Roulette/lose/txt-sad.gif';


export default function SpinScreen({ navigation }) {

  const insets = useSafeAreaInsets();

  const loseGifs = [cringe, ozonAngry, ozon, kramer, sadWalk, txtSad];
  const winGifs = [ baby, leonardo, ozon671games, victory];

  const [spinResault, setSpinResault] = useState(null);
  const [title, setTitle] = useState('Крути барабан');
  const [bgGif, setBgGif] = useState(defaultGif);

  function getSpin() {
    const foo = Math.random() * 100;
    const PercentageСhance = 20;

    console.log('ROLL: ' + foo);
    return (foo <= PercentageСhance);
  }

  function showRouletteResult() {
    let winMessage = '🎉\nТебе повезло - делай то что захотел';
    let loseMessage = 'Не чувак, у тебя есть дела по важнее';

    let gifNumber1 = 0;
    let gifNumber = 0;


    console.log('---------------');
    if (getSpin()) {
      setTitle(winMessage);
      setSpinResault(true);
      gifNumber1 = Math.floor(Math.random() * 3)
      setBgGif(winGifs[gifNumber1]);
    }
    else {
      setTitle(loseMessage);
      setSpinResault(false);
      gifNumber = Math.floor(Math.random() * 5)
      setBgGif(loseGifs[gifNumber]);
    }

    console.log('isWin: ' + spinResault)
    console.log('GIF: ' + gifNumber)
  }

  return (
    <View style={styles.container}>
      
      <Image
            style ={{width: "100%", height:"100%"}}
            source={bgGif}
          />
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          alignItems: 'center',

          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <Text style={styles.title}>{ title }</Text>
        <View>
        <View style={styles.button}>
          <Button
          onPress={() => showRouletteResult()}
          title="Крутить колесо"
          color = "white"
          accessibilityLabel="Learn more about this purple button"
        /></View>
        {/* <Text style={styles.count}>Осталось 5 попыток</Text> */}
        <Button title="Назад" color='white' onPress={() => navigation.goBack()} />
        </View>
      </View>
      
      {/* <Swiper
          cards={['Приближает тебя к твоим глобальным целям?', 'Это требует действия?', 'Это можно сделать за 2 мин?', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
          renderCard={(card) => {
              return (
                  <View style={styles.card}>
                      <Text style={styles.text}>{card}</Text>
                  </View>
              )
          }}
          onSwiped={(cardIndex) => {console.log(cardIndex)}}
          onSwipedAll={() => {console.log('onSwipedAll')}}
          cardIndex={0}
          backgroundColor={'#4FD0E9'}
          stackSize= {2}>
      </Swiper> */}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 30,
    elevation: 3,
    backgroundColor: 'black',
    color: 'white',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleview: {
    position: 'absolute',
    alignItems: 'center',
    //justifyContent: 'flex-end',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 64,
    textAlign: 'left',
    paddingBottom: 300,
    width: '86%',
  },
  count: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 100,
  },
  card: {
    flex: 1,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent'
  },
  done: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    backgroundColor: 'transparent'
  }
})