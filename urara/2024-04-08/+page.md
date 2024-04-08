---
title: 'Learning Golang Part 1'
alt: 'Learning Golang Part 1'
created: 04-08-2024
updated: 04-08-2024
published: 04-08-2024
tags:
  - 'Blog'
  - 'Tech'
---

## Getting Started

A few days ago I decided to pick up a new programming language.  For a while I've been a predominantly Python dev, with scatterings of C, Javascript, HTML, and CSS depending on the project at hand.  Seeing as Golang has been become fairly popular in the DevOps realm, I decided it'd be worth while to pick it up.

Getting started wasn't too bad, I made sure Go was installed, opened up my favorite editor and started getting to work.  I decided my first project would be a simple program to take in the XKCD API, and post the latest comic to a discord webhook.

Please note that this just a braindump of my experience creating this project with Golang, so if I'm not 100% on best practices, or paradimes I apologize in advance!

## Go-XKCD

The XKCD API only returns a few items:
```JSON
Sample Return

{
  "month": "4", 
  "num": 2916, 
  "link": "", 
  "year": "2024", 
  "news": "...trimmed...",
  "safe_title": "Machine", 
  "transcript": "", 
  "alt": "The Credible Machine"
  "img": "https://imgs.xkcd.com/comics/machine.png", 
  "title": "Machine", 
  "extra_parts": 
  {
    "headerextra": "", "pre": "", 
    "post": "\n  <script src=\"//xkcd.com/2916/client/index.js\"></script>\n", 
    "imgAttr": ""
  }, 
  "day": "5"
}
```
In-order to craft our webhook with the comic we only really need a couple items:
- `title`
- `img`
- `alt` (this one is kind-of optional in my use case)

Since I know the keys and types from the API, I can easily create a `Struct` to hold the data I need.

```Go
// Basic struct for grabbing only the items we want from the json
type Comic struct {
    Title string
    Alt string
    Img string
}
```
With this I was able to use `json.Unmarshal` to decode the json from XKCD into a struct, the resulting output was:
```
{Machine The Credible Machine https://imgs.xkcd.com/comics/machine.png}
```
Now that I had the required elements from the input, I could move onto crafting my response.  This led me down looking into how maps and `interface{}` worked.

Here is an example JSON we want to create:
```JSON
{
    "content": "Daily XKCD",
    "embeds": [
        {
            "title": "Machine",
            "image": {
                "url": "https://imgs.xkcd.com/comics/machine.png"
            }
        }
    ]
}
```
Since I am coming in from Python, I immediately thought about how I would do it in Python, as a result I essentially wrote Pythonic Golang.  Instead of treating JSON objects as actual objects, I instead looked at it all as key->value pairings.  Meaning in Python I would've crafted my embed array, and added that to my final payload dictionary as a value for the `image` key.

A few takeaways from that:
- `interface{}` is good for working on arbitrary types.
- If you know the exact keys and types you should create a Struct


So I ended up writing Pythonic Go code? If that's a phrase.  
The code below does three things:
1. We create the imageURL map, to map the `url` key to the actual `image_url`.
2. We then create an array containing the `title` and `image: imageURL`
3. We append this array to our `mapSlice` variable, to create the final embeds map.
```Go
type M map[string]interface{}

func create_embed(comic Comic) []M {

    var mapSlice []M

    imageUrl := map[string]string{"url": comic.Img}
    image := M{"title": comic.Title, "image": imageUrl}
   
    mapSlice = append(mapSlice, image)

    return(mapSlice)

}
```

At the end you essentially get something that looks like this:
```
{"image":{"url":"https://imgs.xkcd.com/comics/machine.png"}, "title":"Machine"}
```
Now, someone more experinced than me pointed out I shouldn't use `interface{}` in this case.  The better method would have been to create an `Embed` struct and `Image` struct, as these are two JSON _objects_.  
I intend to go back and make those changes but I wanted to stick with what I did/figured out in my first few days.

Now that we have our embed array ready we move on to the final payload.  For this payload I created a struct:
```Go
type DiscWebhook struct {
    Content string `json:"content"`
    Embeds  []M    `json:"embeds"`
}
```
I made use of the tags to make sure when the JSON was formed we 
1. Exposed the `Content` and `Embeds` fields to Go, so we could set the values correctly.
2. When encoding the JSON our objects where named `content` and `embeds`.

My understanding of tags is they provide additional information about the field.  Specifically with JSON it determines the JSON object we're talking about.

Crafting the remaing response was fairly straightforward.  I simply instantiate the `DiscWebhook` struct, and then pass in the values
```Go
discordData := DiscWebhook{
        Content: "Daily XKCD", 
        Embeds: embeds,
    }
```
Using the `json.Marshal` function, I was able to pass my struct in, and form the payload for our post request.
```Go
  jsonData, err := json.Marshal(discordData)
  if err != nil {
      panic(err)
  }

  resp, err := http.Post("<discord_webhook>",
      "application/json",
      bytes.NewBuffer(jsonData))
  if err != nil {
        panic(err)
    }
```

The result was a nice Discord post with todays XKCD image!

## Future Plans

I do want to improve on this more, firstly by fixing the use of `interfaces{}` and instead using Structs for forming the end JSON.

I also want to try an integrate this into a discord bot down the line and have it automatically post a daily XKCD comic, either the latest or just a random one.

You can view the code on my Github: [Go-XKCD](https://github.com/IAmEyad/go-xkcd).
