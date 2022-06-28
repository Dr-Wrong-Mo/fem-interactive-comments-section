// Import required functions
const Comment = require('./class__comment.js')
const newId = require("./createNewIdNumber.js");
import { insertCard } from "./templates_html";

const newTopCommentForm = document.getElementById('newTopCommentForm')

// Declare DOM and Local Store elements
const comments = document.getElementById('comments');

// This function listens for a new top comment submission.
// A new card will be created with current user data and content from the form
// The card will be added to the DOM
// The object will be added to local storage
// The form will be reset

// id, user, content, score, createdAt, voted
newTopCommentForm.addEventListener('click', (e) => {
    let data = JSON.parse(localStorage.getItem('FEM-comments'));
    e.preventDefault();

    let submitted = e.target.localName

    // Validate that the click event occurred on the button
    if (submitted !== 'button') {
        return null;
    }

    // Generate new ID number for data storage and creating an ID for the HTML element
    const createNewID = newId.createNewIdNumber(JSON.parse(localStorage.getItem('FEM-comments')));

    // Get form input
    let formContent = newTopCommentForm.querySelector('#comment').value

    // Validate that the form is not empty
    if (formContent === '') {
        return null;
    }

    // Create new comment object
    let newComment = new Comment(createNewID, data.currentUser, formContent, 1, Date.now(), 1)

    // Add Card to page
    let card = document.createElement('div');
    card.classList.add('comment__group');
    card.setAttribute('id', `commentID-${createNewID}`);
    card.innerHTML = insertCard(newComment, 'top');
    comments.append(card);

    // Update Local Storage
    data.comments.push(newComment)
    localStorage.setItem('FEM-comments', JSON.stringify(data));

    // Reset form content to blank
    newTopCommentForm.querySelector('#comment').value = ''
})