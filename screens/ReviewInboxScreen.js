import { StatusBar } from 'expo-status-bar';
import { PanResponder, View, Animated , Dimensions, Text, StyleSheet } from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { questions as questionsArray } from "../db/questions";
import QuestionCard from '../component/QuestionCard';
import Button from '../component/Button';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import db from '../db/firestore';
import { doc, deleteDoc, updateDoc } from "firebase/firestore";



const { width, height } = Dimensions.get("screen");

export default function ReviewInboxScreen({ route, navigation, navigation: { goBack } }) {

  const task  = route.params;

  // State to hold the users data
  const [questions, setQuestions] = useState(questionsArray);

  const [currentId, setCurrentId] = useState(0);

  // if (questions[0].id != 0) {
  //   console.log('Назад зашел');
  // } else {
  //   console.log('Первый раз зашел');
  // }

  // Animated values for swipe and tilt
  const swipe = useRef(new Animated.ValueXY()).current;
  const titlSign = useRef(new Animated.Value(1)).current;

  useEffect(()=>{
    // Reset users data if the array is empty
    if(!questions.length){
      console.log('Конец')
      //setQuestions(questionsArray);
      updateToTask();
    }
  },[questions.length])

  // PanResponder configuration
  const panResponder = PanResponder.create({
     // Allow pan responder to activate
    onMoveShouldSetPanResponder: ()=>true,

     // Handle card movement while dragging
    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1)
    },

    // Handle card release after dragging
    onPanResponderRelease: (_, { dx, dy }) => {
      const direction = Math.sign(dx);

      const navigate = questions[0].navigate;

      console.log('Вопрос: ' + questions[0].name);

      if (direction > 0) {
        console.log('ВЫБОР: Да');
        if(navigate) {
          setQuestions(questionsArray);
          setQuestions((prevState)=>prevState.slice(1));
          navigation.navigate(navigate, task);
        }
      } else {
          console.log('ВЫБОР: Нет');
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


  const updateToTask = async () => {
    await updateDoc(doc(db, 'tasks', task.id), {
        isTask: true,
    }).then(result => navigation.navigate("Tasks"));
  };



  const backCard = useCallback((id)=>{
    console.log('ID: ' + id);

    if(id == 0) {
      goBack();
    } else {
      setCurrentId(questions[0].id)
      setQuestions(questionsArray);
      setQuestions((prevState)=>prevState.slice(id-1));

      swipe.setValue({ x: 0, y: 0});
    }

    

  },[currentId,swipe.x]);


  return (
    <View style={{ flex: 1, backgroundColor: "#FDFDFD", alignItems: "center"}}>
      <Text style={styles.taskName}>{ task.name }</Text>
      <StatusBar hidden={false} />
      {/* Map through users and render Card components */}
        {
          questions.map(({ id, name, emoji, bgColor, navigate, description }, index )=>{
            const isFirst = index == 0;
            const dragHandlers = isFirst ? panResponder.panHandlers : {};

            return (
              <QuestionCard
                key={name}
                id={id}
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
        {/* <Footer handleChoice={handleChoice} /> */}
        <View style={styles.footer}>
          <Button name='Назад' bgColor='#F5F5F5' color='#515965' icon={ faArrowLeftLong } onPress={() => backCard(questions[0].id)}/>
        </View>
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
  footer: {
    position: 'absolute',
    bottom: 50,
    width: '86%',
    alignItems: 'center',
  },
});