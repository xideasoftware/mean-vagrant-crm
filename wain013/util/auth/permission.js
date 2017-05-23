
const Permission  = function(req, next) {
    this.req = req;
    this.params = req.params;
    this.next = next;
    this.result = true;
};


Permission.prototype.isAdmin = function () {
    this.result = this.result &&
        (this.req.user.userType == "Admin");
    return this;
};

Permission.prototype.isActive = function () {
    this.result = this.result &&
        this.req.user.status == "ACTIVE";
    return this;
};

Permission.prototype.isArticleOwner = function () {
    this.result = this.result &&
        this.params.article.user == this.req.user;
    return this;
};

Permission.prototype.isNotArticleOwner = function () {
    this.result = this.result &&
        this.params.article.user != this.req.user;
    return this;
};

Permission.prototype.isBusinessUser = function () {
    this.result = this.result &&
        this.req.user.userType == "BusinessUser";
    return this;
};

Permission.prototype.isBusinessOwner = function () {
    this.result = this.result &&
        this.params.business.user == this.req.user;
    return this;
};

Permission.prototype.isNotBusinessOwner = function () {
    this.result = this.result &&
        this.params.business.user != this.req.user;
    return this;
};

Permission.prototype.isReviewOwner = function () {
    this.result = this.result &&
        this.params.review.user == this.req.user;
    return this;
};

Permission.prototype.isCommentOwner = function () {
    this.result = this.result &&
        this.params.comment.user == this.user;
    return this;
};

Permission.prototype.done = function () {
    this.result ? this.next() : this.next(new Error("You Are Not Authorized"));
};


module.exports = Permission;