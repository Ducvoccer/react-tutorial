import Spin, { SpinProps } from 'antd/lib/spin'

type SpinContainerProps = {
  height?: string
  width?: string
  type?: 'full-screen' | 'full-container' | 'auto'
} & SpinProps

export const SpinContainer = ({ type = 'auto', height = '12px', width = '12px', ...props }: SpinContainerProps) => {
  return (
    <>
      <div className="container">
        <Spin {...props} />
      </div>
      <style jsx>
        {`
          .container {
            position: ${type === 'full-screen' ? 'fixed' : type ===
            'full-container' ? 'absolute' : 'static'};
            top: 0;
            left: 0;
            z-index: 999;
            background-color: rgba(255, 255, 255, 0.5);
            height: ${type === 'auto' ? height : '100%'};
            width: ${type === 'auto' ? width : '100%'};
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  )
}
