import clsx from 'clsx'
import CheckedIcon from 'public/svg/checked.svg'
type InfoRowProps = {
  label: string
  value?: string | JSX.Element
  isChecked?: boolean
  subCategories?: string
}

export function InfoRow(props: InfoRowProps) {
  const { label, value, isChecked, subCategories } = props
  return (
    <div className="info-row mt-7 flex justify-start items-start gap-x-2">
      <CheckedIcon className={clsx('mt-[2px]', { hidden: !isChecked })} />
      <div>
        <div className="font-bold">{label}</div>
        <div className="text-sm mt-2">{value}</div>
        {subCategories && <div className="text-sm mt-2">{subCategories}</div>}
      </div>
    </div>
  )
}
