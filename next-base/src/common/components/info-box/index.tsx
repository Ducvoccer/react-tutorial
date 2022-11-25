import React from 'react'

export const InfoBox = ({
  className = '',
  color = false,
  title = '',
  children,
  ...props
}: React.PropsWithChildren<any>): JSX.Element => {
  return (
    <>
      <div className={`ecm-info-box ${color ? '' : 'black'} ${className}`} {...props}>
        <h2 className="pb-3 pl-4 mb-6">{title}</h2>
        <div className="ecm-info-box__content">{children}</div>
      </div>
      <style jsx>{`
        .ecm-info-box {
          position: relative;
        }

        .ecm-info-box > h2 {
          font-size: var(--huge-font-size);
          border-bottom: 2px solid var(--primary-color);
        }

        .ecm-info-box > h2::before {
          content: '';
          width: 4px;
          height: 22px;
          border-radius: 5px;
          background: var(--primary-color);
          position: absolute;
          left: 0;
          top: 3px;
        }

        .ecm-info-box.black > h2 {
          font-size: var(--big-font-size);
          border-bottom: 0;
          padding-bottom: 0;
          padding-left: 0;
        }

        .ecm-info-box.black > h2::before {
          display: none;
        }

        @media (min-width: 1024px) {
        }
      `}</style>
      <style jsx global>{`
        @media (min-width: 1024px) {
        }
      `}</style>
    </>
  )
}
