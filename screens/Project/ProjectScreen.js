import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { streamProjects } from '../../db/firestore';
import TaskItem from '../../component/TaskItem';
import Button from '../../component/Button';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';



export default function ProjectScreen({ navigation, navigation: { goBack } }) {

    const insets = useSafeAreaInsets();

    const [projects, setProjects] = useState([]);

    const mapDocToProject = (document) => {
        return {
            id: document.id,
            name: document.data().name,
            isActive: document.data().isActive,
        }
    }

    useEffect(() => {
        const unsubscribe = streamProjects({
            next: querySnapShot => {
            const projects = querySnapShot
                .docs.map(docSnapshot => mapDocToProject(docSnapshot))
                setProjects(projects)
            },
            error: (error) => console.log(error)
        })
        console.log(projects);

        return unsubscribe;
    }, [setProjects]);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Мои проекты</Text>
            {
                projects?.map(project =><TaskItem item={project} key={project.id}/>)
            }
            <View style={styles.footer}>
                <Button name='Назад' bgColor='#fff' color='#323232' icon={ faArrowLeftLong } onPress={() => goBack()}/>
            </View>
        </SafeAreaView>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 20
    },
    title: {
        color: 'black',
        fontSize: 48,
        textAlign: 'left',
        width: '100%',
        lineHeight: 50,
        fontWeight: 'bold',
        marginVertical: 60
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        width: '100%',
        alignItems: 'center',
    },
});
