const Comment = require('./class__comment.js')
const template = require("./templates_html.js");
const newId = require("./createNewIdNumber.js");
let data = JSON.parse(localStorage.getItem('FEM-comments'));

// This needs an event listener with type "submit" instead of click

function insertNewReplyForm (e) {
    const parent = e.target.closest('.rpl')
    // Validates that click event was on an edit button group. returns if false
    if (!parent) {
        return
    }
    
    // Finds parent of top level comment
    const ancestor = e.target.closest('.comment__group')
    const responseGroup = e.target.closest('.comments__responded--responses')
    let imagePath = template.updateImagePath(data.currentUser.image.png)
    let originalCommenter = parent.closest('.card').getElementsByClassName('username')[0].innerHTML

    let newForm = document.createElement('form');
    newForm.classList.add("comment");
    newForm.classList.add("response");
    newForm.innerHTML = template.replyFormTemplate(imagePath, originalCommenter);
    
    if (responseGroup === null) {
        
        ancestor.lastElementChild.lastElementChild.prepend(newForm);
        
        if (ancestor.lastElementChild.getAttribute('style') === 'height: 0px;') {
            ancestor.lastElementChild.removeAttribute('style')
        }
        
    } else {
        parent.closest('.reply').after(newForm)
    }

};

function addNewReply (e) {
    e.preventDefault()
    const parent = e.target.closest('.btn-addNewReply');

    // Validates that click event was on an edit button group. returns if false
    if (!parent) {
        return
    }

    const grandparent = e.target.closest(".comment")
    const ancestorID = Number(e.target.closest('.comment__group').getAttribute('id').replace('commentID-', ''))
    const commentValue = e.target.closest('.comment').getElementsByClassName("comment__content")[0].value

    const createNewID = newId.createNewIdNumber(JSON.parse(localStorage.getItem('FEM-comments')))


    let newComment = new Comment(createNewID, data.currentUser, commentValue, 1, Date.now(), 1)
    delete newComment.replies

    let card = document.createElement('div');
    card.setAttribute('id', `commentID-${createNewID}`);
    card.innerHTML = template.insertCard(newComment, '')

    grandparent.after(card)
    grandparent.remove()

    Array.from(data.comments).forEach(comment => {

        if (comment.id === ancestorID) {
            comment.replies.push(newComment)
        }
    })

    
    localStorage.setItem('FEM-comments', JSON.stringify(data));

}

module.exports = { insertNewReplyForm, addNewReply };