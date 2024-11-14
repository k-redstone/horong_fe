import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps'
import { useCallback } from 'react'

// import { useInfowindow } from '@/features/exchange/contexts/infowindowProvider/index.tsx'
import useInfoWindowStore from '@/features/exchange/hooks/useInfoWindowStore.ts'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'
import MapPinSVG from '@/static/svg/exchange/exchange-map-pin-icon.svg'

interface MapMarkerProps {
  data: ExchangePromise
}

export default function MapMarker({ data }: MapMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const {
    isGlobalInfowindowOpen,
    openGlobalInfowindow,
    closeGlobalInfowindow,
    setMarkRef,
  } = useInfoWindowStore()

  const handleMarkerClick = () => {
    if (isGlobalInfowindowOpen) {
      closeGlobalInfowindow()
    }
    openGlobalInfowindow()
    setMarkRef(marker)
  }

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: data.latitude, lng: data.longitude }}
        onClick={() => handleMarkerClick()}
      >
        <MapPinSVG />
      </AdvancedMarker>
    </>
  )
}
