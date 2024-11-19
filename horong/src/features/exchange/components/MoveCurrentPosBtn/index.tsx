import { AdvancedMarker, useMap } from '@vis.gl/react-google-maps'
import { useState } from 'react'

import CurrentPositionIcon from '@/static/svg/exchange/exchange-current-position-icon.svg'
import MapPositionSVG from '@/static/svg/exchange/exchange-map-position-icon.svg'

export default function MoveCurrentPosBtn() {
  const map = useMap()
  const [currentPosition, setCurrentPopsition] = useState<
    | {
        lat: number
        lng: number
      }
    | undefined
  >(undefined)

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        map?.setCenter({ lat: latitude, lng: longitude })
        map?.setZoom(16)
        setCurrentPopsition({ lat: latitude, lng: longitude })
      },
      null,
      { enableHighAccuracy: true },
    )
  }
  return (
    <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-grey-20 bg-grey-90">
      <CurrentPositionIcon onClick={() => getCurrentPosition()} />

      <AdvancedMarker position={currentPosition}>
        <MapPositionSVG />
      </AdvancedMarker>
    </div>
  )
}
