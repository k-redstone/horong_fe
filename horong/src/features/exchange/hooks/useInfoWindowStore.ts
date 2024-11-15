import { create } from 'zustand'

import { ExchangePromise } from '@/features/exchange/types/ExchangeType.ts'
interface InfoWindowStoreProps {
  isGlobalInfowindowOpen: boolean
  markerRef: google.maps.marker.AdvancedMarkerElement | null
  infoWindowType: 'search' | 'exchange' | null
  exchangePlaceData: ExchangePromise | null
  searchPlaceData: google.maps.places.PlaceResult | null
  setExchangePlaceData: (data: ExchangePromise) => void
  setSearchPlaceData: (data: google.maps.places.PlaceResult) => void
  setInfoWindowType: (type: 'search' | 'exchange') => void
  openGlobalInfowindow: () => void
  closeGlobalInfowindow: () => void
  setMarkRef: (arg: google.maps.marker.AdvancedMarkerElement | null) => void
  initInfoWindowStore: () => void
}

const useInfoWindowStore = create<InfoWindowStoreProps>()((set) => ({
  isGlobalInfowindowOpen: false,
  markerRef: null,
  infoWindowType: null,
  exchangePlaceData: null,
  searchPlaceData: null,

  initInfoWindowStore: () => {
    set({
      isGlobalInfowindowOpen: false,
      markerRef: null,
      infoWindowType: null,
      exchangePlaceData: null,
      searchPlaceData: null,
    })
  },
  setInfoWindowType: (type) => {
    set({ infoWindowType: type })
  },
  setExchangePlaceData: (data) => {
    set({ exchangePlaceData: data })
  },
  setSearchPlaceData: (data) => {
    set({ searchPlaceData: data })
  },
  openGlobalInfowindow: () => {
    set({ isGlobalInfowindowOpen: true })
  },

  closeGlobalInfowindow: () => {
    set({ isGlobalInfowindowOpen: false })
  },

  setMarkRef: (arg) => {
    set({ markerRef: arg })
  },
}))

export default useInfoWindowStore
