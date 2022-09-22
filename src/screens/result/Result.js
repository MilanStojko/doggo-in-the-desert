import { useState } from "react"
import { useNavigate } from "react-router-dom"

import SCREENS from "../../route/router"
import Button from "../../components/ui/button/Button"

import './result.scss'

function Result() {
  const [state, setState] = useState({
    score: 5
  })
  let navigate = useNavigate()

  function goToGame(){
    navigate(SCREENS.game)
  }

  function goToLeaderboard(){
    navigate(SCREENS.home)
  }

  return(
    <div className="result">

      <section>
        <h1>Game over</h1>
        <p>Hai totalizzato <span className="yellow-marker">{state.score && state.score}</span> punti</p>
        <Button
          label={'Restart'}
          callBackClick={goToGame}
        />
        <Button
          label={'Rank'}
          callBackClick={goToLeaderboard}
          objCss={{
            backgroundColor: 'transparent',
            border: '1px black solid',
            fontSize: '16px',
            padding: '10px 20px',
            borderRadius: '3px',
            marginTop: '10px'
          }}
        />
      </section>

      <section className="section-cat">
        <img className="cat-game-over" src={require("../../assets/images/cat-game-over.png")} alt="cat" />
      </section>

    </div>
  )
}

export default Result