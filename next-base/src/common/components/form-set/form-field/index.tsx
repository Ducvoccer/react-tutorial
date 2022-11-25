import { Select as SelectAnt } from 'antd'
import { FileUploader } from 'common-ui/components'
import RemoveFilledIcon from 'public/svg/remove-filled.svg'
import SearchIcon from 'public/svg/search.svg'
import React, { useMemo, useState } from 'react'
import { Checkbox, Input, Popover, Radio, Select } from 'src/common/antd'

enum InputType {
  INPUT = 'input',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  SELECT_CUSTOM = 'select_custom',
  SEARCH = 'search',
  TEXTAREA = 'textarea',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  FILEUPLOADER = 'file-uploader',
  PASSWORD = 'password',
  HASHTAG = 'hashtag',
}

enum InputVersion {
  V1 = 'v1',
  V2 = 'v2',
}

export const FormField = ({
  version = InputVersion.V1,
  containerClass,
  title,
  label,
  type,
  requiredString,
  note,
  warning1,
  warning2,
  noteLabel1,
  noteLabel2,
  handleNoteAction,
  noteAction,
  limitationNote,
  maxFiles,
  titleNote,
  showSearch,
  uploadNote = '',
  tags = [],
  onTagsChange,
  errorMessage = '',
  hashOption = [],
  childrenItem,
  ...props
}: React.PropsWithChildren<any>): JSX.Element => {
  const handleRemoveTag = (tag: string) => {
    const newTags = (tags || []).filter((t: string) => t !== tag)
    if (onTagsChange) onTagsChange(newTags)
  }
  const { Option } = SelectAnt
  const children = useMemo(() => {
    return (
      <>
        {hashOption.map((item) => (
          <Option key={item?.attributes?.name}>{item?.attributes?.name || ''}</Option>
        ))}
      </>
    )
  }, [hashOption])

  const [visible, setVisible] = useState(false)

  const handleVisibleChange = (newVisible: boolean) => {
    setVisible(newVisible)
  }

  const renderInput = () => {
    switch (type) {
      case InputType.INPUT:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Input {...props} />
          </div>
        )
      case InputType.NUMBER:
      case InputType.DATE:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Input type={type} {...props} />
          </div>
        )
      case InputType.PASSWORD:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Input type={type} visibilityToggle={false} {...props} />
          </div>
        )
      case InputType.SEARCH:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Input {...props} prefix={<SearchIcon />} />
          </div>
        )
      case InputType.SELECT:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Select {...props} showSearch={showSearch} />
          </div>
        )
      case InputType.SELECT_CUSTOM:
        return !props?.disabled ? (
          <div className="ecm-form-field__select-popover pb-5 pt-3">
            <Popover
              placement="bottom"
              content={childrenItem}
              trigger="click"
              visible={visible}
              {...props}
              onVisibleChange={handleVisibleChange}
            >
              <Select {...props} showSearch={showSearch} disabled></Select>
            </Popover>
          </div>
        ) : (
          <Select {...props} showSearch={showSearch}></Select>
        )
      case InputType.TEXTAREA:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Input {...props} type="textarea" />
          </div>
        )
      case InputType.RADIO:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Radio {...props} group />
          </div>
        )
      case InputType.CHECKBOX:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Checkbox {...props} group={typeof props.group != undefined ? props.group : true} size="rounded" />
          </div>
        )
      case InputType.FILEUPLOADER:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <p className="file-upload-note mb-4">{uploadNote}</p>
            <FileUploader {...props} maxFiles={maxFiles} />
          </div>
        )
      case InputType.HASHTAG:
        return (
          <div className="ecm-form-field__input pb-5 pt-3">
            <Select
              {...props}
              mode="tags"
              value={[]}
              style={{ width: '100%' }}
              onChange={(tag) => {
                if (!tags?.some((x) => x == tag[0])) {
                  onTagsChange([...(tags || []), tag[0]])
                }
              }}
            >
              {children}
            </Select>
            <div className="ecm-tags flex items-center mt-4 flex-wrap">
              {tags.map(
                (tag: string): JSX.Element => (
                  <div className="tag flex items-center mr-6 mb-4" key={tag}>
                    <span className="mr-2">#{tag}</span>
                    <RemoveFilledIcon
                      className="a-standard hoverable"
                      onClick={() => !props.disabled && handleRemoveTag(tag)}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        )
    }
    return null
  }
  return (
    <>
      <div className={`ecm-form-field ${containerClass} ${version}`}>
        {title && (
          <div className="ecm-form-field__title flex items-center py-3 pl-3 mb-3 md:mb-5">
            <h2>{title}</h2>
            {requiredString && <span className="ml-3">{requiredString}</span>}
            {titleNote && <p className="ml-4 md:ml-10">{titleNote}</p>}
          </div>
        )}
        <label className="ecm-form-field__label flex flex-col">
          {label && <p>{label}</p>}
          {note && <span className="text-[#FF0909]">{note}</span>}
          {warning1 && <span className="text-[#FF0909] pt-2">{warning1}</span>}
          {warning2 && <span className="text-[#FF0909]">{warning2}</span>}
          {noteLabel1 && (
            <div className="flex">
              <span>{noteLabel1}</span>
              {noteAction && (
                <span className="underline font-bold cursor-pointer" onClick={handleNoteAction}>
                  {noteAction}
                </span>
              )}
              {noteLabel2 && <span>{noteLabel2}</span>}
            </div>
          )}
        </label>
        {renderInput()}
        {!!errorMessage && <p className="ecm-form-field__error ecm-error text">{errorMessage}</p>}
        <p className="ecm-form-field__note text-right">{limitationNote}</p>
      </div>
      <style jsx>{`
        .ecm-form-field {
          position: relative;
        }

        .ecm-form-field__title {
          border-bottom: 2px solid var(--primary-color);
          position: relative;
        }

        .ecm-form-field__title h2 {
          font-size: var(--huge-font-size);
          white-space: nowrap;
        }

        .ecm-form-field__title p {
          font-size: var(--small-font-size);
        }

        .ecm-form-field__title::before {
          content: '';
          width: 4px;
          height: 22px;
          border-radius: 5px;
          background: var(--primary-color);
          position: absolute;
          left: 0;
        }

        .ecm-form-field__title span {
          display: inline-block;
          color: var(--error-color);
          padding: 2px 4px;
          font-size: var(--small-font-size);
        }

        .ecm-form-field__label p {
          font-size: var(--base-font-size);
          margin-bottom: 0;
        }

        .ecm-form-field span {
          font-size: var(--larger-font-size);
        }

        .ecm-form-field__note {
          position: absolute;
          right: 0;
          top: calc(100% - 10px);
          font-size: var(--small-font-size);
        }

        .v2 .ecm-form-field__label {
          display: flex;
          align-items: center;
          flex-direction: row;
        }

        .v2 .ecm-form-field__label p {
          font-weight: var(--bold-font-weight);
        }

        .v2 .ecm-form-field__label span {
          margin-left: 10px;
          color: var(--error-color);
        }

        .v2 .ecm-form-field__note {
          color: var(--error-color);
        }

        @media (min-width: 768px) {
          .ecm-form-field__title p {
            font-size: var(--larger-font-size);
          }

          .ecm-form-field__label p {
            font-size: var(--large-font-size);
            margin-bottom: 0;
          }

          .ecm-form-field__note {
            font-size: var(--medium-font-size);
          }

          .ecm-form-field__title span {
            font-size: var(--medium-font-size);
          }
        }
      `}</style>
      <style jsx global>{`
        .ecm-form-field__input .file-upload-note {
          font-size: var(--small-font-size);
          margin-top: -10px;
        }

        .ant-popover-title {
          border: none;
          font-size: 18px;
          line-height: 150%;
          letter-spacing: 0.05em;
          color: #693f00;
        }
        .ant-popover-inner {
          padding: 30px;
          width: 95vw;
        }

        @media (min-width: 768px) {
          .ant-popover-inner {
            width: 760px;
          }
        }

        .ecm-form-field__select-popover
          .ant-select-disabled.ant-select:not(.ant-select-customize-input)
          .ant-select-selector {
          background: white;
          cursor: pointer;
          color: black;
        }
        .ecm-form-field__select-popover
          .ant-select-disabled.ant-select:not(.ant-select-customize-input).placeholder
          .ant-select-selector {
          color: rgba(0, 0, 0, 0.25);
        }
        .ecm-form-field__select-popover
          .ant-select-disabled.ant-select:not(.ant-select-customize-input)
          .ant-select-selector
          input {
          cursor: pointer;
        }

        .ecm-tags .tag span {
          text-decoration: underline;
        }

        .ecm-form-field__input .hashtag {
          background-color: var(--input-bg) !important;
          border-color: var(--input-bg) !important;
          border-radius: 40px;
          padding-left: 15px;
        }

        .ecm-form-field__input .hashtag .ant-input-suffix svg {
          color: var(--btn-bg);
          opacity: 0;
          transition: all var(--animation-duration) ease-in-out;
        }

        .ecm-form-field__input .hashtag .ant-input-suffix > span:after {
          display: none;
        }

        .ecm-form-field__input .hashtag.ant-input-affix-wrapper-focused svg {
          opacity: 1;
        }

        .ecm-form-field__error {
          margin-top: -10px;
        }

        @media (min-width: 768px) {
          .ecm-form-field__input .file-upload-note {
            font-size: var(--medium-font-size);
          }
        }
      `}</style>
    </>
  )
}
