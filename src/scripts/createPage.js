// Import HTML Templates
const { insertCard } = require('./templates_html');

// Declare elements from the body
const comments = document.getElementById('comments');

function createPage () {

  // Declare data variables
  let data = JSON.parse(localStorage.getItem('FEM-comments'));
  let userComments = data.comments;

  // Sorting function for top level comments
  function compare(a, b) {
    if (a.score < b.score) {
      return -1;
    }
    if (a.score > b.score) {
      return 1;
    }
    return 0;
  }

  // Sorts top level comments in order of highest score
  userComments = userComments.sort(compare);

  // Loops through an array of comments and appends them to a page element
  function createCommentCards(commentArray, parent, className, level) {
    commentArray.forEach((el) => {
      let card = document.createElement('div');
      card.classList.add(className);
      card.setAttribute('id', `commentID-${el.id}`);
      card.innerHTML = insertCard(el, level);
      parent.prepend(card);
    });
  }

  // Loads top level comments when the page loads
  createCommentCards(userComments, comments, 'comment__group', 'top');

  let commentCardsNodeList = document.querySelectorAll('.comment__group');

  // FUNCTION LOOPS THROUGH EACH TOP LEVEL COMMENT IN JSON DATA AND MATCHES IT TO NODE ELEMENTS
  // INSERTS REPLIES IN RESPONSE SECTION IF ANY EXIST
  function matchCommentsToData () {
    userComments.forEach(data => {
      let nodeCard = Array.from(commentCardsNodeList).find(node => node.id === `commentID-${data.id}`)
      let responseSection = nodeCard.lastElementChild.lastElementChild
      
      createCommentCards(data.replies.reverse(), responseSection, 'reply', 'null')
      if (data.replies.length === 0) { responseSection.parentElement.style.height = 0 }
    });
  }

  matchCommentsToData ()

}

createPage()