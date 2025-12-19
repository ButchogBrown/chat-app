const Message = require('../models/Message')
const User = require('../models/User')

exports.savePrivateMessage = async ({content, to, from}) => {
    const message = await Message.create({
        senderId: from,
        receiverId: to,
        content: content,
        isSeen: false
    })
    return message 
    
}
exports.fetchMessages = async(req, res, next) => {
    try {
        const { userId } = req.params

        const messages = await Message.find({
            $or: [
                { senderId: userId, receiverId: req.user.userId },
                { receiverId: userId, senderId: req.user.userId }
            ]
        }).sort({createdAt: 1})

        // if(!messages.length) res.status(400).json({message: "No message"})
        return res.status(200).json(messages)
        
    }catch(error) {
        next(error)
    }
}

exports.fetchRecentChat = async (req, res, next) => {
    try {
        const {userId} = req.user
        const message = await Message.find({
            $or: [
                {senderId: userId},
                {receiverId: userId}
            ]
        }).sort({createdAt: -1})

        const userIds = [
            ...new Set(message.map(m => 
                m.senderId.toString() === userId ?
                m.receiverId : m.senderId
            ))
        ]
        const users = await User.find({_id: {$in: userIds}}, {name: 1, _id: 1})
        return res.status(200).json(users)
    }catch(error) {
        console.log(error)
        next(error)
    }

}

