import React from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import MapPreview from '../components/MapPreview'
import {COLORS} from '../constants'

const PlaceDetailScreen = ({route}) => {
    const {placeId} = route.params

    const place = useSelector(state => state.places.places.find(item => item.id === placeId))

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image source={{uri: place.image}} style={styles.image}/>
            <View style={styles.location}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{place.address}</Text>
                </View>
                <MapPreview style={styles.map} location={{lat: place.lat, lng: place.lng}}>
                    <Text>Ubicación no disponible</Text>
                </MapPreview>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%'
    },
    location: {
        margin: 20,
        width: '90%',
        maxWidth: 350,
        backgroundColor: 'white',
        shadowColor: 'black',
  
    },
    addressContainer: {
        alignItems: 'center',
        paddingVertical: 4,
    },
    address: {
        color: 'black',
        paddingBottom: 7,
        paddingTop: 7
    },
    map: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        shadowColor: 'black',
        
    }

})

export default PlaceDetailScreen
