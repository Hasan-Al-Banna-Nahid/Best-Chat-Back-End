const router = require("express").Router();
const { check } = require("express-validator");

const chatController = require("../controllers/chatController");

const authMiddleware = require("../../middleware/authMiddleware");
const roleMiddleware = require("../../middleware/roleMiddleware");
const uploadFilesMiddleware = require("../../middleware/multerMiddleware")

router.get(
    "/",
    authMiddleware,
    chatController.getAllChats
);

router.delete(
    "/",
    authMiddleware,
    roleMiddleware("ADMIN"),
    chatController.deleteChat
);

router.get(
    "/:chatId",
    authMiddleware,
    chatController.getChat
);



router.post(
    "/:chatId/sendMessage",
    authMiddleware,
    chatController.sendMessage
);

// router.post(
//     "/:chatId/sendFile",
//     authMiddleware,
//     uploadFilesMiddleware,
//     chatController.sendFile
// );

router.post(
    "/getFile",
    authMiddleware,
    chatController.getFile
);

router.post(
    "/new",
    [
        check("chatName", "Chat Name can not be empty").notEmpty()
    ],
    authMiddleware,
    roleMiddleware("ADMIN"),
    chatController.createNewChat
);

router.post(
    "/addUserToChat",
    [
        check("chatId", "chatId can not be empty").notEmpty(),
        check("userId", "userId can not be empty").notEmpty()
    ],
    authMiddleware,
    roleMiddleware("ADMIN"),
    chatController.addUserToChat
);

router.put(
    "/addUserToChat",
    [
        check("chatId", "chatId can not be empty").notEmpty(),
        check("userId", "userId can not be empty").notEmpty()
    ],
    authMiddleware,
    roleMiddleware("ADMIN"),
    chatController.addUserToChat
);

router.put(
    "/deleteUserFromChat",
    [
        check("chatId", "chatId can not be empty").notEmpty(),
        check("userId", "userId can not be empty").notEmpty()
    ],
    authMiddleware,
    roleMiddleware("ADMIN"),
    chatController.deleteUserFromChat
);

router.put(
    "/addUsersArrToChat",
    [
        check("chatId", "chatId can not be empty").notEmpty()
    ],
    authMiddleware,
    roleMiddleware("ADMIN"),
    chatController.addUsersArrToChat
);



module.exports = router;
