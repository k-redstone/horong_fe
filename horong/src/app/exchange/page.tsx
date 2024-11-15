'use client'
import GlobalHeader from '@/components/globalHeader/index.tsx'
import { EXCHANGE_CONSTANT } from '@/constants/exchange/index.ts'
import GoogleMap from '@/features/exchange/components/GoogleMap/index.tsx'
import useLangStore from '@/hooks/useLangStore.ts'

export default function ExchangePage() {
  const lang = useLangStore((state) => state.lang)
  return (
    <div className="flex w-full flex-col">
      <GlobalHeader
        pageName={`${EXCHANGE_CONSTANT[lang]['exchange-header']}`}
      />
      <div className="grow">
        <GoogleMap />
      </div>
    </div>
  )
}
