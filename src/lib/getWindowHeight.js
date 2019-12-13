// extracted into a separate module so it's easier to mock with Jest
function getWindowHeight() {
  return (
    (document &&
      document.documentElement &&
      document.documentElement.clientHeight) ||
    window.innerHeight
  );
}

export default getWindowHeight;
