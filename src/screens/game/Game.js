import './game.scss'

function Game() {

  let viewportHeight = window.innerHeight
  console.log(viewportHeight - 30)

  return (
    <div className="bg-container">
      <div className="layer layer-04"></div>
      <div className="layer layer-03"></div>
      <div className="layer layer-02"></div>
      <div className="layer layer-01"></div>
      <div className='street'></div>
    </div>
  )
}

export default Game