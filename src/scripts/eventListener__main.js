// Imports
import showDeleteModal from './event__showModal'
import replyToComment from './event__reply'
import editResponse from './event__edit'
import {voteDown, voteUp} from './event__vote'


// Declarations
const main = document.querySelector('main')

// Event bubbling. Listen to items that are dynamically added
// https://typeofnan.dev/how-to-bind-event-listeners-on-dynamically-created-elements-in-javascript/
main.addEventListener('click', function (e) {
    showDeleteModal(e);
    replyToComment(e);
    editResponse(e);
    voteUp(e);
    voteDown(e);
});