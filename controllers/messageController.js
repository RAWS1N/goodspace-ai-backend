const OpenAI = require("openai")
const User = require('../models/UserModel')

// if apiKey by env variable throwing error try to put directly openAI api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})


// function to handle chat request and responding with openAI api response
const handleChatRequest = async (req, res) => {
    // getting message from client
    const { message } = req.body
    try {
        // sending message to openAI api
        const chatCompletion = await openai.chat.completions.create({
            messages: [{ role: 'user', content: message }],
            model: 'gpt-3.5-turbo',
        });

        // making schema for saving in database
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
        // finding user and pushing message schema in database
        await User.findOneAndUpdate({_id:req.user._id},{$push:{messages:dataValue}})
        // sending resposne of openAI
        return res.status(200).json({ success: true, response: {role:"openai",message:chatCompletion.choices[0].message.content} })

    } catch (e) {
        console.log(e)
    }
}


module.exports = { handleChatRequest }
