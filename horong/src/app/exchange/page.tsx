import GlobalHeader from '@/components/globalHeader/index.tsx'
import GoogleMap from '@/features/exchange/components/GoogleMap/index.tsx'

export default function ExchangePage() {
  return (
    <div className="w-full">
      <GlobalHeader pageName="환전소" />
      <div className="h-[45rem]">
        <GoogleMap />
      </div>
    </div>
  )
}
