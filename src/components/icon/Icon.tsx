import Image from "next/image"

interface IconProps {
  icon: keyof typeof iconRegistry,
  size?: keyof typeof sizes
  alt?: string
}
export const Icon = ({ icon, size = 'normal', alt = "icon" }: IconProps) => {

  return (
    <Image src={iconRegistry[icon]} alt={alt} width={`${sizes[size]}`} height={`${sizes[size]}`} />
  )

}

const sizes = {
  xxxs: 4,
  xxs: 8,
  xs: 10,
  small: 12,
  normal: 16,
  medium: 20,
  large: 24,

}

const iconRegistry = {
  eyeSlash: '/eye-slash.1.png',
  projectRegular: '/project-regular.png',
  logo: '/logo.png',
  sun: '/sun.png',
  darkTheme: '/darkTheme.png',
  kanbanLight: '/kanban-ligh.png',
  kanbanDark: '/kanban-dark.png',
  eye: '/eye.png',
  options: '/options.png',
}
