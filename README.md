# Daily Rosary
> _“Continue to pray the Rosary every day.”_
> Our Lady of Fatima to Sr. Lucia dos Santos

Opens today's Rosary in Obsidian. 
## Description
This plugin adds a sidebar and a shortcut to open today's Rosary, depending on the day of the week. By default, it uses the recitation of the Rosary suggested by Pope Saint John Paul II: the **JOYFUL** mysteries on Monday and Saturday, the **LUMINOUS** on Thursday, the **SORROWFUL** on Tuesday and Friday, and the **GLORIOUS** on Wednesday and Sunday (with the exceptions of  Sundays of Advent and Christmas – the **JOYFUL**; Sundays of Lent – the **SORROWFUL**).
## Usage
This plugin takes a path (eg. `Rosary/Mysteries`) which can be configured in settings. Within that path it expects notes titled `The Glorious Mysteries`, `The Joyful Mysteries`, `The Sorrowful Mysteries`, and `The Luminous Mysteries` respectively. When clicking on on the icon on the sidebar (or using the shortcut), the mystery of the day will be opened. You can download some files from the github to get you started ([folder](https://github.com/Squigglbunny/obsidian-rosary/tree/master/rosary-example), or [.zip](https://github.com/Squigglbunny/obsidian-rosary/blob/master/rosary-example.zip) for fast download). They include images (hand-picked by me! on the larger size though - feel free to pick your own) passage of scripture , and a fill-in-the blank for your own points of reflection. Many websites exist with their own points of reflection - explore and find what works best for you. I'll be working on a default set as well.
### Manual Installation
Here's how you can install manually:
1. Download the `main.js`, `styles.css` and `manifest.json`.
2. Go to the `/.obsidian/plugins` folder of your Obsidian vault. Create a folder named `/obsidian-rosary` there.
3. Put the downloaded files into the `/obsidian-rosary` folder.
4. Restart Obsidian.
### Plugin Settings
#### Mysteries Folder
Points to the folders where your mystery files are contained. 
#### Thursday Mystery
Option to pray the Luminous Mysteries, [added by St. John Paul II](https://www.ewtnnews.com/vatican/the-reasons-st-john-paul-ii-gave-for-adding-the-luminous-mysteries-to-the-rosary), or the Joyful Mysteries. 
#### Sunday Mystery
Option to follow the liturgical calendar (Advent/Christmas → Joyful, Lent → Sorrowful, otherwise → Glorious) or to set it manually.
## Known Issues
- Setting Rosary path can be finnicky - typing the path helps.
## Info on the Rosary
The Rosary is a twofold prayer - it is both vocal and mental. While the lips pronounce the words of the Hail Mary, the mind should reflect on the mystery of the Rosary that has been announced.
### The Mysteries
The Mysteries of the Rosary are meditations on episodes in the life and death of Jesus from the Annunciation to the Ascension and beyond. These are traditionally grouped by fives into themed sets known as the _Joyful_ (or _Joyous_) _Mysteries_, the _Sorrowful Mysteries_, and the _Glorious Mysteries_. Pope John Paul II recommended an additional set - the _Luminous Mysteries_ (or the "Mysteries of Light") - in his apostolic letter *Rosarium Virginis Mariae* in October 2002.
## Feedback
[Feedback and feature requests](https://github.com/Squigglbunny/obsidian-rosary/discussions) much appreciated!
## Disclaimer
Claude helped in the making of this plugin.