const newTopComment = document.getElementById('newTopCommentForm');
let data = JSON.parse(localStorage.getItem('FEM-comments'));

newTopCommentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e)
})