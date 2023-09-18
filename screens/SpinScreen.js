import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar } from 'react-native';
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
import Button from '../component/Button';
import { faArrowLeftLong, faBars, faGift, faPlay, faSpinner, faXmark } from '@fortawesome/free-solid-svg-icons';


export default function SpinScreen({ route, navigation, navigation: {goBack} }) {

  const task = route.params;

  const [isSpinned, setSpinned] = useState('none');
  const [isNotSpinned, setNotSpinned] = useState('flex');

  const insets = useSafeAreaInsets();

  const loseGifs = [cringe, ozonAngry, ozon, kramer, sadWalk, txtSad];
  const winGifs = [ baby, leonardo, ozon671games, victory];

  const [spinResault, setSpinResault] = useState(null);
  const [title, setTitle] = useState('КРУТИ РУЛЕТКУ');
  const [bgGif, setBgGif] = useState(defaultGif);

  function getSpin() {
    const foo = Math.random() * 100;
    const PercentageСhance = 20;

    console.log('ROLL: ' + foo);
    return (foo <= PercentageСhance);
  }

  function showRouletteResult() {
    setSpinned(true);
    let winMessage = '🎉\nТебе повезло\nМожешь бахать!!';
    let loseMessage = '😭😭😭\nТебе не повезло';

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
    setSpinned('flex');
    setNotSpinned('none');
  }
  
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
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
          paddingLeft: insets.left + 30,
          paddingRight: insets.right + 30,
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
      >
        <View style={styles.content}>
          <Text style={styles.taskName}>{ task.name }</Text>
          <Text style={styles.title}>{ title }</Text>
        </View>


        <View style={styles.footer}>

            <View style={{display: isSpinned}}>
              <View style={{opacity: 1, marginBottom: 12}}>
                <Button name='Обратно к задачам' bgColor='#F5F5F5' color='black' icon={ faBars } onPress={() => navigation.navigate("Tasks")}/>
              </View>
            </View>

            <View style={{display: isNotSpinned}}>
              <Button name='Начать' bgColor='black' color='white' icon={ faPlay } onPress={() => showRouletteResult()}/>
              <View style={{opacity: 1, marginTop: 8}}>
                <Button name='Назад' bgColor='#' color='#fff' icon={ faArrowLeftLong } onPress={() => navigation.navigate("ReviewInbox", task)}/>
              </View>
            </View>

        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    width: '100%',
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 200,
  },
  taskName: {
    color: 'white',
    opacity: 0.5,
    fontSize: 24
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
    fontSize: 60,
    textAlign: 'center',
    paddingBottom: 300,
    marginTop: 30,
    width: '100%',
    lineHeight: 68,
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
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    width: '80%',
    alignItems: 'center',
  },
})