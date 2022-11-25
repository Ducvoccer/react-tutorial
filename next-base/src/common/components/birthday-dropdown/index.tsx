import React, { useMemo, useState } from 'react'
import { Controller } from 'react-hook-form'
import { Select } from 'src/common/antd'
import { useLanguage } from 'src/common/hooks'

import { locale } from './locale'

export const BirthDayDropdown = ({ control, date, month, year }: React.PropsWithChildren<any>): JSX.Element => {
  const [lang] = useLanguage()
  const messages = locale[lang]

  const currentYear = new Date().getFullYear()
  const [yearValue, setYearValue] = useState(year)
  const [monthValue, setMonthValue] = useState(month)

  const years = Array.from(new Array(100), (_, index: number) => ({
    key: currentYear - index,
    value: currentYear - index,
    label: currentYear - index,
  }))
  const months = Array.from(new Array(12), (_, index: number) => ({
    key: index + 1,
    value: index + 1,
    label: index + 1,
  }))
  const days = Array.from(new Array(31), (_, index: number) => ({
    key: index + 1,
    value: index + 1,
    label: index + 1,
  }))

  const getDaysBySelectedMonth = useMemo(() => {
    if (monthValue) {
      const daysInMonth = new Date(yearValue, monthValue, 0).getDate()
      return days.filter((day: any) => day.key <= daysInMonth)
    }
    return days
  }, [monthValue, yearValue])

  return (
    <>
      <div className="ecm-birthday flex items-center">
        <Controller
          defaultValue={year}
          control={control}
          name="year"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Select
              placeholder={messages.year}
              options={years}
              value={value}
              onChange={(value) => {
                onChange(value)
                setYearValue(value)
              }}
            />
          )}
        />
        <span className="mx-2">{messages.year}</span>
        <Controller
          defaultValue={month}
          control={control}
          name="month"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Select
              placeholder={messages.month}
              options={months}
              value={value}
              onChange={(value) => {
                onChange(value)
                setMonthValue(value)
              }}
            />
          )}
        />
        <span className="mx-2">{messages.month}</span>
        <Controller
          defaultValue={date}
          control={control}
          name="date"
          rules={{ required: true }}
          render={({ field: { value, onChange } }) => (
            <Select placeholder={messages.day} options={getDaysBySelectedMonth} value={value} onChange={onChange} />
          )}
        />
        <span className="mx-2">{messages.day}</span>
      </div>
      <style jsx global>{`
        .ecm-birthday .ecm-select {
          flex-grow: 1;
        }

        @media (min-width: 768px) {
          .ecm-birthday .ecm-select {
            flex-grow: initial;
            width: 120px;
          }
        }
      `}</style>
    </>
  )
}
