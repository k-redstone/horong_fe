function CommunityAlarmToggle({ isToggle }: { isToggle: boolean }) {
  return (
    <div
      className={`${isToggle ? 'bg-primary' : 'bg-grey-10'} relative flex h-full w-[2.5rem] items-center rounded-full transition-all duration-200 ease-in-out`}
    >
      <div
        className={`${isToggle ? 'translate-x-3 bg-text-high' : 'bg-grey-30'} sticky mx-1 h-5 w-5 rounded-full transition-all duration-200 ease-in-out`}
      />
    </div>
  )
}

export default CommunityAlarmToggle
