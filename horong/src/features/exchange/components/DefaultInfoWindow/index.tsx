import { InfoWindow } from '@vis.gl/react-google-maps'

import useInfoWindowStore from '@/features/exchange/hooks/useInfoWindowStore.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'

function DefaultInfoWindow() {
  const {
    isGlobalInfowindowOpen,
    exchangePlaceData,
    searchPlaceData,
    closeGlobalInfowindow,
    infoWindowType,
    markerRef,
  } = useInfoWindowStore()

  if (
    isGlobalInfowindowOpen &&
    exchangePlaceData &&
    infoWindowType === 'exchange'
  ) {
    return (
      <InfoWindow
        anchor={markerRef}
        className="rounded-2xl"
        onClose={() => closeGlobalInfowindow()}
        maxWidth={300}
        headerContent={
          <h3 className="text-xs text-black">{exchangePlaceData.name}</h3>
        }
      >
        <ul className="flex list-inside list-disc flex-col gap-y-2 text-[.625rem] text-black">
          <li>
            <span>{decodeHtmlEntities(exchangePlaceData.address)}</span>
            <br />
          </li>
          {exchangePlaceData.phone !== '' && (
            <li>
              <span>{decodeHtmlEntities(exchangePlaceData.phone)}</span>
              <br />
            </li>
          )}
          {exchangePlaceData?.description !== '' && (
            <li>
              <span>{decodeHtmlEntities(exchangePlaceData?.description)}</span>
            </li>
          )}
        </ul>
      </InfoWindow>
    )
  }

  if (
    isGlobalInfowindowOpen &&
    searchPlaceData &&
    infoWindowType === 'search'
  ) {
    return (
      <InfoWindow
        anchor={markerRef}
        onClose={() => closeGlobalInfowindow()}
        maxWidth={300}
        headerContent={
          <h3 className="tex-xs text-black">{searchPlaceData.name}</h3>
        }
      >
        <div className="flex flex-col text-[.625rem] text-black">
          <span className="py-2">{searchPlaceData.formatted_address}</span>
        </div>
      </InfoWindow>
    )
  }
}

export default DefaultInfoWindow
