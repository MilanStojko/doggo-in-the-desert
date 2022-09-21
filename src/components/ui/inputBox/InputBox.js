import PropTypes from "prop-types"

import './inputBox.scss'

function InputBox(props) {
  function change(e) {
    if (!!props.callBackChange) {
      props.callBackChange(e)
    }
  }

  function focus(e) {
    if (!!props.callBackFocus) {
      props.callBackFocus(e)
    }
  }

  function blur(e) {
    if (!!props.callBackBlur) {
      props.callBackBlur(e)
    }
  }

  function click(e) {
    if (!!props.callBackClick) {
      props.callBackClick(e)
    }
  }

  return (
    <>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={props.classCss}
        style={props.objCss}
        onChange={change}
        onFocus={focus}
        onBlur={blur}
        onClick={click}
      />
    </>
  )
}

InputBox.propTypes = {
    type: PropTypes.string,
    cssClass: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    callBackChange: PropTypes.func,
    callBackFocus: PropTypes.func,
    callBackBlur: PropTypes.func,
    objCss: PropTypes.object,
}

InputBox.defaultProps = {
    type: "text"
  }  

export default InputBox
