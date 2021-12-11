import { ButtonHTMLAttributes } from 'react'

export interface ButtonConfigOverrideProps {}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, ButtonConfigOverrideProps {
  variant?: 'primary'
  text: React.ReactNode
  /**
   * button icon: if type is string iconSrc else JSX.element
   */
  iconSrcOrNode?: React.ReactNode
  isLoading?: boolean
}

export interface StyledButtonProps {
  $isLoading: boolean | undefined
  $hasText: boolean | undefined
}
