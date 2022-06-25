// Import required functions
const Comment = require('./class__comment.js')
const newId = require("./createNewIdNumber.js");
import { insertCard } from "./templates_html";

// Declare DOM and Local Store elements
const comments = document.getElementById('comments');
let data = JSON.parse(localStorage.getItem('FEM-comments'));

// This function listens for a new top comment submission.
// A new card will be created with current user data and content from the form
// The card will be added to the DOM
// The object will be added to local storage
// The form will be reset

// id, user, content, score, createdAt, voted
newTopCommentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const createNewID = newId.createNewIdNumber(JSON.parse(localStorage.getItem('FEM-comments')))

    let card = document.createElement('div');
    card.classList.add('comment__group');
    card.setAttribute('id', `commentID-${createNewID}`);

    let newComment = new Comment(createNewID, data.currentUser, e.target[0].value, 1, Date.now(), 1)

    card.innerHTML = insertCard(newComment, 'top');
    comments.append(card);
    data.comments.push(newComment)
    localStorage.setItem('FEM-comments', JSON.stringify(data));
    e.target[0].value = ''
})