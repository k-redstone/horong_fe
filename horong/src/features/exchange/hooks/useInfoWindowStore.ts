import { create } from 'zustand'

interface InfoWindowStoreProps {
  isGlobalInfowindowOpen: boolean
  markerRef: google.maps.marker.AdvancedMarkerElement | null
  infoWindowType: string | null
  openGlobalInfowindow: () => void
  closeGlobalInfowindow: () => void
  setMarkRef: (arg: google.maps.marker.AdvancedMarkerElement | null) => void
}

const useInfoWindowStore = create<InfoWindowStoreProps>()((set) => ({
  isGlobalInfowindowOpen: false,
  markerRef: null,
  infoWindowType: null,

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
