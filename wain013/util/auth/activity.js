const Permission = require("./permission");


const activities = (activity, req, res, next) => {
    if(req.user.userType == "Admin") {
        return next();
    } else {
        switch(activity) {

            case "Create Article":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Update Article":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

            case "Remove Article":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

            case "Add Article Photo":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

            case "Remove Article Photo":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

            case "Add Article Tag":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

            case "Remove Article Tag":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

            case "Like Article":
                new Permission(req, next)
                    .isActive()
                    .isNotArticleOwner()
                    .done();
                break;

            case "Unlike Article":
                new Permission(req, next)
                    .isActive()
                    .isNotArticleOwner()
                    .done();
                break;

            case "Add Article Comment":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Remove Article Comment":
                new Permission(req, next)
                    .isActive()
                    .isCommentOwner()
                    .done();
                break;

            case "Publish Article":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

            case "Approve Article":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Hold Article":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Suspend Article":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Provoke Article":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Add Article Collection":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

            case "Remove Article Collection":
                new Permission(req, next)
                    .isActive()
                    .isArticleOwner()
                    .done();
                break;

        //*********************************START OF Business SECTION**************************************************//

            case "Create Business":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .done();
                break;

            case "Update Business":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Delete Business":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Add Business Social Media":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Remove Business Social Media":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Add Business Photo":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Delete Business Photo":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Add Business Tag":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Delete Business Tag":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Add Business Branch":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Delete Business Branch":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Add Business Category":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Remove Business Category":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Add Business Option":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Delete Business Option":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Add Business Review":
                new Permission(req, next)
                    .isActive()
                    .isNotBusinessOwner()
                    .done();
                break;

            case "Remove Business Review":
                new Permission(req, next)
                    .isActive()
                    .isReviewOwner()
                    .done();
                break;

            case "Comment Business Review":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Remove Comment On Business Review":
                new Permission(req, next)
                    .isActive()
                    .isCommentOwner()
                    .done();
                break;

            case "Add Business Rating":
                new Permission(req, next)
                    .isActive()
                    .isNotBusinessOwner()
                    .done();
                break;

            case "Remove Business Rating":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Add Business Collection":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Remove Business Collection":
                new Permission(req, next)
                    .isActive()
                    .isBusinessUser()
                    .isBusinessOwner()
                    .done();
                break;

            case "Create Location":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Update Location":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Delete Location":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Create Language":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Update Language":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Remove Language":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Create Category":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Update Category":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Delete Category":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Create Tag":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Update Tag":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Delete Tag":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Create SystemVariable":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Update SystemVariable":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Delete SystemVariable":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "GET Admin":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Create Collection":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Update Collection":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Remove Collection":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Create Event":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Update Event":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Remove Event":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Add Event Option":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Delete Event Option":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Add Event Social Media":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Remove Event Social Media":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Add Event Attendant":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Remove Event Attendant":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Add Event Rating":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Remove Event Rating":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Add Event Tag":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Remove Event Tag":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Add Event Comment":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Remove Comment":
                new Permission(req, next)
                    .isActive()
                    .isCommentOwner()
                    .done();
                break;

            case "Add Event Photo":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Remove Event Photo":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Add Event Category":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Remove Event Category":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "List Users":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;
			
			case "Update User":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Password Reset":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;                

            case "Remove User":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Activate User":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Hold User":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Block User":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Add Bookmark":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Remove Bookmark":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;

            case "Upload Photo":
                new Permission(req, next)
                    .isActive()
                    .done();
                break;
            case "Create Content":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Update Content":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Remove Content":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Publish Content":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Approve Content":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Hold Content":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Suspend Content":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;

            case "Provoke Content":
                new Permission(req, next)
                    .isAdmin()
                    .done();
                break;


            //TODO: Add a handler if the activity does not exist
        }
    }
};


module.exports = activities;