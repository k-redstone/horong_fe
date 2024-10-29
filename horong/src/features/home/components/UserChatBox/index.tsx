interface UserChatBoxProps {
  text: string
}

export default function UserChatBox({ text }: UserChatBoxProps) {
  return (
    <div className="flex w-full justify-end">
      <div className="max-w-[17.25rem] rounded-bl-xl rounded-br-xl rounded-tl-xl bg-gradient-to-br from-[#22DFEB] to-[#ACBEFF] p-[.0625rem]">
        <p className="flex rounded-bl-xl rounded-br-xl rounded-tl-xl bg-[#1B1D24] px-2.5 py-1">
          <span className="w-fit hyphens-auto break-all bg-[#1B1D24] text-xs text-white">
            {text}
          </span>
        </p>
      </div>
    </div>
  )
}
