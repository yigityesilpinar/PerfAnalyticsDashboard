import React from 'react'

interface Props {
  className?: string
}

const Refresh: React.FC<Props> = ({ ...restProps }) => (
  <svg viewBox="0 0 24 24" {...restProps}>
    <path d="M21.91,4.09a1,1,0,0,0-1.07.16L19.48,5.46A9.81,9.81,0,0,0,12,2a10,10,0,1,0,9.42,13.33,1,1,0,0,0-1.89-.66A8,8,0,1,1,12,4a7.86,7.86,0,0,1,6,2.78L16.34,8.25a1,1,0,0,0-.27,1.11A1,1,0,0,0,17,10h4.5a1,1,0,0,0,1-1V5A1,1,0,0,0,21.91,4.09Z" />
  </svg>
)

export default Refresh
