
let data = JSON.parse(localStorage.getItem('FEM-comments'));

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
      
            <!-- The following line determines which buttons are injected, button templates are imported from another file -->
            ${ifUser(thisComment.user.username, currentUserButtons, otherUserButtons)}
            </div>`;
  
    return commentTemplate + (level === 'top' ? replyButtonsTemplate : '');
  }

// Template for edit and delete buttons if comment is by the current user
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

// Template for reply button if comment is by other user
const otherUserButtons = `
  <div class="btns rpl">
    <div class="btns__reply rpl">
      <svg class="reply rpl">
        <use xlink:href="#reply" class="rpl"/>
      </svg>
        <span class="rpl">Reply</span>
      </div>
  </div>`;

// Template for building reply sections under a top level comment
const replyButtonsTemplate = `
  <div class="comments__responded">
  <div class="comments__responded--indent"></div>
  <div class="comments__responded--responses"></div>
</div>`;

function replyFormTemplate (userImagePath, id) { `
  <form id="${id}" class="comment response">
    <img src="${userImagePath}" alt="User Avatar" />
    <textarea name="comment" id="comment" placeholder="Add a comment&#8230;"></textarea>
    <button type="submit">REPLY</button>
  </form>`
};

function editCommentTemplate (content) {
  return `<div class="update">
  <textarea name="" class="card__content--editText">${content}</textarea>
  <button class="confirmEditBtn">UPDATE</button>
</div>`
}

function confirmEditTemplate (content) {
  return `<p>
  ${content}
  </p>`
}


module.exports = { insertCard, replyFormTemplate, editCommentTemplate, confirmEditTemplate }