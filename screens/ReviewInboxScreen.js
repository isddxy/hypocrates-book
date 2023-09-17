import { StatusBar } from 'expo-status-bar';
import { PanResponder, View, Animated , Dimensions, Text, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { questions as questionsArray } from "../db/questions";
import QuestionCard from '../component/QuestionCard';

const { width, height } = Dimensions.get("screen");

export default function ReviewInboxScreen({ navigation, navigation: { goBack } }) {
  // State to hold the users data
  const [questions,setQuestions] = useState(questionsArray);

  // Animated values for swipe and tilt
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  useEffect(()=>{
    // Reset users data if the array is empty
    if(!questions.length){
      console.log('Готово')
      setQuestions(questionsArray);
    }
  },[questions.length])
  

  // PanResponder configuration
  const panResponder = PanResponder.create({
     // Allow pan responder to activate
    onMoveShouldSetPanResponder: ()=>true,

     // Handle card movement while dragging
    onPanResponderMove: (_, {dx, dy, y0})=>{
      swipe.setValue({x: dx, y: dy});
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
    },

    // Handle card release after dragging
    onPanResponderRelease: (_, { dx, dy })=>{
      const direction = Math.sign(dx);

      if (direction > 0) {
          console.log('Да');
      } else {
          console.log('Нет');
      }
  
      const isActionActive = Math.abs(dx) > 100;

      if(isActionActive){
        // Swipe the card off the screen
        Animated.timing(swipe, {
          duration: 100,
          toValue: {
            x: direction * 500,
            y: dy
          },
          useNativeDriver: true
        }).start(removeTopCard);
        console.log('ВЫБОР СДЕЛАН');
      }else{
        // Return the card to its original position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0
          },
          useNativeDriver: true,
          friction: 5
        }).start();
      }
    }
  })

  // remove the top card from the users array
  const removeTopCard = useCallback(()=>{
    setQuestions((prevState)=>prevState.slice(1));
    swipe.setValue({ x: 0, y: 0});
  },[swipe]);

  // handle user choice (left or right swipe)
  const handleChoice = useCallback((direction)=>{
    Animated.timing(swipe.x, {
      toValue: direction  * 500,
      duration: 400,
      useNativeDriver: true
    }).start(removeTopCard);

    console.log('Выбор сделан 2');

  },[removeTopCard,swipe.x]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD", alignItems: "center"}}>
      <Text style={styles.taskName}>Сходить погулять с Денисом</Text>
      <StatusBar hidden={false} />
      {/* Map through users and render Card components */}
        {
        questions.map(({ id, name, emoji, bgColor, description }, index )=>{
          const isFirst = index == 0;
          const dragHandlers = isFirst ? panResponder.panHandlers : {};
          return (
            <QuestionCard
              key={name}
              name={name}
              description={description}
              emoji={emoji}
              bgColor={bgColor}
              isFirst={isFirst}
              swipe={swipe}
              titlSign={titlSign}
              {...dragHandlers}
            />
          )
        }).reverse()
        }
        {/* Render the Footer component */}
        {/* <Footer handleChoice={handleChoice} /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  taskName: {
    fontSize: 20,
    top: '10%',
    width: '80%',
    textAlign: 'center',
    position: 'absolute',
  },
});