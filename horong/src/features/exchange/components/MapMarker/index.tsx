import { AdvancedMarker, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'

import useInfoWindowStore from '@/features/exchange/hooks/useInfoWindowStore.ts'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import MapPinSVG from '@/static/svg/exchange/exchange-map-pin-icon.svg'

interface MapMarkerProps {
  data: ExchangePromise
}

export default function MapMarker({ data }: MapMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef()
  const {
    openGlobalInfowindow,
    setMarkRef,
    setInfoWindowType,
    setExchangePlaceData,
    initInfoWindowStore,
  } = useInfoWindowStore()

  const handleMarkerClick = () => {
    initInfoWindowStore()

    openGlobalInfowindow()
    setExchangePlaceData(data)
    setInfoWindowType('exchange')
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
