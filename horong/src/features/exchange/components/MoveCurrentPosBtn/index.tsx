import { useMap } from '@vis.gl/react-google-maps'

export default function MoveCurrentPosBtn() {
  const map = useMap()
  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        map?.setCenter({ lat: latitude, lng: longitude })
        map?.setZoom(16)
      },
      null,
      { enableHighAccuracy: true },
    )
  }
  return (
    <button
      type="button"
      onClick={() => getCurrentPosition()}
    >
      현재위치로
    </button>
  )
}
