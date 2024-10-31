import GlobalHeader from '@/components/globalHeader/index.tsx'
import GoogleMap from '@/features/exchange/components/GoogleMap/index.tsx'

export default function ExchangePage() {
  return (
    <div className="flex w-full flex-col">
      <GlobalHeader pageName="환전소" />
      <div className="grow">
        <GoogleMap />
      </div>
    </div>
  )
}
