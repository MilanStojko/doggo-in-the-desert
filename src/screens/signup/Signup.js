import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from "../../components/ui/button/Button"
import InputBox from "../../components/ui/inputBox/InputBox"
import SCREENS from "../../route/router"

function Signup() {
  const [state, setState] = useState({
    player: {
      username: '',
      password: '',
      score: 0
    },
    alertActive: false,
    checkPassword: true

  })
  let navigate = useNavigate()

  function reset(){
    setState({
      ...state,
      alertActive: false
    })
  }

  function getUsername(e){
    state.player.username = e.target.value
  }
  function getPassword(e){
    state.player.password = e.target.value
  }
  function checkPassword(e){
    e.target.value === state.player.password
    ? setState({...state, checkPassword: true})
    : setState({...state, checkPassword: false})
  }

  function goToLogin(){
    navigate(SCREENS.login)
  }

  function submit(){
    let playersList = JSON.parse(localStorage.getItem('players')) || []
    let check = false

    playersList.map((element) => {
      if(element.username === state.player.username){
        check = true
        setState({
          ...state,
          alertActive: true,
        })
      }
    })

    if(!check && state.checkPassword){
      playersList.push(state.player)
    }
    localStorage.setItem('players', JSON.stringify(playersList))
  }

  return (
    <div className="signup">

      <section>
        <h1>Signup</h1>

        <form>
          <InputBox
            placeholder={"username"}
            callBackChange={getUsername}
            callBackClick={reset}
            />
          <InputBox
            type={"password"}
            placeholder={"password"}
            callBackChange={getPassword}
            callBackClick={reset}
          />

          <InputBox
            type={"password"}
            placeholder={"confirm password"}
            callBackBlur={checkPassword}
            callBackClick={reset}
          />

          {
            !state.checkPassword &&
            <p className="alertActive">Password must be equal</p>
          }

          {
            state.alertActive &&
            <div className="alertActive">This user already exists</div>
          }

          <Button
            label={'Sign up'}
            callBackClick={submit}
          />
        </form>

        <Button
          label={"or Login"}
          objCss={{
            backgroundColor: "transparent",
            fontSize: "10px",
            color: "rgba(0,0,0,0.7)",
            marginTop: "0",
          }}
          callBackClick={goToLogin}
        />
      </section>

      <section>
        <img src={require("../../assets/images/sphinx.png")} alt="" />
      </section>

    </div>
  )
}
export default Signup
