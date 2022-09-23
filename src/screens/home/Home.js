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
    document.addEventListener('click', goToLogin)
    return() =>{
      document.removeEventListener('keydown', goToLogin)
      document.removeEventListener('click', goToLogin)
    }
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
      <div className="cover-container">
        <div></div>
        <img className="cover" src={require('../../assets/images/cover-home.png')} alt="" />
        <p className="credits">Developed by<br/>Milan Stojkovic &<br/>Isabella Bagnulo</p>
      </div>

    </div>
  )
}

export default Home
