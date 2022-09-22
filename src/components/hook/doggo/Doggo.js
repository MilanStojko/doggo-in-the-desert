import "./doggo.scss";

function Doggo(props) {
  return (
    <div className="dog">
      <img
        className="doggo_img"
        src={require("../../../assets/images/spritesheet.png")}
        alt="dog"
      />
    </div>
  );
}
export default Doggo;
