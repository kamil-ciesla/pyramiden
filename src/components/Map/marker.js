import {createRandomId} from "../../idGenerator";

export function createMarker(location, isNew = false) {
    if (!location) {
        throw new Error('Location not passed for marker creator')
    }

    return {
        id: createRandomId(),
        lat: location.lat,
        lng: location.lng,
        isNew: isNew
    }
}