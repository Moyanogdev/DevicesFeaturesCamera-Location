import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Location from 'expo-location'
import {COLORS} from '../constants'
import MapPreview from './MapPreview'


const LocationSelector = (props) => {
    const navigation = useNavigation()
    const [pickedLocation, setpickedLocation] = useState()

    useEffect(() => {
        if(props.mapLocation) {
            setpickedLocation(props.mapLocation)
            props.onLocation(props.mapLocation)
        }
    }, [props.mapLocation])
    

    const verifyPermissions = async () => {
        const {status} = await Location.requestForegroundPermissionsAsync()

        if(status !== 'granted') {
            Alert.alert('Permisos insuficientes', 'Se necesitan permisos de ubicación', [{text: 'OK'}])
            return false
        }
        return true
    }

    const handleGetLocation = async () => {
       const isLocationOk = await verifyPermissions()
       
       if(!isLocationOk) return

       const location = await Location.getCurrentPositionAsync({
            timeout: 5000,
       })

       setpickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
       })

       props.onLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
       })
    }

    const handlePickOnMap = () => {
        const isLocationOk = verifyPermissions()

        if(!isLocationOk) return

        navigation.navigate('Map')
    }

  return (
    <View style={styles.container}>
        <MapPreview location={pickedLocation} style={styles.preview}>
            <Text>Ubicación en proceso...</Text>
        </MapPreview>
        <View style={styles.actions}>
            <Button title='Obtener ubicación' color={COLORS.PEACH_PUFF} onPress={handleGetLocation}/>
            <Button title='Elegir del mapa' color={COLORS.LIGTH_PINK} onPress={handlePickOnMap}/>
        </View>    
    </View>
  )
}

export default LocationSelector

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    preview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: COLORS.BLUSH,
        borderWidth: 1,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})