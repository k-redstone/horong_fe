'use client'

import {
  AdvancedMarker,
  useAdvancedMarkerRef,
  useApiIsLoaded,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'
import { useEffect, useRef, useState } from 'react'

import { EXCHANGE_CONSTANT } from '@/constants/exchange/index.ts'
import useInfoWindowStore from '@/features/exchange/hooks/useInfoWindowStore.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import GoogleIconSVG from '@/static/svg/exchange/exchange-google-icon.svg'
import MapPinSVG from '@/static/svg/exchange/exchange-map-pin-icon.svg'

export default function MapSearchBox() {
  const places = useMapsLibrary('places')
  const [markerRef, marker] = useAdvancedMarkerRef()
  const lang = useLangStore((state) => state.lang)

  const input = useRef<HTMLInputElement>(null)
  const [apiError, setApiError] = useState<boolean>(false)
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(false)

  const {
    openGlobalInfowindow,
    setMarkRef,
    setInfoWindowType,
    setSearchPlaceData,
    initInfoWindowStore,
  } = useInfoWindowStore()

  const [placeData, setPlaceData] = useState<
    google.maps.places.PlaceResult | undefined
  >(undefined)
  const map = useMap()

  const mapAPIisLoaded = useApiIsLoaded()

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
            setInfoWindowShown(true)
            setPlaceData(place)
          }
        }
      })

      return () => {
        google.maps.event.clearInstanceListeners(searchBox)
      }
    } catch {
      setApiError(true)
    }
  }, [map, mapAPIisLoaded, places])

  useEffect(() => {
    if (infoWindowShown && placeData) {
      initInfoWindowStore()
      openGlobalInfowindow()
      setSearchPlaceData(placeData)
      setInfoWindowType('search')
      setMarkRef(marker)
    }
  }, [
    infoWindowShown,
    initInfoWindowStore,
    marker,
    openGlobalInfowindow,
    placeData,
    setInfoWindowType,
    setMarkRef,
    setSearchPlaceData,
  ])

  if (apiError) {
    return (
      <div style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>
        Loading Google Maps API Error <br />
        Check API key is available
      </div>
    )
  }

  return (
    <div className="flex w-[20rem] gap-x-2 rounded-full bg-grey-80 px-3 py-2">
      <GoogleIconSVG />
      <input
        className="grow bg-grey-80 bg-none text-sm focus:outline-none"
        type="text"
        ref={input}
        placeholder={EXCHANGE_CONSTANT[lang]['exchage-search-txt']}
      />
      {infoWindowShown && placeData && (
        <AdvancedMarker
          ref={markerRef}
          position={placeData?.geometry?.location}
        >
          <MapPinSVG />
        </AdvancedMarker>
      )}
    </div>
  )
}
