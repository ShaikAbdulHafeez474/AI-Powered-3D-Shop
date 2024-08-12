import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi} from 'openai';
import axios from 'axios';
dotenv.config();

const router = express.Router();

const apikey=process.env.OPENAI_API_KEY;



router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
    const url = 'https://api.openai.com/v1/images/generations';

    try {
        const {prompt}=req.body;
      const response = await axios.post(
        url,
        {
          prompt: prompt,
          n: 1, // Number of images to generate
          size: '1024x1024', // Image size
          response_format: 'b64_json' // Format of the response
        },
        {
          headers: {
            'Authorization': `Bearer ${apikey}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response.data);
    const image = response.data.data[0].b64_json;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" })
  }
})

export default router;