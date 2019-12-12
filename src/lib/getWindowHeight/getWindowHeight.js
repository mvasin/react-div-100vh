function getWindowHeight() {
  if (typeof document === 'undefined' && typeof window === 'undefined') {
    return 0;
  }

  return (document && document.documentElement && document.documentElement.clientHeight) || window.innerHeight;
}

export default getWindowHeight;
