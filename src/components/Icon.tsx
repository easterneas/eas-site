import { icons } from 'lucide-react';
import type { FunctionalComponent } from "preact";

const Icon: FunctionalComponent<{ name: keyof typeof icons, color?: string, size?: number }> = ({name, color, size}) => {
  if(!name) return <></>
  if(!Object.keys(icons).includes(name)) throw new Error('Invalid name value. Make sure the name prop value refers to one of `lucide-react` icons reference.')

  const LucideIcon = icons[name as keyof typeof icons]

  return <LucideIcon {...{color, size}} />
}

export default Icon