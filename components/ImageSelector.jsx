import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

import {COLORS} from '../constants'


const ImageSelector = props => {
    const [pickerUri, setPickerUri] = useState()

    const verifyPermissions = async () => {
      const {status} = await ImagePicker.requestCameraPermissionsAsync()

      if(status !== 'granted') {
        Alert.alert(
          'Permisos insuficientes',
          'Se necesitan permisos de la Cámara para utilizar esta aplicación',
          [{text: 'OK'}]
        )
        return false
      }
      return true
    }

    const handleTakeImage = async () => {
      const isCameraOk = await verifyPermissions()

      if(!isCameraOk) return

      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      })

      setPickerUri(image.assets[0].uri)
      props.onImage(image.assets[0].uri)
    }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickerUri ? (<Text>No hay imagen seleccionada</Text>) : (<Image style={styles.image} source={{uri: pickerUri}}/>)}
      </View>
      <Button title='Tomar foto' color={COLORS.LIGTH_PINK} onPress={handleTakeImage}/>
    </View>
  )
}

export default ImageSelector

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
    image: {
        width: '100%',
        height: '100%',
    }
})