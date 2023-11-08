const OpenAI = require("openai")
const Message = require('../models/MessageModel')
const User = require('../models/UserModel')

const openai = new OpenAI({
    // apiKey: process.env.OPENAI_API_KEY,
    apiKey: "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",

})

const handleChatRequest = async (req, res) => {
    const { message } = req.body
    try {
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: message }],
            model: 'gpt-3.5-turbo',
        });
        const dataValue = [
            {
                role: "user",
                message: message
            },
            {
                role: 'openai',
                message: chatCompletion.choices[0].message.content
            }
        ]
        await User.findOneAndUpdate({_id:req.user._id},{$push:{messages:dataValue}})
        return res.status(200).json({ success: true, response: {role:"openai",message:chatCompletion.choices[0].message.content} })

    } catch (e) {
        console.log(e)
    }
}


module.exports = { handleChatRequest }