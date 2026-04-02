require('dotenv').config()
const { InferenceClient } = require('@huggingface/inference')

const generateText = async (req, res) => {
    console.log(req.body)   
    const client = new InferenceClient(process.env.HF_API_KEY)
    try {
        const out = await client.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: req.body.message,
            max_tokens: 250
        })
        res.status(200).json(out.choices[0].message)
    }catch (error) {
        console.log(error)  
    }
}

module.exports = {generateText}