import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Button from '../../components/ui/button/Button'
import InputBox from "../../components/ui/inputBox/InputBox"
import SCREENS from '../../route/router'

import './login.scss'

function Login() {
  const [state, setState] = useState({
    player: {
      username: '',
      password: ''
    },
    alertActive: false

  })
  let playersList = []
  let navigate = useNavigate()

  function getUsername(e){
    state.player.username = e.target.value
  }
  function getPassword(e){
    state.player.password = e.target.value
  }

  function goToTutorial(){
    
  }

  function submit(){
    playersList.push(JSON.parse(localStorage.getItem('player')))
    console.log(playersList)
    playersList.map((element) => {
      if(element.username === state.player.username && element.password === state.player.password){
        navigate(SCREENS.tutorial)
      } else{
        setState({
          ...state,
          alertActive: true
        })
        console.log('user sbagliato')
      }
    })
    console.log(playersList)
    localStorage.setItem('player', JSON.stringify(state.player))
    
  }

  return (
    <div className="login">
      <form>
        <InputBox 
          placeholder={"username"}
          callBackChange={getUsername}
        />
        <InputBox
          type={"password"}
          placeholder={"password"}
          callBackChange={getPassword}
        />

        {
          state.alertActive &&
          <div className="alertActive">Username or Password wrong</div>
        }

        <Button callBackClick={submit} classCss={state.alertActive} />
      </form>
    </div>
  )
}

export default Login
