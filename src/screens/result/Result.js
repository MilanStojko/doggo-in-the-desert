import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"

import SCREENS from "../../route/router"
import Button from "../../components/ui/button/Button"

import './result.scss'

function Result() {
  const [state, setState] = useState({
    score: 5
  })
  let navigate = useNavigate()
  const location = useLocation()

  function goToHome(){
    navigate(SCREENS.home)
  }

  function goToGame(){
    navigate(SCREENS.game)
  }

  function goToLeaderboard(){
    navigate(SCREENS.leaderboard)
  }

  return(
    <div className="result">
      
      <section>
        <h1>Game over</h1>
        <p>Hai totalizzato <span className="yellow-marker">{location?.state?.score}</span> punti</p>
        <div className="button-container">
          <Button
            label={'Restart'}
            callBackClick={goToGame}
            objCss={{
              backgroundColor: '#ffcd4f',
              color: '#000',
              border: '1px #ffcd4f solid',
              fontSize: '16px',
              padding: '10px 20px',
              borderRadius: '3px',
              margin: '0 5px'
            }}
          />
          <Button
            label={'Rank'}
            callBackClick={goToLeaderboard}
            objCss={{
              backgroundColor: 'transparent',
              color: '#fff',
              border: '1px #ffcd4f solid',
              fontSize: '16px',
              padding: '10px 20px',
              borderRadius: '3px',
              margin: '0 5px'
            }}
          />
        </div>

        <Button
          label={'Logout'}
          objCss={{
            backgroundColor: 'transparent',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.7)',
            marginTop: '0'
          }}
          callBackClick={goToHome}
        />
      </section>

      <section className="section-cat">
        <img className="cat-game-over" src={require("../../assets/images/cat-game-over.png")} alt="cat" />
      </section>

    </div>
  )
}

export default Result