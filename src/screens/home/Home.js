import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import Doggo from "../../components/hook/doggo/Doggo"
import SCREENS from '../../route/router'

import './home.scss'

function Home() {

  let navigate = useNavigate()
  function goToLogin() {
    navigate(SCREENS.login)
  }

  useEffect(() => {
    document.addEventListener('keydown', goToLogin)
  }, [])

  return (
    <div className="home">

      <div className="logo">
        <Doggo />
        <h1>
          Doggo
          <br />
          <span className="fs-small">in the desert</span>
        </h1>
      </div>

      <p className="pulse">Press any button to start game</p>
      <p className="credits">Developed by Milan Stojkovic & Isabella Bagnulo</p>

    </div>
  )
}

export default Home
