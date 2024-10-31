'use client'
import { InfoWindow } from '@vis.gl/react-google-maps'
import { createContext, useCallback, useContext, useState } from 'react'

import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'

interface infowindowProviderProps {
  isGlobalInfowindowShow: boolean
  placeData: ExchangePromise | undefined
  setGlobalInfoWindowShow: React.Dispatch<React.SetStateAction<boolean>>
  setPlace: (data: ExchangePromise | undefined) => void
  handleGlobalClose: () => void
  setMarker: (marker: google.maps.marker.AdvancedMarkerElement | null) => void
}

const InfowindowContext = createContext<infowindowProviderProps | undefined>(
  undefined,
)

const useInfowindow = () => {
  const context = useContext(InfowindowContext)
  if (!context)
    throw new Error('useLanguage must be used within a LanguageProvider')
  return context
}

function InfowindowProvider({ children }: { children: React.ReactNode }) {
  const [isGlobalInfowindowShow, setGlobalInfoWindowShow] =
    useState<boolean>(false)
  const [placeData, setPlaceData] = useState<ExchangePromise | undefined>(
    undefined,
  )
  const [marker, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null)

  const handleGlobalClose = useCallback(
    () => setGlobalInfoWindowShow(false),
    [],
  )

  const changePlace = (data: ExchangePromise | undefined) => {
    setPlaceData(data)
  }

  const changeMarker = (
    marker: google.maps.marker.AdvancedMarkerElement | null,
  ) => {
    setMarker(marker)
  }
  return (
    <InfowindowContext.Provider
      value={{
        isGlobalInfowindowShow,
        placeData,
        handleGlobalClose,
        setGlobalInfoWindowShow,
        setPlace: changePlace,
        setMarker: changeMarker,
      }}
    >
      {placeData && isGlobalInfowindowShow && (
        <InfoWindow
          anchor={marker}
          className="rounded-2xl"
          onClose={() => handleGlobalClose()}
          maxWidth={300}
          headerContent={
            <h3 className="text-xs text-black">{placeData.name}</h3>
          }
        >
          <ul className="flex list-inside list-disc flex-col gap-y-2 text-[.625rem] text-black">
            <li>
              <span>{decodeHtmlEntities(placeData.address)}</span>
              <br />
            </li>
            {placeData.phone !== '' && (
              <li>
                <span>{decodeHtmlEntities(placeData.phone)}</span>
                <br />
              </li>
            )}
            {placeData?.description !== '' && (
              <li>
                <span>{decodeHtmlEntities(placeData?.description)}</span>
              </li>
            )}
          </ul>
        </InfoWindow>
      )}

      {children}
    </InfowindowContext.Provider>
  )
}

export { useInfowindow, InfowindowProvider }
