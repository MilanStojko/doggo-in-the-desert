import responsive from "../events/responsive";
import cactus from "../assets/images/cactus.png";
import rock from "../assets/images/rock.png";
import bone from "../assets/images/bone.png";
import steak from "../assets/images/steak.png";
import cat from "../assets/images/cat.png";
import cookie from "../assets/images/cookie.png";
import bruxellessprout from "../assets/images/bruxellessprout.png";

let getResponsive = responsive.handleResponsive();

const elements = [
  {
    img: rock,
    width: 65 * getResponsive,
    height: 50 * getResponsive,
    score: 0,
    obastacle: true,
    position: 0 * getResponsive,
  },
  {
    img: cactus,
    width: 65 * getResponsive,
    height: 80 * getResponsive,
    score: 0,
    obastacle: true,
    position: 0 * getResponsive,
  },
  {
    img: cat,
    width: 50 * getResponsive,
    height: 100 * getResponsive,
    score: 0,
    obastacle: true,
    position: 0 * getResponsive,
  },
  {
    img: bone,
    width: 40 * getResponsive,
    height: 40 * getResponsive,
    score: 1,
    obastacle: false,
    position: 80 * getResponsive,
  },
  {
    img: steak,
    width: 60 * getResponsive,
    height: 40 * getResponsive,
    score: 3,
    obastacle: false,
    position: 130 * getResponsive,
  },
  {
    img: cookie,
    width: 40 * getResponsive,
    height: 40 * getResponsive,
    score: 2,
    obastacle: false,
    position: 105 * getResponsive,
  },
  {
    img: bruxellessprout,
    width: 40 * getResponsive,
    height: 40 * getResponsive,
    score: -1,
    obastacle: false,
    position: 105 * getResponsive,
  },
];
export default elements;
