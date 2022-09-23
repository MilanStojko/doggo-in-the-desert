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
            classCss={'primary'}
          />
          <Button
            label={'Rank'}
            callBackClick={goToLeaderboard}
            classCss={'secondary'}
          />
        </div>

        <Button
          label={'Logout'}
          callBackClick={goToHome}
          classCss={'tertiary'}
        />
      </section>

      <section className="section-cat">
        <img className="cat-game-over" src={require("../../assets/images/cat-game-over.png")} alt="cat" />
      </section>

    </div>
  )
}

export default Result