import React from 'react'

type FormWrapperProps = {
  label?: string | JSX.Element
  error?: string | string[] | JSX.Element
  padding?: string
  margin?: string
}

export const FormWrapper = ({
  label,
  error,
  children,
  padding = '0',
  margin = '0 0 16px',
}: React.PropsWithChildren<FormWrapperProps>): JSX.Element => {
  return (
    <>
      <div className="form-wrapper">
        <label>
          <div className="label">{label}</div>
          {children}
        </label>
        {renderError(error)}
      </div>
      <style jsx>{`
        .form-wrapper {
          padding: ${padding};
          margin: ${margin};
        }
        .label {
          font-size: 12px;
          color: rgba(0, 0, 0, 0.45);
        }
        .error {
          font-size: 12px;
          color: #ff4d4f;
        }
      `}</style>
    </>
  )
}

const renderError = (error?: string | string[] | JSX.Element) => {
  if (!error) {
    return null
  }
  if (React.isValidElement(error)) {
    return error
  }
  if (typeof error === 'string') {
    return <div className="error"> {error} </div>
  }
  if (Array.isArray(error)) {
    return <div className="error" dangerouslySetInnerHTML={{ __html: error.join('<br />') }}></div>
  }
}
