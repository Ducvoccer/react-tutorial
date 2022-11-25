type PageSpaceProps = {
  type?: 'half-row' | 'row' | 'standalone'
  padding?: string
  margin?: string
  className?: string
  display?: 'block' | 'flex' | 'inline-block' | 'inline-flex'
}

const spaceMap = {
  'half-row': '0 0 8px',
  row: '0 0 16px',
  standalone: '60px 0 16px',
}

export const PageSpace = ({
  type,
  padding = '0 16px',
  margin = 'initial',
  display = 'block',
  className = 'block',
  children,
}: React.PropsWithChildren<PageSpaceProps>): JSX.Element => {
  if (type) {
    padding = spaceMap[type] || padding
  }
  return (
    <>
      <div className={`section ${className}`}>{children}</div>
      <style jsx>{`
        .section {
          display: ${display};
          padding: ${padding};
          margin: ${margin};
        }
      `}</style>
    </>
  )
}
