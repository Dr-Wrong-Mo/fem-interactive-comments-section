// Data parameter should be a new instance of local storage data.
function createNewIdNumber (data) {
    let topLevel = data.comments.map(comment => comment.id)
    
    let replies = []
    
    Array.from(data.comments).forEach(comment => {
        comment.replies.forEach(reply => replies.push(reply.id))
    });
    
    let ids = topLevel.concat(replies)
    ids.sort(function(a, b){return a-b})

    return (ids[ids.length - 1] + 1)
}

module.exports = { createNewIdNumber };