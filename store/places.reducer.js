import {ADD_PLACE, LOAD_PLACE} from './places.actions'
import Place from '../models/Place'

const initialState = {
    places: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(
                Date.now(), 
                action.payload.title, 
                action.payload.image, 
                action.payload.lat, 
                action.payload.lng,
                action.payload.address
            )
            return {
                ...state,
                places: state.places.concat(newPlace),
            }
        case LOAD_PLACE:
            return {
                ...state,
                places: action.places.map(item => new Place(
                        item.id.toString(),
                        item.title,
                        item.image,
                        item.lat,
                        item.lng,
                        item.address
                    )
                ),
            }
    
        default:
            return state
    }
}