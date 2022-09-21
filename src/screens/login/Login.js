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
      password: '',
      score: 0
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

  function submit(){
    playersList.push(JSON.parse(localStorage.getItem('player')))
    playersList.map((element) => {

      if(element.username === state.player.username && element.password === state.player.password){
        navigate(SCREENS.tutorial)
      } else{
        setState({
          ...state,
          alertActive: true
        })
      }

    }) 
  }

  return (
    <div className="login">
      <div>
        <h1>Login</h1>
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

        <Button
          placeholder={'or Sign in'}
        />
      </div>

      <div><img src={require('../../assets/images/sphinx.png')} alt="" /></div>
    </div>
  )
}

export default Login
