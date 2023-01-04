const {Configuration, OpenAIApi} = require("openai")

const configuration = new Configuration({
    apiKey: process.env.OPENAI_AI_KEY,
})
const openai = new OpenAIApi(configuration)


const generateImage = async (req, res) => {
    const {prompt} = req.body

    try {
        const response = await openai.createImage({
            prompt: prompt,
            n: 1,
            size: "1024x1024"
        })

        const imageUrl = response.data.data[0].url

        console.log(response.data.data[0])

        res.status(200).json({
            success: true,
            data: imageUrl 
        })
    } catch (error) {
        if (error.response){
            console.log(error.response.status)
            console.log(error.response.data)
        }else{
            console.log(error.message)
        }

        es.status(400).json({
            success: false,
            error: 'The image could not be generated'
        })
    }
}

module.exports = {generateImage}