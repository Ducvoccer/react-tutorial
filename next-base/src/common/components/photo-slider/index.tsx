import React, { useState } from 'react'
import { useEffect } from 'react'

import RightChevronYellowIcon from '/public/svg/right-chevron-yellow.svg'

import { ReactSlider } from '../slider'

export const PhotoSlider = ({
  images = [],
  mainSliderConfig = {},
  navSliderConfig = {},
}: React.PropsWithChildren<any>): JSX.Element => {
  const [mainSlider, setMainSlider] = useState<any>()
  const [navSlider, setNavSlider] = useState<any>()
  const [currentSlide, setCurrentSlide] = useState<number>()

  useEffect(() => {
    setCurrentSlide((mainSliderConfig || {}).initialSlide || 0)
  }, [mainSliderConfig])
  return (
    <>
      <div className="ecm-photo-slider">
        <p className="paging">{`${currentSlide + 1}/${images.length}`}</p>
        <ReactSlider
          className="ecm-photo-slider__preview"
          asNavFor={navSlider}
          onRef={(slider: any) => setMainSlider(slider)}
          {...mainSliderConfig}
          afterChange={setCurrentSlide}
          onInit={setCurrentSlide}
          items={images.map(
            (image: any, index: number): JSX.Element => (
              <div className="ecm-photo-slider__main" key={index}>
                <img src={image} alt={`slider-${index}`} />
              </div>
            )
          )}
        />
        <div className="ecm-photo-slider__control flex items-center">
          <ReactSlider
            className="ecm-photo-slider__nav"
            asNavFor={mainSlider}
            onRef={(slider: any) => setNavSlider(slider)}
            {...navSliderConfig}
            items={images.map(
              (image: any, index: number): JSX.Element => (
                <div className="ecm-photo-slider__main" key={index}>
                  <img src={image} alt={`slider-${index}`} />
                </div>
              )
            )}
          />
          {images.length > 1 && (
            <RightChevronYellowIcon
              onClick={() => {
                if (mainSlider) mainSlider.slickNext()
              }}
            />
          )}
        </div>
      </div>
      <style jsx global>{`
        .ecm-photo-slider {
          position: relative;
        }

        .ecm-photo-slider .paging {
          position: absolute;
          background: var(--label-background);
          border-radius: 20px;
          padding: 3px 12px;
          color: var(--white);
          z-index: 1;
          right: 65px;
          top: 15px;
          font-size: var(--big-font-size);
        }

        .ecm-photo-slider__control > svg {
          width: 10px;
          height: 20px;
          cursor: pointer;
          margin-top: -5px;
          display: none;
        }

        .ecm-photo-slider__preview {
          margin: 0 -10px 60px;
        }

        .ecm-photo-slider__nav {
          display: none;
          width: calc(100% - 30px);
        }

        .ecm-photo-slider__preview .ecm-photo-slider__main {
          padding: 0 10px;
        }

        .ecm-photo-slider__preview .slick-list {
          margin-left: -50px;
        }

        .ecm-photo-slider__preview .ecm-photo-slider__main .ecm-photo-slider__nav .ecm-photo-slider__main {
          padding-right: 5px;
        }

        .ecm-photo-slider__nav .ecm-photo-slider__main img {
          border-radius: 5px;
        }

        .ecm-photo-slider__preview .slick-dots {
          bottom: -35px;
        }

        .ecm-photo-slider__preview .slick-dots li {
          position: relative;
          margin: 0;
          width: 14px;
        }

        .ecm-photo-slider__preview .slick-dots li button {
          width: 6px;
          height: 6px;
          background-color: var(--dot-background);
          position: absolute;
          padding: 0;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border-radius: 6px;
          transition: all var(--animtation-duration) ease-in-out;
        }

        .ecm-photo-slider__preview .slick-dots li.slick-active button {
          width: 10px;
          height: 10px;
          background: var(--primary-color);
        }

        .ecm-photo-slider__preview .slick-dots li button:before {
          display: none;
        }

        @media (min-width: 768px) {
          .ecm-photo-slider__nav,
          .ecm-photo-slider__control > svg {
            display: block;
          }

          .ecm-photo-slider__preview {
            margin-bottom: 6px;
          }

          .ecm-photo-slider__nav {
            width: calc(100% - 20px);
          }

          .ecm-photo-slider__preview .slick-dots {
            display: none !important;
          }

          .ecm-photo-slider__nav .ecm-photo-slider__main {
            padding-right: 10px;
          }

          .ecm-photo-slider__preview .slick-list {
            margin-left: 0;
          }

          .ecm-photo-slider .paging {
            right: 15px;
          }
        }

        @media (min-width: 1280px) {
          .ecm-photo-slider__preview {
            margin-bottom: 20px;
          }

          .ecm-photo-slider__nav .ecm-photo-slider__main {
            padding-right: 20px;
          }
        }
      `}</style>
    </>
  )
}
