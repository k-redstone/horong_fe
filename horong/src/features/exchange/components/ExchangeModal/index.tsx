'use client'

import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
  useMap,
} from '@vis.gl/react-google-maps'
import { useCallback, useEffect, useState } from 'react'

import ExchangeCard from '@/features/exchange/components/ExchangeCard/index.tsx'
import { useInfowindow } from '@/features/exchange/contexts/infowindowProvider/index.tsx'
import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
import { decodeHtmlEntities } from '@/features/exchange/utils/decodeHtmlEntities/index.ts'
import { filterExchangeRates } from '@/features/exchange/utils/filterExchange/index.ts'
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
  const map = useMap()
  const [markerRef, marker] = useAdvancedMarkerRef()
  const {
    setPlace,
    setMarker,
    setGlobalInfoWindowShow,
    isGlobalInfowindowShow,
    placeData: globalplaceData,
    handleGlobalClose,
  } = useInfowindow()

  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false)
  const [currency, setCurrency] = useState<'CNY' | 'JPY' | 'USD'>('CNY')
  const [exchangeType, setExchangeType] = useState<'BUY' | 'SELL'>('BUY')
  const [infoWindowShown, setInfoWindowShown] = useState<boolean>(false)
  const [placeData, setPlaceData] = useState<ExchangePromise | undefined>(
    undefined,
  )

  const handleClose = useCallback(() => setInfoWindowShown(false), [])

  const handleModal = () => {
    setIsModal(!isModal)
  }
  const handleDropdown = (clickedCurrency: 'CNY' | 'JPY' | 'USD') => {
    setCurrency(clickedCurrency)
    setDropdownOpen(false)
  }

  const handleExchangeClick = (item: ExchangePromise) => {
    if (isGlobalInfowindowShow) {
      setPlace(undefined)
      setMarker(null)
      handleGlobalClose()
    }

    setPlaceData(item)
    setPlace(item)
    setInfoWindowShown(true)
    setGlobalInfoWindowShow(true)
    handleModal()
    map?.setZoom(16)
    map?.setCenter({ lat: item.latitude, lng: item.longitude })
  }

  useEffect(() => {
    if (!infoWindowShown) {
      handleClose()
    }
    if (globalplaceData?.id !== placeData?.id) {
      handleClose()
    }
  }, [
    handleClose,
    infoWindowShown,
    isGlobalInfowindowShow,
    globalplaceData,
    placeData?.id,
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
          <span>사설 환전소 리스트 </span>
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
            살 때
          </button>
          <button
            className={`rounded-lg px-7 py-1 ${exchangeType === 'SELL' ? 'bg-primary' : 'bg-grey-70'}`}
            onClick={() => {
              setExchangeType('SELL')
              setOrder('desc')
            }}
          >
            팔 때
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
              <div className="absolute right-0 mt-1 flex w-20 flex-col bg-grey-70 text-start">
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
          <span className="text-xs-bold">전체 {data.length}개</span>
        </p>
        {filterExchangeRates(data, { currency, exchangeType, order }).map(
          (filteredItem) => (
            <div
              key={filteredItem.id}
              className="cursor-pointer"
              onClick={() => handleExchangeClick(filteredItem)}
            >
              <ExchangeCard data={filteredItem} />
            </div>
          ),
        )}
      </div>
      {infoWindowShown && placeData && (
        <>
          <AdvancedMarker
            ref={markerRef}
            position={{ lat: placeData?.latitude, lng: placeData?.longitude }}
          >
            <MapPinSVG />
          </AdvancedMarker>
          <InfoWindow
            anchor={marker}
            className="rounded-2xl"
            onClose={() => handleClose()}
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
        </>
      )}
    </div>
  )
}
export default ExchangeModal
