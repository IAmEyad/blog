export type Project = {
    id: string
    name: string
    tags?: string[]
    feature?: string
    description?: string
    img: string
    link?: string
  }
  
  export const projects: Project[] = [
    {
      id: 'big-milk-man',
      name: 'Big Milk Man',
      tags: ['GameDev', 'Godot'],
      description:
        "Incomplete shoot-em up where you play a Big Milk Man.",
      feature: 'Godot',
      img:'https://godotengine.org/assets/share-image.webp',
      link: 'https://github.com/IAmEyad/milk_man'
    },
  ]