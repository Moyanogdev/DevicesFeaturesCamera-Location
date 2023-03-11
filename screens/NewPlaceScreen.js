import React, {useState, useEffect} from 'react'
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native'
import { COLORS } from '../constants'
import { addPlace } from '../store/places.actions'
import { useDispatch } from 'react-redux'
import ImageSelector from '../components/ImageSelector'
import LocationSelector from '../components/LocationSelector'

const NewPlaceScreen = ({navigation, route }) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState()
    const [location, setLocation] = useState()

    useEffect(() => {
        console.log(route, 'Nueva ubicación')
    }, [route])
    

    const handleTitleChange = text => setTitle(text)
    const handleSave = () => {
        dispatch(addPlace(title, image, location))
        navigation.navigate("Direcciones")
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.label}>Título</Text>
                <TextInput style={styles.input} onChangeText={handleTitleChange}/>
                <ImageSelector onImage={setImage} />
                <LocationSelector onLocation={setLocation} mapLocation={route?.params?.mapLocation}/>
                <Button 
                    title='Guardar Dirección'
                    color={COLORS.MAROON}
                    onPress={handleSave}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30,
    },
    label: {
        fontSize: 18,
        marginBottom: 16,
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 2,
        paddingVertical: 4,
    }
})

export default NewPlaceScreen
