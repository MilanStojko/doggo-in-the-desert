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
  let navigate = useNavigate()

  function getUsername(e){
    state.player.username = e.target.value
  }
  function getPassword(e){
    state.player.password = e.target.value
  }

  function submit(){

    let playersList = JSON.parse(localStorage.getItem('players')) || []

    playersList.map((element) => {
      if(element.username === state.player.username && element.password === state.player.password){
        navigate(SCREENS.tutorial)
      } else {
        setState({
          ...state,
          alertActive: true
        })
      }
    })
  }

  function goToSignup(){
    navigate(SCREENS.signup)
  }

  return (
    <div className="login">
      <section>
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

          <Button
            callBackClick={submit}
            label={'login'}
          />
        </form>

        <Button
          label={'or Sign in'}
          objCss={{
            backgroundColor: 'transparent',
            fontSize: '10px',
            color: 'rgba(0,0,0,0.7)',
            marginTop: '0'
          }}
          callBackClick={goToSignup}
        />
      </section>

      <section><img src={require('../../assets/images/sphinx.png')} alt="" /></section>
    </div>
  )
}

export default Login
