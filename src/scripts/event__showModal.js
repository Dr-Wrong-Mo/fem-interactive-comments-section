const deleteModal = document.getElementById('deleteConfirm');

function showDeleteModal (e) {
    if (e.target.classList.contains('dlt')) {
        deleteModal.showModal()
    }
}
module.exports = showDeleteModal