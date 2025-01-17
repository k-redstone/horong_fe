'use client'

import {
  AdvancedMarker,
  useAdvancedMarkerRef,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps'
import { useEffect, useState } from 'react'

import { EXCHANGE_CONSTANT } from '@/constants/exchange/index.ts'
import ExchangeCard from '@/features/exchange/components/ExchangeCard/index.tsx'
import useInfoWindowStore from '@/features/exchange/hooks/useInfoWindowStore.ts'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { filterExchangeRates } from '@/features/exchange/utils/filterExchange/index.ts'
import useLangStore from '@/hooks/useLangStore.ts'
import ArrowDownSVG from '@/static/svg/exchange/exchange-arrow-down.svg'
import ArrowUpSVG from '@/static/svg/exchange/exchange-arrow-up.svg'
import DashIconSVG from '@/static/svg/exchange/exchange-dash-icon.svg'
import MapPinSVG from '@/static/svg/exchange/exchange-map-pin-icon.svg'

interface ExchangeModalProps {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
  isModal: boolean
  data: ExchangePromise[]
}

function ExchangeModal(props: ExchangeModalProps) {
  const { setIsModal, isModal, data } = props
  const lang = useLangStore((state) => state.lang)
  const map = useMap()
  const mapCenter = map
    ? map.getCenter()
    : { lat: 37.558005440695396, lng: 127.00869391175185 }
  const geometry = useMapsLibrary('geometry')

  const [markerRef, marker] = useAdvancedMarkerRef()
  const {
    openGlobalInfowindow,
    setMarkRef,
    setInfoWindowType,
    setExchangePlaceData,
    initInfoWindowStore,
  } = useInfoWindowStore()

  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [currency, setCurrency] = useState<'CNY' | 'JPY' | 'USD'>('CNY')
  const [exchangeType, setExchangeType] = useState<'BUY' | 'SELL'>('BUY')
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(false)
  const [placeData, setPlaceData] = useState<ExchangePromise | undefined>(
    undefined,
  )

  const handleModal = () => {
    setIsModal(!isModal)
  }
  const handleDropdown = (clickedCurrency: 'CNY' | 'JPY' | 'USD') => {
    setCurrency(clickedCurrency)
    setDropdownOpen(false)
  }

  const handleExchangeClick = (item: ExchangePromise) => {
    map?.setZoom(16)
    map?.setCenter({ lat: item.latitude, lng: item.longitude })
    setPlaceData(item)
    setInfoWindowShown(true)

    handleModal()
  }

  const filteredData = filterExchangeRates(
    data,
    { maxDistance: 1000, geometry: geometry, mapCenter: mapCenter },
    { currency, exchangeType, order },
  )

  useEffect(() => {
    if (infoWindowShown && placeData) {
      initInfoWindowStore()
      openGlobalInfowindow()
      setExchangePlaceData(placeData)
      setInfoWindowType('exchange')
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
    setExchangePlaceData,
  ])

  return (
    <div
      className={`flex w-full flex-col items-center gap-y-5 rounded-tl-xl rounded-tr-xl bg-grey-80 px-6 transition-all duration-500 ease-in-out ${isModal ? 'h-[80dvh]' : `h-[4.625rem]`}`}
    >
      <button
        className="flex w-full flex-col items-center gap-y-5 px-6 py-3"
        onClick={handleModal}
      >
        <DashIconSVG />
        <p className="text-md">
          <span>{EXCHANGE_CONSTANT[lang]['exchange-sub-header']} </span>
        </p>
      </button>

      {/* select option */}
      <div className="flex w-full flex-col gap-y-2 px-2.5">
        <div className="flex justify-center gap-x-3">
          <button
            className={`rounded-lg px-7 py-1 ${exchangeType === 'BUY' ? 'bg-primary' : 'bg-grey-70'}`}
            onClick={() => {
              setExchangeType('BUY')
              setOrder('asc')
            }}
          >
            {EXCHANGE_CONSTANT[lang]['exchange-buy-txt']}
          </button>
          <button
            className={`rounded-lg px-7 py-1 ${exchangeType === 'SELL' ? 'bg-primary' : 'bg-grey-70'}`}
            onClick={() => {
              setExchangeType('SELL')
              setOrder('desc')
            }}
          >
            {EXCHANGE_CONSTANT[lang]['exchange-sell-txt']}
          </button>
        </div>
        <div className="flex flex-col items-end">
          <button
            type="button"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-x-3 rounded-lg bg-grey-70 px-3 py-1"
          >
            <span>{currency}</span>
            {isDropdownOpen ? <ArrowDownSVG /> : <ArrowUpSVG />}
          </button>
          <div className="relative">
            {isDropdownOpen && (
              <div className="absolute right-0 z-40 mt-1 flex w-20 flex-col bg-grey-70 text-start">
                <button
                  type="button"
                  className="px-3 py-1 hover:bg-grey-60"
                  onClick={() => handleDropdown('USD')}
                >
                  USD
                </button>
                <button
                  type="button"
                  className="px-3 py-1 hover:bg-grey-60"
                  onClick={() => handleDropdown('CNY')}
                >
                  CNY
                </button>
                <button
                  type="button"
                  className="px-3 py-1 hover:bg-grey-60"
                  onClick={() => handleDropdown('JPY')}
                >
                  JPY
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* filter */}
      <div
        id={'horong-exchange-ListBox'}
        className="mb-10 flex w-full flex-col gap-y-3 overflow-y-scroll"
      >
        <p>
          <span className="text-xs-bold">
            {EXCHANGE_CONSTANT[lang]['exchange-all-txt']} {filteredData.length}
          </span>
        </p>
        {filteredData.map((filteredItem) => (
          <div
            key={filteredItem.id}
            className="cursor-pointer"
            onClick={() => handleExchangeClick(filteredItem)}
          >
            <ExchangeCard data={filteredItem} />
          </div>
        ))}
      </div>
      {infoWindowShown && placeData && (
        <>
          <AdvancedMarker
            ref={markerRef}
            position={{ lat: placeData?.latitude, lng: placeData?.longitude }}
          >
            <MapPinSVG />
          </AdvancedMarker>
        </>
      )}
    </div>
  )
}
export default ExchangeModal
