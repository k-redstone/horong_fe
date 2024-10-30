'use client'

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useApiIsLoaded,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'
import { useCallback, useEffect, useRef, useState } from 'react'

import GoogleIconSVG from '@/static/svg/exchange/exchange-google-icon.svg'

export default function MapSearchBox() {
  const places = useMapsLibrary('places')
  const [markerRef, marker] = useAdvancedMarkerRef()

  const input = useRef<HTMLInputElement>(null)
  const [apiError, setApiError] = useState<boolean>(false)
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(false)
  const [placeData, setPlaceData] = useState<
    google.maps.places.PlaceResult | undefined
  >(undefined)
  const map = useMap()

  const mapAPIisLoaded = useApiIsLoaded()

  const handleClose = useCallback(() => setInfoWindowShown(false), [placeData])

  useEffect(() => {
    if (!places || !input.current || !map || !mapAPIisLoaded) return

    try {
      const searchBox = new google.maps.places.SearchBox(input.current)

      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        if (places && places.length > 0) {
          const place = places[0]

          if (place.geometry?.location) {
            map.setCenter(place.geometry.location)
            map.setZoom(15)
            console.log(place)

            setInfoWindowShown(true)
            setPlaceData(place)
          }
        }
      })

      return () => {
        google.maps.event.clearInstanceListeners(searchBox)
      }
    } catch (error) {
      console.error('Google Maps API 로딩 중 오류가 발생했습니다:', error)
      setApiError(true)
    }
  }, [map, places, infoWindowShown])

  if (apiError) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
        Google Maps API를 불러오지 못했습니다. <br />
        API 키가 유효한지 확인해주세요.
      </div>
    )
  }

  return (
    <div className="flex w-[20rem] gap-x-2 rounded-full bg-grey-80 px-3 py-2">
      <span className="grow">{infoWindowShown ? 'true' : 'false'}</span>
      <GoogleIconSVG />
      <input
        className="grow bg-grey-80 bg-none text-sm focus:outline-none"
        type="text"
        ref={input}
        placeholder="Search here"
      />
      {infoWindowShown && (
        <>
          <AdvancedMarker
            ref={markerRef}
            position={placeData?.geometry?.location}
          />
          <InfoWindow
            anchor={marker}
            onClose={handleClose}
            headerContent={<h3 className="text-black">{placeData?.name}</h3>}
          >
            <div className="flex flex-col text-black">
              <span className="py-2">주소: {placeData?.formatted_address}</span>
            </div>
          </InfoWindow>
        </>
      )}
    </div>
  )
}
