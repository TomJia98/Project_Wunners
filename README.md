# Project_Wunners

## TuneSplice

## \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

<!-- Motivaion -->

Being given free reign to create essentially any application desired abiding to a few requirements, we first browsed through the supplied list of APIs to both figure out their abilties, and how each might work with another API. From this, we summised ideas on useful, clever and/or fun application ideas before arriving at two APIs: MusiXMatch and WordsAPI.
After reading through the documentation we decided to create a game where the application wpuld use the MusixMatch API and Javascript to pick a random popular song's lyrics, and use the WordsAPI to alter a portion of the words in the lyrics to synonyms of said words, after which it is the users' job to guess the song. The user would then be redirected to a high-score page where their time taken would be saved to their browser using localStorage.

<!-- Reason for development -->

## User Story

AS AN individual who is looking to test their knowledge of both popular songs and vocabulary...

I WANT to be able to visit a webpage that updates with the current top charts from which it randomly picks a song and then changes some of its lyrics with synonyms.

SO THAT I can attempt to guess the altered song's title, input it and view my previous high score (time taken).

<!-- What did you learn? -->

## What We Learned

Furthered our knowledge of fetching APIs, using the APIs, and even just using Javascript.
Using Github in a group environment taught us making branches, merge-requests, pull-requests, pulling branches others have made and resolving clashes. Also using the new "Projects" tab on Github made the organisation easier allowing us to quickly and easily communicate which collaborator was working on which task(s) at any given time, and listing tasks that had already been done and those that were yet to be started.

## Why Choose TuneSplice?

The MusiXMatch API constantly updates the top songs, so the application is always fresh.
The altered lyrics are consistently entertaining and humerous, making it more fun to share with friends.

<!-- Challenges you faced -->

## Challenges Faced

Initially have problems formatting for fetching MusiXMatch API (something to do with CORS). It was almost to the point where we contemplated using a different API combination, which would have required us to scrap the application idea completely.
Using javascript to set up the application to automatically clear the high-scores the user had set once they had reached a certain amount; ended up implementing a button to do that task manually at the users' discretion.
The formatting of the alterred lyrics didn't carry over the line-breaks after the WordsAPI ran so we had to come up with a separate plan; we got the js to detect capital letters which were at the beginning of every line, and go to a new line before any detected capitals.

<!-- features you plan to implement in the future -->

## Future Development

- Adding filters so that you can select different genres rather than just the top charts (e.g. just 80s music or no specific artist)
- Global highscores / active multiplayer element
- Not using skeleton CSS; too simplistic, needs a more extensive, flexible CSS framework
- Speeding up the changing of the lyrics
- Making the TuneSplice heading prettier with photoshop

## Screenshots of application

![Mockup image!](assets/images/start-page.png)
![Mockup image!](assets/images/loading-page.png)
![Mockup image!](assets/images/lyric-page.png)
![Mockup image!](assets/images/end-page.png)

## Links to repository and aplication

To view the repository please follow this link:
[Project_Wunners TuneSplice Reopository](https://github.com/TomJia98/Project_Wunners "Spicy Gospel - TuneSplice Repository")
The live application can also be viewed by following this link:
[TuneSplice](https://tomjia98.github.io/Project_Wunners/ "Spicy Gospel - TuneSplice Application")
