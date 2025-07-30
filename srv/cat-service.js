const cds = require('@sap/cds');

// Load environment variables from the .env file
require('dotenv').config();

// API Key for Groq
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

module.exports = cds.service.impl(function () {

    const { Products } = this.entities;

    // Handler for Text Generation
    this.before('CREATE', Products, async (req) => {
        // Use the new fields: name, category, features
        const { name, category, features } = req.data;

        if (name && category && features) {
            console.log(`>>>> Calling Groq API for text generation...`);

            // Create a more structured prompt for better results
            const prompt = `You are a professional marketing copywriter. Generate a short, compelling, and friendly marketing description for a new product. The description should be a single paragraph.
            Product Details:
            - Name: ${name}
            - Category: ${category}
            - Key Features: ${features}`;

            const apiPayload = { model: "llama3-8b-8192", messages: [{ role: "user", content: prompt }] };
            const apiHeaders = { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' };

            try {
                const response = await fetch(GROQ_API_URL, {
                    method: 'POST',
                    headers: apiHeaders,
                    body: JSON.stringify(apiPayload)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(JSON.stringify(errorData));
                }

                const responseData = await response.json();
                req.data.generatedDescription = responseData.choices[0].message.content.trim();
                console.log(">>>> Successfully generated description from Groq API.");

            } catch (error) {
                console.error(">>>> Error calling Groq API:", error.message);
                req.data.generatedDescription = "Error: Could not generate AI description.";
            }
        }
    });
});