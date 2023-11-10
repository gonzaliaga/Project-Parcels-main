import React, { useState, useEffect } from "react"
import {
  GoogleMap,
  Marker,
  InfoWindow,
  LoadScript
} from "@react-google-maps/api"
import mapStyles from "./MapaStyle"
import axios from "axios"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { setCoordenadaPosition } from "@/redux/features/coordenadaSlice"

interface LocationMapsProps {
  location: string
}

const LocationMaps = ({ location }: LocationMapsProps) => {
  const [mapApiKey, setMapApiKey] = useState(
    "AIzaSyDk9BhwfOM8y2fUxlyWxauYZjNQKyQ1YUU"
  )
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 })
  const [showInfoWindow, setShowInfoWindow] = useState(false)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [locationFound, setLocationFound] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const getCoordinatesFromLocation = async () => {
      try {
        let lat
        let lng

        if (location.includes(",")) {
          const [latitude, longitude] = location.split(",")
          lat = parseFloat(latitude.trim())
          lng = parseFloat(longitude.trim())
        } else {
          const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              location
            )}&key=${mapApiKey}`
          )
          const data = response.data

          if (data.status === "OK" && data.results.length > 0) {
            const { lat: latitude, lng: longitude } =
              data.results[0].geometry.location
            lat = latitude
            lng = longitude
          } else {
            console.error(
              "No se encontraron resultados para la ubicación especificada"
            )
            setLocationFound(false)
            return
          }
        }

        if (!isNaN(lat) && !isNaN(lng)) {
          setCenter({ lat, lng })
          setMarkerPosition({ lat, lng })
        }
      } catch (error) {
        console.error("Error al obtener las coordenadas de la ubicación", error)
      }
    }

    if (mapApiKey && location) {
      getCoordinatesFromLocation()
    }
  }, [location, mapApiKey])

  const handleMapLoad = () => {
    setMapLoaded(true)
  }

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    const latLng = event.latLng
    if (latLng) {
      const lat = latLng.lat()
      const lng = latLng.lng()
      setMarkerPosition({ lat, lng })
      setShowInfoWindow(true)
      dispatch(setCoordenadaPosition(`${lat}, ${lng}`))
    }
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <LoadScript googleMapsApiKey={mapApiKey} onLoad={handleMapLoad}>
        {mapLoaded && (
          <GoogleMap
            mapContainerStyle={{ height: "100%", width: "100%" }}
            center={center}
            options={{ styles: mapStyles }}
            zoom={11}
            onClick={handleMapClick}
          >
            {markerPosition.lat !== 0 && <Marker position={markerPosition} />}

            {showInfoWindow && (
              <InfoWindow
                position={markerPosition}
                onCloseClick={() => setShowInfoWindow(false)}
              >
                <div className="text-black font-bold">
                  <h4>Ubicación seleccionada:</h4>
                  <p>Latitud: {markerPosition.lat}</p>
                  <p>Longitud: {markerPosition.lng}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </LoadScript>

      {!locationFound && (
        <p>No se encontraron resultados para la ubicación especificada</p>
      )}
    </div>
  )
}

export default LocationMaps


