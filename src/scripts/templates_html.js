let data = JSON.parse(localStorage.getItem('FEM-comments'));

// Changes default image path to path that Webpack will export
function updateImagePath(file) {
  return file.replace('./images/avatars/', './assets/');
}

// User validation method to see if comment is from the current user
function ifCurrentUser(user, isTrue, isFalse) {
  return data.currentUser.username === user ? isTrue : isFalse;
}

// Filters comments to find user callouts and modifies the format by wrapping the callout in a span
function findCallOut(str) {
  // This regular expression searching for a string segment that begins with the '@' character,
  // and has no alpha numeric characters immediately before it.
  // Example: it will return @username, but it will not return user@service.com.
  const regex = /(^@\w+|[^(a-zA-Z\d)]@\w+)/gi;

  // Build an array from all regular expressions found
  let arr = [str.match(regex)];

  // Loop through each comment
  arr.forEach((comments) => {
    //Validate that the comment has a regular expression, if not then
    if (!comments) {
      return null;
    }

    // Loop through each regex in the comment, and wrap it in a span, then update the string
    comments = comments.forEach((callout) => {
      if (callout.length > 0) {
        str = str.replace(callout, `<span class="callout">${callout}</span>`);
      }
    });
  });

  // Return the string to the requesting function
  return str;
}

function modifyTimeStamp(time) {
  if (typeof time === 'string') {
    return time;
  }

  // Convert timestamp into weeks, days, hours, minutes
  // https://stackoverflow.com/a/13904120/13604562
  // get total seconds between the times
  let delta = Math.abs(Date.now() - time) / 1000;

  let weeks = Math.floor(delta / (86400 * 7))

  // calculate (and subtract) whole days
  let days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  let hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  let minutes = Math.floor(delta / 60) % 60;
  
  if (minutes < 1) {time = `Just now`}
  if (minutes === 1) {time = `${minutes} minute ago`}
  if (minutes >= 2) {time = `${minutes} minutes ago`}
  if (hours === 1) {time = `${hours} hour ago`}
  if (hours >= 2) {time = `${hours} hours ago`}
  if (days === 1) {time = `${days} day ago`}
  if (days >= 2) {time = `${days} days ago`}
  if (weeks === 1) {time = `${weeks} week ago`}
  if (weeks >= 2) {time = `${weeks} weeks ago`}

  return time;
}

// Function for inserting card template
function insertCard(thisComment, level) {
  const commentTemplate = `
          <div class="card">
            <div class="vote">
              <svg class="voteUp ${thisComment.voted === 1 ? 'voted' : ''}">
                <use xlink:href="#plus"/>
              </svg>
              <div class="score">${thisComment.score}</div>
              <svg class="voteDown ${thisComment.voted === -1 ? 'voted' : ''}">
                <use xlink:href="#minus"/>
              </svg>
            </div>
            <div class="card__content">
              <div class="card__content--user">
                <img src="${updateImagePath(
                  thisComment.user.image.png
                )}" alt="User Avatar" />
                <div class="username">${thisComment.user.username}</div>
                ${ifCurrentUser(thisComment.user.username, youTag, '')}
                <div class="createdOn">${modifyTimeStamp(
                  thisComment.createdAt
                )}</div>
              </div>
              <div class="card__content--comment">
                <p>
                ${findCallOut(thisComment.content)}
                </p>
              </div>
            </div>
            ${ifCurrentUser(
              thisComment.user.username,
              currentUserButtons,
              otherUserButtons
            )}
            </div>`;

  return commentTemplate + (level === 'top' ? replyButtonsTemplate : '');
}

// Template for tag that is inserted if comment is from current user
const youTag = `
  <div class="you">you</div>
`;

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

// HTML template for new element when user replies to another comment
function replyFormTemplate(userImagePath, originalCommenter) {
  return `<img src="${userImagePath}" alt="User Avatar" />
    <textarea name="comment" class="comment__content">@${originalCommenter}</textarea>
    <button class="btn-addNewReply">REPLY</button>`;
}

// HTML template when user clicks the edit button group. Existing comment is replaced with text area containing previous content
function editCommentTemplate(content) {
  return `<div class="update">
  <textarea name="" class="card__content--editText">${content}</textarea>
  <button class="confirmEditBtn">UPDATE</button>
</div>`;
}

// HTML template when user confirms their comment updates. This replaces the div that contained a text area and button
function confirmEditTemplate(content) {
  return `<p>
  ${findCallOut(content)}
  </p>`;
}

module.exports = {
  insertCard,
  replyFormTemplate,
  editCommentTemplate,
  confirmEditTemplate,
  updateImagePath,
};
