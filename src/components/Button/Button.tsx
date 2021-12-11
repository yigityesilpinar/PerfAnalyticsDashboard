import React from 'react'

import { ButtonProps } from './types'
import { StyledButton, LoadingIcon } from './styles'

const Button: React.FC<ButtonProps> = ({
  text,
  iconSrcOrNode,
  isLoading,
  disabled,
  children,
  className,
  ...restProps
}) => (
  <StyledButton
    className={className}
    $hasText={!!text}
    disabled={disabled || isLoading}
    $isLoading={isLoading}
    {...restProps}
  >
    {isLoading && <LoadingIcon />}
    <div className="content">
      {iconSrcOrNode && (
        <div className="icon">{typeof iconSrcOrNode === 'string' ? <img src={iconSrcOrNode} /> : iconSrcOrNode}</div>
      )}
      {text && <span className="text">{text}</span>}
      {children}
    </div>
  </StyledButton>
)

export default Button
