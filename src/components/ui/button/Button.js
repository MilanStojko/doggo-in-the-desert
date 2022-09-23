import PropTypes from "prop-types"

import './button.scss'

function Button(props) {

  function press(e) {
    if (!!props.callBackClick) {
      props.callBackClick(e)
    }
  }

  return (
    <div 
      className={`btn ${(props.classCss)}`} 
      style={props.objCss} 
      onClick={press}
    >
      {props.label}
    </div>
  )
}

Button.propTypes = {
  classCss: PropTypes.string,
  label: PropTypes.string.isRequired,
  callBackClick: PropTypes.func,
  objCss: PropTypes.object
}

Button.defaultProps = {
  label: "play",
  classCss:'',
}

export default Button