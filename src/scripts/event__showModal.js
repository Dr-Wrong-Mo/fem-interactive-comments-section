const Comment = require('./class__comment.js')
const deleteModal = document.getElementById('deleteConfirm');
let data = JSON.parse(localStorage.getItem('FEM-comments'));

function removeObjectByID(id) {
  let newData = [];
  Array.from(data.comments).forEach((el) => {
    if (el.id !== id) {
      let newEl = new Comment(el.id, el.user, el.content, el.score, el.createdAt, el.voted);
      newData.push(newEl);

      el.replies.forEach((subEl) => {
        if (subEl.id !== id) {
          newData[newData.length - 1].replies.push(subEl);
        }
      });
    }
  });

  data.comments = newData;
  localStorage.setItem('FEM-comments', JSON.stringify(data));
}

function showDeleteModal(e) {
  const parent = e.target.closest('.dlt');

  // Return if click occurred outside of delete button group
  if (parent === null) {
    return null;
  }

  deleteModal.showModal();

  let deleteButton =
    deleteModal.lastElementChild.lastElementChild.lastElementChild;
  let grandparent =
    e.target.parentElement.parentElement.parentElement.parentElement;

  let id = Number(grandparent.getAttribute('id').replace('commentID-', ''));

  deleteButton.addEventListener('click', () => {
    grandparent.remove();
    removeObjectByID(id);
    localStorage.setItem('FEM-comments', JSON.stringify(data));
  });
}
module.exports = showDeleteModal;
