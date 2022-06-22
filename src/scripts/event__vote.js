let data = JSON.parse(localStorage.getItem('FEM-comments'));

// Executes when a click event occurs within a plus icon
function voteUp(e) {
  // Declare SVG element that was clicked as parent element
  const parent = e.target.closest('.voteUp');
  
  // Return if click occurred outside of plus icon
  if (parent === null) {
    return null;
  }
  
  // Declares grandparent element (target card). The card ID is needed when comparing it to object data IDs
  const grandparent = parent.parentElement.parentElement.parentElement;
  
  // Declare variables that will be given value
  let jsonComment;
  let ancestor;
  
  // Checks to see if target card is a top level comment. If not, a value is assigned to ancestor
  if (grandparent.classList.contains('reply')) {
    ancestor = grandparent.parentElement.parentElement.previousElementSibling;
  }
  
  // Declare value of jsonComment. Value depends on if target card is top level or a response.
  if (ancestor) {
    // Loop through top level comments, then search subcomments to find matching IDs
    // Assign matching card to jsonComment variable

    // A while loop was necessary for this loop. A for loop would reset the variable to undefined if there were elements remaining after a match was found.
    let i = 0
    while (jsonComment === undefined) {
      jsonComment = data.comments[i].replies.find(
        el => `commentID-${el.id}` === grandparent.id
      )
      i++
    }

    } else {
    // Search top level comments for matching IDs
    // Assign matching card to jsonComment variable
    jsonComment = Array.from(data.comments).find(
      (el) => `commentID-${el.id}` === grandparent.id
    );
  }

  // Checks to see if current user has already voted on the targeted comment.
  // Assigns value, and updates classList of voting buttons accordingly
  if (!jsonComment.voted || jsonComment.voted < 1) {
    // Updates classList of target button for CSS styling
    parent.classList.add('voted');
    // Updates classList of minus button if it was previously selected
    if (
      parent.nextElementSibling.nextElementSibling.classList.contains('voted')
    ) {
      parent.nextElementSibling.nextElementSibling.classList.remove('voted');
    }

    // Adjusts target comments score based on previous vote, if applicable
    if (jsonComment.voted === undefined || jsonComment.voted === 0) {
      jsonComment.score += 1;
    } else {
      jsonComment.score += 2;
    }
    jsonComment.voted = 1;

    // Update local storage and innerHTML of target comment score
    localStorage.setItem('FEM-comments', JSON.stringify(data));
    parent.nextElementSibling.innerHTML = jsonComment.score;
  } else {
    // Remove classList from target button (undo vote)
    parent.classList.remove('voted');

    // Removes current users score from target comment
    jsonComment.voted = 0;
    jsonComment.score += -1;

    // Updates local storage and innerHTML of target comment score
    localStorage.setItem('FEM-comments', JSON.stringify(data));
    parent.nextElementSibling.innerHTML = jsonComment.score;
  }
}

// See comments from VoteUp. This method does the same, but for the voteDown button.
function voteDown(e) {
  const parent = e.target.closest('.voteDown');

  if (parent === null) {
    return null;
  }

  const grandparent = parent.parentElement.parentElement.parentElement;

  let jsonComment;
  let ancestor;
  if (grandparent.classList.contains('reply')) {
    ancestor = grandparent.parentElement.parentElement.previousElementSibling;
  }

  if (ancestor) {
    let i = 0
    while (jsonComment === undefined) {
      jsonComment = data.comments[i].replies.find(
        el => `commentID-${el.id}` === grandparent.id
      )
      i++
    }
  } else {
    jsonComment = Array.from(data.comments).find(
      (el) => `commentID-${el.id}` === grandparent.id
    );
  }

  if (!jsonComment.voted || jsonComment.voted > -1) {
    parent.classList.add('voted');
    if (
      parent.previousElementSibling.previousElementSibling.classList.contains(
        'voted'
      )
    ) {
      parent.previousElementSibling.previousElementSibling.classList.remove(
        'voted'
      );
    }

    if (jsonComment.voted === undefined || jsonComment.voted === 0) {
      jsonComment.score += -1;
    } else {
      jsonComment.score += -2;
    }
    jsonComment.voted = -1;

    localStorage.setItem('FEM-comments', JSON.stringify(data));
    parent.previousElementSibling.innerHTML = jsonComment.score;
  } else {
    parent.classList.remove('voted');

    jsonComment.voted = 0;
    jsonComment.score += 1;
    localStorage.setItem('FEM-comments', JSON.stringify(data));
    parent.previousElementSibling.innerHTML = jsonComment.score;
  }
}

module.exports = { voteUp, voteDown };
