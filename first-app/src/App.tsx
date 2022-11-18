import React from 'react'
import Image from 'next/image'
import './App.css'

type ButtonProps = {
  count: number
  clickFunc: () => void
}

type ChangeProfileButtonProps = {
  profileFlag: boolean
  changeProfileFunc: () => void
}

function MyButtonAsc({
  count,
  clickFunc,
}: React.PropsWithChildren<ButtonProps>): JSX.Element {
  return <button onClick={clickFunc}>Click {count} times</button>
}

function MyButtonDesc({
  count,
  clickFunc,
}: React.PropsWithChildren<ButtonProps>): JSX.Element {
  return <button onClick={clickFunc}>Click {count} times desc</button>
}

function App() {
  let initCount = localStorage.getItem('count')

  const [count, setCount] = React.useState(initCount ? parseInt(initCount) : 0)
  const [profileFlag, setProfileFlag] = React.useState(false)

  function handleClick() {
    setCount(count + 1)
    localStorage.setItem('count', (count + 1).toString())
  }

  function handleClickDesc() {
    setCount(count - 1)
    localStorage.setItem('count', (count - 1).toString())
  }

  function changeProfileFunc() {
    setProfileFlag(!profileFlag)
  }

  return (
    <>
      <h1>My first React app</h1>
      <MyButtonAsc count={count} clickFunc={handleClick} />
      <MyButtonAsc count={count} clickFunc={handleClick} />
      <MyButtonDesc count={count} clickFunc={handleClickDesc} />
      <br />
      <ChangeProfileButton
        profileFlag={profileFlag}
        changeProfileFunc={changeProfileFunc}
      >
        {profileFlag ? <Profile1 /> : <Profile2 />}
      </ChangeProfileButton>
    </>
  )
}

const ChangeProfileButton = ({
  profileFlag,
  changeProfileFunc,
  children,
}: React.PropsWithChildren<ChangeProfileButtonProps>): JSX.Element => {
  return (
    <>
      <button onClick={changeProfileFunc}>
        {' '}
        {profileFlag ? 'Profile1' : 'Profile2'}
      </button>
      {children}
    </>
  )
}

const Profile1 = () => {
  return (
    <>
      <Image />
    </>
  )
  return (
    <img
      src='https://dummyimage.com/600x400/1a00ff/00ff6a'
      alt='Katherine Johnson'
      width={100}
      height={100}
    />
  )
}

const Profile2 = () => {
  return (
    <img
      src='https://dummyimage.com/600x400/000/fff'
      alt='Katherine Johnson'
      width={100}
      height={100}
    />
  )
}

export default App
