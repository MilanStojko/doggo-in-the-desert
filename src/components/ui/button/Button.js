import PropTypes from "prop-types"

function Button(props) {

  function press(e) {
    if (!!props.callBack) {
      props.callBackClick(e)
    }
  }

  return (
    <button 
      className={`btn ${(props.classCss)}`} 
      style={props.objCss} 
      onClick={press}
    >
      {props.label}
    </button>
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
  objCss: {
    backgroundColor: '#FFDC3B',
    fontSize: '16px',
    padding: '10px 20px',
    borderRadius: '3px'
  }
}

export default Button