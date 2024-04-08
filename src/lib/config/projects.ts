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
    {
      id: "Go-XKCD",
      name: 'Go XKCD',
      tags: ['Golang', 'SoftwareDev'],
      description:
        "Program to post the newest XKCD comic to discord via webhooks.",
      feature: 'Golang',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9sg41iWe1oEKwR2UXXNv-W8bshhb5ShKcSnMBe3J0aA&s',
      link: 'https://github.com/IAmEyad/go-xkcd'
    }
  ]