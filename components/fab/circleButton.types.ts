export interface CircleButtonProps {
  name: string
  size: 'sm' | 'md' | 'lg'
  image?: string
  text?: string
  transparent?: boolean
  onClick?: () => void
}
