import { View } from 'react-native'
import React from 'react'
import Button from './Button'
import { faTeamspeak } from '@fortawesome/free-brands-svg-icons'

const COLORS = {
  like: '#00eda6',
  nope: '#ff006f',
  star: '#07A6FF'
}

const Footer = ({ handleChoice }) => {
  return (
    <View style={{
      position: 'absolute', bottom: 15, width: 100,
      flexDirection: 'row', alignItems: 'center',
      justifyContent: 'center', zIndex: -99999}}>
      <Button
        name="times"
        icon={ faTeamspeak }
        color='#ff006f'
        onPress={() => handleChoice(-1)}/>  
      <Button
        name="star"
        icon={ faTeamspeak }
        color={COLORS.star}/>
      <Button
        name="heart"
        icon={ faTeamspeak }
        color='#00eda6'
        onPress={() => handleChoice(1)}/>
    </View>
  )
}

export default Footer