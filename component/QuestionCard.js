import { View , Text, StyleSheet, Dimensions, Animated } from "react-native";
const { width , height } = Dimensions.get("screen");
import { Fragment, useCallback } from "react";
import Choice from "./Choice";

const QuestionCard = ({ name, description, emoji, bgColor, isFirst, swipe, titlSign, ...rest })=>{

    // Calculate the rotation of the card based on swipe gesture
    const rotate = Animated.multiply(swipe.x,titlSign).interpolate({
        inputRange: [-100,0,100],
        outputRange: ['8deg', '0deg', '-8deg']
    });

     // Animated style for the card with rotation and translation
    const animatedCardStyle = {
        transform: [...swipe.getTranslateTransform(), { rotate }]
    }

    // Opacity animation for the "like" button
    const likeOpacity = swipe.x.interpolate({
        inputRange: [25, 100],
        outputRange: [0,1],
        extrapolate: 'clamp'
    });

    // Opacity animation for the "nope" button
    const nopeOpacity = swipe.x.interpolate({
        inputRange: [-100, -25],
        outputRange: [1,0],
        extrapolate: 'clamp'
    });

    // Function to render the "like" and "nope" buttons conditionally
    const renderChoice = useCallback(()=>{
        return (
        <Fragment>

            <Animated.View
                style={[
                    styles.choiceContainer, 
                    styles.likeContainer,
                { opacity: likeOpacity }
                ]}>
                    <Choice type="Да" />
            </Animated.View>

            <Animated.View 
                style={[
                    styles.choiceContainer, 
                    styles.nopeContainer,
                { opacity: nopeOpacity }
                    ]}>
                    <Choice type="Нет" />
            </Animated.View>

        </Fragment>
        )
    },[likeOpacity, nopeOpacity])

    return (
        <Animated.View style={[
            {
                position: "absolute",
                top: 135,
                backgroundColor: bgColor,
                width: '86%',
                height: '70%',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'flex-start',
                padding: 30,
                paddingTop: 160,
                // shadowColor: '#000000',
                // shadowOffset: {
                //     width: 0,
                //     height: 30,
                // },
                // shadowOpacity: 0.5,
                // shadowRadius: 30,
                // elevation: 11,
            
            },
            isFirst && animatedCardStyle
            ]} {...rest}>
                <Text style={styles.icon}>{emoji}</Text>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
            {isFirst && renderChoice()}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    name: {
        color: 'black',
        fontSize: 40,
        textAlign: 'center',
        lineHeight: 42,
    },
    description: {
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
        lineHeight: 24,
        marginTop: 20,
        opacity: 0.5
    },
    icon: {
        fontSize: 100,
        marginBottom: 20
    },
    choiceContainer: {
        position: 'absolute',
        top: 60
    },
    likeContainer:{
        left: 45,
        transform: [{ rotate: '-15deg' }]
    },
    nopeContainer:{
        right: 45,
        transform: [{ rotate: '15deg' }]
    },
})

export default QuestionCard