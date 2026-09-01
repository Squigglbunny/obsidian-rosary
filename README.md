# Obsidian Rosary
> _“Continue to pray the Rosary every day.”_
> Our Lady of Fatima to Sr. Lucia dos Santos
Opens today's Rosary in Obsidian. 
## Description
In recent times the Mother of God has appeared in various parts of the world and asked for the recitation of the Rosary. 
This plugin adds a sidebar and a shortcut to open today's Rosary, depending on the day of the week. By default, it uses the recitation of the Rosary suggested by Pope Saint John Paul II: the **JOYFUL** mysteries on Monday and Saturday, the **LUMINOUS** on Thursday, the **SORROWFUL** on Tuesday and Friday, and the **GLORIOUS** on Wednesday and Sunday (with the exceptions of  Sundays of Advent and Christmas – the **JOYFUL**; Sundays of Lent – the **SORROWFUL**).
## Usage
This plugin takes a path (eg. `/Rosary/Mysteries`) which can be configured in settings. Within that path it expects files titled `The Glorious Mysteries`, `The Joyful Mysteries`, `The Sorrowful Mysteries`, and `The Luminous Mysteries` respectively. When clicking on on the icon on the sidebar (or using the shortcut), the mystery of the day will be opened. [Starter files](https://github.com/Squigglbunny/obsidian-rosary/tree/master/rosary-example) are available on the github. They include images (hand-picked by me! on the larger size though - feel free to pick your own!) passage of scripture , and a fill-in-the blank for your own points of reflection (many websites exist with their own points of reflection - rosarycenter.org has a some nice options)
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
The Rosary is a twofold prayer - it is both vocal and mental. While the lips pronounce the words of the Hail Mary (vocal prayer), the mind should reflect (mental prayer) on the mystery of the Rosary that has been announced.
### The Mysteries (Wikipedia)
The Mysteries of the Rosary are meditations on episodes in the life and death of Jesus from the Annunciation to the Ascension and beyond. These are traditionally grouped by fives into themed sets known as the _Joyful_ (or _Joyous_) _Mysteries_, the _Sorrowful Mysteries_, and the _Glorious Mysteries_. Pope John Paul II recommended an additional set called the _Luminous Mysteries_ (or the "Mysteries of Light") in his apostolic letter *Rosarium Virginis Mariae* in October 2002.
##### Joyful Mysteries
1. [The Annunciation](https://en.wikipedia.org/wiki/Annunciation "Annunciation"). Fruit of the Mystery: Humility.
2. [The Visitation](https://en.wikipedia.org/wiki/Visitation_\(Christianity\) "Visitation (Christianity)"). Fruit of the Mystery: Love of Neighbor.
3. [The Birth of Jesus](https://en.wikipedia.org/wiki/Nativity_of_Jesus "Nativity of Jesus"). Fruit of the Mystery: Poverty, Detachment from the things of the world, Contempt of Riches, Love of the Poor.
4. [The Presentation of Jesus at the Temple](https://en.wikipedia.org/wiki/Presentation_of_Jesus_at_the_Temple "Presentation of Jesus at the Temple"). Fruit of the Mystery: Gift of Wisdom and Purity of mind and body (Obedience).
5. [The Finding of Jesus in the Temple](https://en.wikipedia.org/wiki/Finding_in_the_Temple "Finding in the Temple"). Fruit of the Mystery: True Conversion (Piety, Joy of Finding Jesus).
##### Luminous Mysteries
1. [The Baptism of Jesus in the Jordan](https://en.wikipedia.org/wiki/Baptism_of_Jesus_in_the_Jordan "Baptism of Jesus in the Jordan"). Fruit of the Mystery: Openness to the Holy Spirit, the Healer.
2. [The Wedding at Cana](https://en.wikipedia.org/wiki/Marriage_at_Cana "Marriage at Cana"). Fruit of the Mystery: To Jesus through Mary, Understanding of the ability to manifest-through faith.
3. [Jesus' Proclamation of the Kingdom of God](https://en.wikipedia.org/wiki/Kingdom_of_God "Kingdom of God"). Fruit of the Mystery: Trust in God (Call of Conversion to God).
4. [The Transfiguration](https://en.wikipedia.org/wiki/Transfiguration_of_Jesus "Transfiguration of Jesus"). Fruit of the Mystery: Desire for Holiness.
5. [The Institution of the Eucharist](https://en.wikipedia.org/wiki/Last_Supper "Last Supper"). Fruit of the Mystery: Adoration.
##### Sorrowful Mysteries
1. [The Agony in the Garden](https://en.wikipedia.org/wiki/Agony_in_the_Garden "Agony in the Garden"). Fruit of the Mystery: Sorrow for Sin, Uniformity with the Will of God.
2. [The Scourging at the Pillar](https://en.wikipedia.org/wiki/Flagellation_of_Christ "Flagellation of Christ"). Fruit of the Mystery: Mortification (Purity).
3. [The Crowning with Thorns](https://en.wikipedia.org/wiki/Crown_of_Thorns "Crown of Thorns"). Fruit of the Mystery: Contempt of the World (Moral Courage).
4. [The Carrying of the Cross](https://en.wikipedia.org/wiki/Christ_Carrying_the_Cross "Christ Carrying the Cross"). Fruit of the Mystery: Patience.
5. [The Crucifixion and Death of our Lord](https://en.wikipedia.org/wiki/Crucifixion_of_Jesus "Crucifixion of Jesus"). Fruit of the Mystery: Perseverance in Faith, Grace for a Holy Death, Forgiveness.
##### Glorious Mysteries
1. [The Resurrection](https://en.wikipedia.org/wiki/Resurrection_of_Jesus "Resurrection of Jesus"). Fruit of the Mystery: Faith.
2. [The Ascension](https://en.wikipedia.org/wiki/Ascension_of_Jesus "Ascension of Jesus"). Fruit of the Mystery: Hope, Desire to Ascend to Heaven.
3. [The Descent of the Holy Spirit](https://en.wikipedia.org/wiki/Pentecost "Pentecost"). Fruit of the Mystery: Love of God, Holy Wisdom to know the truth and share it with everyone, Divine Charity, Worship of the Holy Spirit.
4. [The Assumption of Mary](https://en.wikipedia.org/wiki/Assumption_of_Mary "Assumption of Mary"). Fruit of the Mystery: Union with Mary and True Devotion to Mary.
5. [The Coronation of the Virgin](https://en.wikipedia.org/wiki/Coronation_of_the_Virgin "Coronation of the Virgin"). Fruit of the Mystery: Perseverance and an Increase in Virtue (Trust in Mary's Intercession).
## Feedback
[Feedback and feature requests](https://github.com/Squigglbunny/obsidian-rosary/discussions) much appreciated!
## Disclaimer
Claude helped in the making of this plugin.