// Imports
import showDeleteModal from './event__showModal'
import { insertNewReplyForm, addNewReply } from './event__reply'
import { editResponse, confirmEdit } from './event__edit'
import { voteDown, voteUp } from './event__vote'


// Declarations
const main = document.querySelector('main')

// Event bubbling. Listen to items that are dynamically added
// https://typeofnan.dev/how-to-bind-event-listeners-on-dynamically-created-elements-in-javascript/
main.addEventListener('click', function (e) {
    showDeleteModal(e);
    insertNewReplyForm(e);
    addNewReply(e)
    editResponse(e);
    confirmEdit(e);
    voteUp(e);
    voteDown(e);
});