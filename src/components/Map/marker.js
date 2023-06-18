import {createRandomId} from "../../idGenerator";

export function createMarker(location) {
    if (!location) {
        throw new Error('Location not passed for marker creator')
    }

    return {
        id: createRandomId(),
        lat: location.lat,
        lng: location.lng,
        isNew: true
    }
}