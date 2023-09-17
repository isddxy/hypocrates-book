import { View, Text, StyleSheet } from 'react-native'
import React from 'react';
import Button from '../component/Button';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import QuestionCard from '../component/QuestionCard'
import questions from '../db/questions'


export default function ReviewInboxScreen( {navigation: {goBack}}) {
  return (
    <View style={styles.contaier}>
      <Text style={styles.taskName}>Сходить погулять с Денисом</Text>

      <QuestionCard question={questions[1]}/>
      
      <View style={styles.footer}>
        <Button name='Назад' bgColor='#fff' color='#7E7E7E' icon={ faArrowLeftLong } onPress={() => goBack()}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contaier:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  taskName: {
    fontSize: 20,
    marginBottom: 24,
    marginTop: -100,
    width: '80%',
    textAlign: 'center',
  },
  footer: {
      position: 'absolute',
      bottom: 30,
      width: '90%',
      left: 20,
      alignItems: 'center',
  },
});