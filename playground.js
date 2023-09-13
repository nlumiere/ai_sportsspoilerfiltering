import { OpenAI } from "openai";

import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
  });

// Get API key and model from the env variables 
// const OPENAI_KEY = process.env.OPENAI_KEY; 
const OPENAI_MODEL = process.env.OPENAI_MODEL;


// var openaiClient;
// // Check if key and model are valid 
// if (OPENAI_KEY && OPENAI_MODEL) { 
//     // Import OpenAI library 
//     const openai = require("openai"); 
//     // Create an instance of API with key 
//     openaiClient = new openai({apiKey: OPENAI_KEY}); 
//     console.log("Keys loaded successfully!"); 
// } 
// else {
//     console.error("Error in setting up the environment"); 
//     process.exit(); 
// }


const chatCompletionRequest = {
    model: OPENAI_MODEL, 
    messages: [{
        "role": "user",
        "content": "Respond ONLY in yes or no if it is likely that this video title contains spoilers? "
    }]};

async function request() {
    const response = await openai.chat.completions.create(chatCompletionRequest);
    console.log(response);
    console.log(response.choices[0].message);
} 

request();