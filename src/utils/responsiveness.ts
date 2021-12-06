export const isTouchScreen = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return 'ontouchstart' in window || 'msMaxTouchPoints' in window.navigator
}
