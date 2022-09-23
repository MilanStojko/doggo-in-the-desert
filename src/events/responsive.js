const responsive = {
  handleResponsive() {
    if (window.innerHeight > 900 && window.innerWidth > 1100) {
      return parseInt(2.5);
    } else if (window.innerHeight > 630 && window.innerWidth > 1100) {
      return parseInt(2);
    } else if (window.innerHeight > 375 && window.innerWidth > 700) {
      return parseInt(1.5);
    } else {
      return parseInt(1);
    }
  },
};
export default responsive;
