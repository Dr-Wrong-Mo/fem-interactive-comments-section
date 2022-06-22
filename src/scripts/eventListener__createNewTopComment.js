// Import required functions
const newId = require("./createNewIdNumber.js");
import { insertCard } from "./templates_html";

// Declare DOM and Local Store elements
const comments = document.getElementById('comments');
let data = JSON.parse(localStorage.getItem('FEM-comments'));

class Comment {
    constructor(content) {
      this.id = newId.createNewIdNumber(JSON.parse(localStorage.getItem('FEM-comments')));
      this.content = content;
      this.createdAt = Date.now();
      this.score = 1;
      this.user = data.currentUser,
      this.replies = []
      this.voted = 1
    }
}  

// This function listens for a new top comment submission.
// A new card will be created with current user data and content from the form
// The card will be added to the DOM
// The object will be added to local storage
// The form will be reset
newTopCommentForm.addEventListener('submit', (e) => {
    e.preventDefault();    

    let card = document.createElement('div');
    card.classList.add('comment__group');
    card.setAttribute('id', `commentID-${newId.createNewIdNumber(JSON.parse(localStorage.getItem('FEM-comments')))}`);
    let newComment = new Comment(e.target[0].value)
    card.innerHTML = insertCard(newComment, 'top');
    comments.append(card);
    data.comments.push(newComment)
    localStorage.setItem('FEM-comments', JSON.stringify(data));
    e.target[0].value = ''
})