import './game.scss'

function Game() {
  return (
    <div className="bg-container">
      <div className="layer layer-04"><div className='bg bg-04'></div></div>
      <div className="layer layer-03"><div className='bg bg-03'></div></div>
      <div className="layer layer-02"><div className='bg bg-02'></div></div>
      <div className="layer layer-01"><div className='bg bg-01'></div></div>
      <div className='street'></div>
    </div>
  )
}

export default Game