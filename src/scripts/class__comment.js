class Comment {
  constructor(id, user, content, score, createdAt, voted) {
    this.id = id;
    this.user = user;
    this.content = content;
    this.replies = [];
    this.score = score;
    this.createdAt = createdAt;
    this.voted = voted;
  }
}

module.exports = Comment