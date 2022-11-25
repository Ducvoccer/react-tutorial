import DeleteIcon from 'public/svg/delete.svg'
import PlusIcon from 'public/svg/plus.svg'
import { useEffect, useRef, useState } from 'react'

const isImage = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  return isJpgOrPng
}

const isVideo = (file) => {
  const isValidVideoFormats = file.type === 'video/mp4' || file.type === 'video/ogg' || file.type === 'video/webm'
  return isValidVideoFormats
}

const isValidImageSize = (file) => {
  const isLt2M = file.size / 1024 / 1024 <= 2
  return isLt2M
}

enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export const FileUploader = ({
  fileType = 'image',
  multiple = true,
  name,
  uploadedFiles,
  handleDrop,
  handleRemove,
  maxFiles = 1,
  children,
  disabled = false,
  ...props
}: React.PropsWithChildren<any>): JSX.Element => {
  const dropRef = useRef(null)
  const inputRef = useRef(null)
  const [previewImages, setPreviewImages] = useState([])
  const [dragCounter, setDragCounter] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [dragging, setDragging] = useState(false)
  const videoRef = useRef(null)

  /*eslint-disable */
  useEffect(() => {
    const div = dropRef.current
    div.addEventListener('dragenter', handleDragInAction)
    div.addEventListener('dragleave', handleDragOutAction)
    div.addEventListener('dragover', handleDragAction)
    div.addEventListener('drop', handleDropAction)

    return () => {
      div.removeEventListener('dragenter', handleDragInAction)
      div.removeEventListener('dragleave', handleDragOutAction)
      div.removeEventListener('dragover', handleDragAction)
      div.removeEventListener('drop', handleDropAction)
    }
  }, [])

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setPreviewImages(
        uploadedFiles.map((u) => {
          return {
            src: u.fetched ? u.url : URL.createObjectURL(u),
            poster: u.fetched ? u.poster : null,
          }
        })
      )
    }
  }, [uploadedFiles])
  /*eslint-enable */

  const removeDefaultBehaviors = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDragAction = (e) => {
    removeDefaultBehaviors(e)
  }

  const handleDragInAction = (e) => {
    removeDefaultBehaviors(e)

    const { items } = e.dataTransfer
    setDragCounter(dragCounter + 1)

    if (items && items.length > 0) {
      setDragging(true)
    }
  }

  const handleDragOutAction = (e) => {
    removeDefaultBehaviors(e)

    setDragCounter(dragCounter - 1)
    if (!dragCounter) {
      setDragging(false)
    }
  }

  const validateFile = (files: any) => {
    let isValid = true
    if (fileType === FileType.IMAGE) {
      if (!isImage(files[0])) {
        alert('Please upload valid JPG/JPEG or PNG image')
        if (inputRef) inputRef.current.value = ''
        isValid = false
      } else {
        if (!isValidImageSize(files[0])) {
          alert('Image size must be <= 2MB')
          if (inputRef) inputRef.current.value = ''
          isValid = false
        }
      }
    } else {
      if (!isVideo(files[0])) {
        alert('Please upload valid MP4/OGG or WEBM video')
        if (inputRef) inputRef.current.value = ''
        isValid = false
      }
    }
    return isValid
  }

  const handleDropAction = (e) => {
    removeDefaultBehaviors(e)

    const { files } = e.dataTransfer
    setDragging(false)
    if (files && files.length > 0) {
      if (validateFile(files)) {
        handleDrop(files)
        e.dataTransfer.clearData(0)
        setDragCounter(0)
      }
    }
  }

  const handleUploadFiles = (e) => {
    // removeDefaultBehaviors(e);

    const { files } = e.target
    if (files && files.length > 0) {
      if (validateFile(files)) {
        handleDrop(files)
      }
    }
  }

  const triggerUpload = (e, disable = false) => {
    e.preventDefault()
    if (!disable && !disabled) inputRef.current.click()
  }

  const handlepPlayPauseVideo = () => {
    if (videoRef && videoRef.current) {
      setPlaying(!playing)
      if (playing) videoRef.current.play()
      else videoRef.current.pause()
    }
  }

  return (
    <>
      <div
        className={`ecm-file-uploader ecm-error-message__container ${(props || {}).className} ${
          disabled ? 'disabled' : ''
        }`}
      >
        <input
          type="file"
          name={name}
          ref={(ref) => {
            inputRef.current = ref
          }}
          onChange={handleUploadFiles}
          multiple={multiple}
        />
        <div className={`ecm-file-uploader__wrapper ${dragging ? 'dragging' : ''}`} ref={dropRef}>
          {uploadedFiles && uploadedFiles.length > 0 && (
            <div className="ecm-file-uploader__list flex items-center flex-wrap">
              {uploadedFiles.map((image, imageIndex) => (
                <div
                  className="ecm-file-uploader__list-item"
                  onClick={(e: any) => {
                    if (!multiple) {
                      triggerUpload(e)
                    }
                  }}
                  key={imageIndex}
                  style={{
                    backgroundImage: previewImages[imageIndex] ? `url(${previewImages[imageIndex].src})` : 'none',
                  }}
                >
                  {multiple ? (
                    <DeleteIcon onClick={() => handleRemove(image)} />
                  ) : (
                    <div className="custom-btn flex items-center justify-center w-full">{children}</div>
                  )}
                  {fileType === FileType.VIDEO && (
                    <div className="video-player">
                      <video
                        ref={videoRef}
                        src={previewImages[imageIndex] ? previewImages[imageIndex].src : null}
                        poster={previewImages[imageIndex] ? previewImages[imageIndex].poster : null}
                      />
                      <span className={playing ? 'play' : 'pause'} onClick={handlepPlayPauseVideo} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <div className="ecm-file-uploader__zones flex items-center flex-wrap">
            {Array(maxFiles)
              .fill(0)
              .map((_, index: number): JSX.Element => {
                const noOfFiles = (uploadedFiles || []).length
                return (
                  <div
                    key={index}
                    className={`ecm-file-uploader__zone ${dragging ? 'dragging' : ''} ${
                      index > noOfFiles ? 'default' : ''
                    } flex items-center justify-center`}
                    onClick={(e) => triggerUpload(e, index > noOfFiles)}
                  >
                    <PlusIcon />
                  </div>
                )
              })}
          </div>
        </div>
        {(props || {}).errorMessage && <p className="ecm-error-message">{props.errorMessage}</p>}
      </div>
      <style jsx global>{`
        .ecm-file-uploader {
          position: relative;
          margin-top: -15px;
        }

        .ecm-file-uploader > input {
          position: absolute;
          z-index: -1;
          opacity: 0;
          visibility: hidden;
        }

        .ecm-file-uploader__list {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          width: 100%;
          pointer-events: none;
        }

        .ecm-file-uploader__wrapper.dragging .ecm-file-uploader__list-item,
        .ecm-file-uploader__wrapper.dragging .ecm-file-uploader__zone:not(.default) {
          border: 3px dashed var(--primary-color);
        }

        .ecm-file-uploader__list-item,
        .ecm-file-uploader__zone {
          pointer-events: initial;
          width: calc(100% / 2 - 15px);
          margin-right: 15px;
          border-radius: 5px;
          height: 76px;
          overflow: hidden;
          margin-top: 15px;
          cursor: pointer;
          transition: all var(--animation-duration) ease-in-out;
        }

        .ecm-file-uploader.disabled .ecm-file-uploader__list-item,
        .ecm-file-uploader.disabled .ecm-file-uploader__zone {
          cursor: default;
        }

        .ecm-file-uploader__list-item:nth-child(2n),
        .ecm-file-uploader__zone:nth-child(2n) {
          margin-right: 0;
        }

        .ecm-file-uploader__zone:hover {
          opacity: 0.5;
        }

        .ecm-file-uploader__list-item {
          position: relative;
          background-size: contain;
          background-position: center center;
          background-repeat: no-repeat;
          background-color: var(--white);
          box-shadow: 0 0 10px var(--header-shadow);
        }

        .ecm-file-uploader__list-item {
          position: relative;
        }

        .ecm-file-uploader__list-item:after {
          position: absolute;
          top: 0;
          left: 0;
          content: '';
          width: 100%;
          height: 100%;
          background-color: var(--base-text);
          opacity: 0;
          pointer-events: none;
          visibility: hidden;
          transition: all var(--animation-duration) ease-in-out;
        }

        .ecm-file-uploader__list-item > svg,
        .ecm-file-uploader__list-item .custom-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition: all var(--animation-duration) ease-in-out;
        }

        .ecm-file-uploader:hover .ecm-file-uploader__list-item > svg,
        .ecm-file-uploader:hover .ecm-file-uploader__list-item .custom-btn {
          pointer-events: initial;
          visibility: visible;
          opacity: 1;
        }

        .ecm-file-uploader__list-item svg * {
          fill: var(--white);
        }

        .ecm-file-uploader__wrapper.dragging .ecm-file-uploader__list-item:after,
        .ecm-file-uploader:hover .ecm-file-uploader__list-item:after {
          pointer-events: initial;
          visibility: visible;
          opacity: 0.5;
        }

        .ecm-file-uploader__zones {
        }

        .ecm-file-uploader__zone {
          background-color: var(--upload-zone-background);
          border: 1px dashed var(--upload-zone-background);
        }

        .ecm-file-uploader__zone svg {
          width: 20px;
          height: 20px;
        }

        .ecm-file-uploader__zones .default {
          background-color: var(--white);
          pointer-events: none;
        }

        .ecm-file-uploader__zones .default svg {
          display: none;
        }

        .ecm-file-uploader .video-player span {
          position: absolute;
          width: 85px;
          height: 55px;
          border-radius: 10px;
          background: var(--white-50);
          display: inline-block;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          transition: all var(--animation-duration);
        }

        .ecm-file-uploader .video-player span:after,
        .ecm-file-uploader .video-player span.pause:before {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          content: '';
          border: 10px solid transparent;
          border-left-color: var(--white);
          margin-left: 5px;
        }

        .ecm-file-uploader .video-player span.pause {
          opacity: 0;
        }

        .ecm-file-uploader .video-player span.pause:before {
          margin-left: -5px;
        }

        .ecm-file-uploader .video-player span.pause:before,
        .ecm-file-uploader .video-player span.pause:after {
          border: 0;
          width: 5px;
          height: 15px;
          background: var(--white);
        }

        .ecm-file-uploader.disabled .ecm-file-uploader__list-item .custom-btn,
        .ecm-file-uploader.disabled .ecm-file-uploader__list-item:after {
          display: none;
        }

        .ecm-file-uploader.disabled:hover .video-player span {
          opacity: 0.8;
        }

        @media (min-width: 768px) {
          .ecm-file-uploader__list-item,
          .ecm-file-uploader__zone {
            width: calc(100% / 3 - 10px);
            height: 100px;
          }

          .ecm-file-uploader__list-item:nth-child(2n),
          .ecm-file-uploader__zone:nth-child(2n) {
            margin-right: 15px !important;
          }

          .ecm-file-uploader__list-item:nth-child(3n),
          .ecm-file-uploader__zone:nth-child(3n) {
            margin-right: 0 !important;
          }
        }

        @media (min-width: 1024px) {
          .ecm-file-uploader__list-item,
          .ecm-file-uploader__zone {
            width: calc(100% / 5 - 20px);
            margin-right: 25px;
          }

          .ecm-file-uploader__list-item:nth-child(2n),
          .ecm-file-uploader__zone:nth-child(2n) {
            margin-right: 25px !important;
          }

          .ecm-file-uploader__list-item:nth-child(3n),
          .ecm-file-uploader__zone:nth-child(3n) {
            margin-right: 25px !important;
          }

          .ecm-file-uploader__list-item:nth-child(5n),
          .ecm-file-uploader__zone:nth-child(5n) {
            margin-right: 0 !important;
          }
        }
      `}</style>
    </>
  )
}
