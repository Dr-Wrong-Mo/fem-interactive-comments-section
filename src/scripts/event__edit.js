const Comment = require('./class__comment.js')
const template = require("./templates_html.js");
let data = JSON.parse(localStorage.getItem('FEM-comments'));

// This function will listen for a click on any Edit Button Group and update the content innerHTML
function editResponse (e) {
    const parent = e.target.closest('.edit')
    
    // Validates that click event was on an edit button group. returns if false
    if (!parent) {
        return
    }
    
    // Get text string from card comment and inserts it into the new text area for the comment update
    let contentArea = parent.parentElement.previousElementSibling.lastElementChild

    // Checks to see if last child element in content area is a paragraph
    // This validates that the edit button is being pressed for the first time
    // If second click is allowed, the textarea will be updated with an unintended value
    if(contentArea.lastElementChild.localName !== 'p') {
        return
    }

    const originalText = contentArea.children[0].outerText
    let editState = template.editCommentTemplate(originalText)
    contentArea.innerHTML = editState    
};

function confirmEdit (e) {
    const update = e.target.closest('.confirmEditBtn')

    // Checks to see if click event was on an update group. returns if false
    if (!update) {
        return
    }

    // Declare element that will be have innerHTML updated when update
    let contentArea = update.closest('.card__content--comment');

    // Gets new text from text area
    let newText = update.previousElementSibling.value;

    // Gets ID to update local storage
    let grandparentID = contentArea.closest('.card').parentElement.getAttribute('id');

    if (newText !== "") {
        // Gets HTML template and inserts updated text
        let updatedState = template.confirmEditTemplate(newText)
        // Updates innerHTML
        contentArea.innerHTML = updatedState
        // updates local storage
        updateLocalStorageByID(grandparentID, newText)
    }
}

function updateLocalStorageByID(id, newContent) {
    // Update value of id parameter to strip away non-numerical values
    id = Number(id.replace('commentID-', ''));

    // loop through comments in local storage to find comment that was updated
    // Update text of that comment. Add all comments and replies to new variable
    let updateComments = Array.from(data.comments).map((el) => {

        // If match is found on top level comment, updated with new text and comment with original replies as value to array
        if (el.id === id) {
            let updatedComment = new Comment(el.id, el.user, newContent, el.score, el.createdAt, el.voted)
            updatedComment.replies = el.replies
            return updatedComment
        }

        // If match is not found at top level comment, loop through replies until match is found. Return all items to array
        if (el.id !== id) {
            let unchangedComment = new Comment(el.id, el.user, el.content, el.score, el.createdAt, el.voted);

            el.replies.forEach(reply => {
                if (reply.id === id) {
                    updatedReply = new Comment(reply.id, reply.user, newContent, reply.score, reply.createdAt, el.voted)
                    // remove replies array from bottom level comment
                    delete updatedReply.replies
                } else {
                    updatedReply = new Comment(reply.id, reply.user, reply.content, reply.score, reply.createdAt, el.voted)
                    // remove replies array from bottom level comment
                    delete updatedReply.replies
                }
                // Push bottom level comment to top level comment before returning top level comment to array
                unchangedComment.replies.push(updatedReply)
            })

            // Return top level comment to array
            return unchangedComment
        }

    })

    // Update data with updated comments
    data.comments = updateComments
    // Update local storage with updated data
    localStorage.setItem('FEM-comments', JSON.stringify(data));
  }

module.exports = { editResponse, confirmEdit };