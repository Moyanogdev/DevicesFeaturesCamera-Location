import React, {useState} from 'react'
import { StyleSheet, Text, View, Button, Alert } from 'react-native'
import * as Location from 'expo-location'
import {COLORS} from '../constants'


const LocationSelector = (props) => {
    const [pickedLocation, setpickedLocation] = useState()

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

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {pickedLocation ? (<Text>{pickedLocation.lat}, {pickedLocation.lng}</Text>) : (<Text>Esperando ubicación</Text>)}
      </View>
      <Button title='Obtener ubicación' color={COLORS.PEACH_PUFF} onPress={handleGetLocation}/>
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
    }
})