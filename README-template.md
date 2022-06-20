# Frontend Mentor - Interactive comments section solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: If you're building a purely front-end project, use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it. 

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- [Webpack](https://webpack.js.org/) - Static Module Bundler
- SCSS
- Flexbox
- CSS Grid
- Desktop-first workflow
- Imported JSON data

### What I learned<br><br>

1. The first challenge I encountered was working with the html element 'dialog' for the first time. I wanted to use this element due to some of the built in functionality, but it had some unexpected (and perhaps unintended behavior).
<br><br>
The first issue I had was with the margin and padding for the ::backdrop pseudo class. I had set the margin and padding to all elements to 0:
<br><br>
    ```css
    * {
      margin: 0;
      padding: 0;
    }
    ```
    <br>This caused the margin and padding of the backdrop to not cover the entire viewport. I fixed this by excluding the dialog element from that selector using :not():<br><br>

    ```css
    *:not(dialog) {
      margin: 0;
      padding: 0;
    }
    ```

1. The second issue I encountered is that the dialog would be displayed in the document flow (not in front of the other elements) when the page loaded. 
<br><br>
![](./src/images/modal-issue--bottom.png)
<br><br>
This is not the intended behavior that I understand dialog to have. It should be hidden by default, then pop up above the document when showModal() is executed (assuming that you haven't specified an open state in the HTML). Instead, it was showing up on the page as though it were any other div. The showModal() method still made the modal show up above the viewport, as expected:
<br><br>
![](./src/images/modal-issue--open.png)
<br><br>
The issue turned out to be some styling I had added to the dialog box. When I removed `display: flex`, the behavior returned to normal.<br>
1. I later ran into some issues dynamically loading the replies to top level comments to the DOM. I was trying to add them as a sibling to the comment at the same time that I was adding the comment. I was finding that to be a challenge. The approach I took was to wait for all comments to be added, loop through them a second time and find the related replies and add them in a second stage. I don't believe this would be the most performative, and would not scale well, but it seemed to be a decent solution for the size of this project.<br>
1. Once I had my replies loading correctly, I wanted to test the event listener that I had on my delete buttons, to ensure the modal was still responding. Spoiler alert: it was not working.
<br><br>
The event listener I placed on the buttons was not recognizing them because they were loading dynamically. The solution was to add an event listener to the `<main>` element, then use event bubbling to target the desired elements. More event bubbling issues came up when targeting button groups. I resolved those issues using the `e.target.closest()` method, to find the common parent to any desired element.

    ```js
    if (e.target.classList.contains('dlt')) {
        deleteModal.showModal()
    }
    ```
### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [TypeOfNaN - Dynamic Event Listeners](https://typeofnan.dev/how-to-bind-event-listeners-on-dynamically-created-elements-in-javascript/) - This helped me understand event listening for dynamically generated elements.
- [Stack Overflow - Event Bubbling](https://stackoverflow.com/a/59424604/13604562) - This Stack Overflow comment helped me understand how to target a parent or grandparent element when any of its descendants are clicked.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

# Author

- Website - [Jonathan Wright](https://dr-wrong-mo.github.io/)
- Frontend Mentor - [@Dr-Wrong-Mo](https://www.frontendmentor.io/profile/Dr-Wrong-Mo)

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
