import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import React from 'react'
import Slider from 'react-slick'

export const ReactSlider = ({ items = [], onRef, ...props }: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      <Slider
        {...props}
        ref={(slider: any) => {
          if (onRef) onRef(slider)
        }}
      >
        {items.map((item: any, index: number): any => (
          <div key={index}>{item}</div>
        ))}
      </Slider>
    </>
  )
}
