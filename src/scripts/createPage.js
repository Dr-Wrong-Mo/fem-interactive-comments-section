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

// Changes default image path to path that Webpack will export
function updateImagePath(file) {
  return file.replace('./images/avatars/', './assets/');
}

// User validation method to see if comment is from the current user
function ifUser(user, isTrue, isFalse) {
  return data.currentUser.username === user ? isTrue : isFalse;
}

// Function for inserting card template
function insertCard(thisComment, level) {
  const commentTemplate = `
        <div class="card">
          <div class="vote">
            <svg class="voteUp ${thisComment.voted === 1 ? "voted" : ""}">
              <use xlink:href="#plus"/>
            </svg>
            <div class="score">${thisComment.score}</div>
            <svg class="voteDown ${thisComment.voted === -1 ? "voted" : ""}">
              <use xlink:href="#minus"/>
            </svg>
          </div>
          <div class="card__content">
            <div class="card__content--user">
              <img src="${updateImagePath(
                thisComment.user.image.png
              )}" alt="User Avatar" />
              <div class="username">${thisComment.user.username}</div>
              <div class="createdOn">${thisComment.createdAt}</div>
            </div>
            <!-- User comment -->
            <div class="card__content--comment">
              <p>
              ${thisComment.content}
              </p>
            </div>
          </div>
    
          <!-- The following line determines which buttons are injected -->
          ${ifUser(thisComment.user.username, currentUserButtons, otherUserButtons)}
          </div>`;

  const replyTemplate = `
            <div class="comments__responded">
            <div class="comments__responded--indent"></div>
            <div class="comments__responded--responses"></div>
          </div>`;

  return commentTemplate + (level === 'top' ? replyTemplate : '');
}

// Template for buttons if comment is by the current user
const currentUserButtons = `
  <div class="btns">
    <div class="btns__delete dlt">
        <svg class="dlt">
        <use xlink:href="#delete-btn" class="dlt"/>
        </svg>
        <span class="dlt">Delete</span>
    </div>
    <div class="btns__edit edit">
        <svg>
        <use xlink:href="#edit"/>
        </svg>
        <span>Edit</span>
    </div>
  </div>`;

// Template for buttons if comment is by other user
const otherUserButtons = `
  <div class="btns rpl">
    <div class="btns__reply rpl">
      <svg class="reply rpl">
        <use xlink:href="#reply" class="rpl"/>
      </svg>
        <span class="rpl">Reply</span>
      </div>
  </div>`;

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
    
    createCommentCards(data.replies, responseSection, 'reply', 'null')
    if (data.replies.length === 0) { responseSection.parentElement.style.height = 0 }
  });
}

matchCommentsToData ()

}

createPage()

module.exports = createPage