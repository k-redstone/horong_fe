import GoogleMap from '@/features/exchange/components/GoogleMap/index.tsx'

export default function ExchangePage() {
  return (
    <div className="w-[22.5rem]">
      <p>This is Exchange Page</p>
      <div className="h-[45rem]">
        <GoogleMap />
      </div>
    </div>
  )
}
