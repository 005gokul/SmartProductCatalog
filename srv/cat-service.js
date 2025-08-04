const cds = require('@sap/cds');
require('dotenv').config();

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

module.exports = cds.service.impl(function () {
    const { Products } = this.entities;

    this.before('CREATE', Products, async (req) => {
        const { name, category, features } = req.data;
        if (name && category && features && !req.data.generatedDescription) {
            console.log(`>>>> Calling Groq API for DETAILED description...`);

            // This is the new, more detailed prompt
            const prompt = `
                You are an expert marketing copywriter for a premium electronics brand.
                Your task is to create a detailed, engaging, and professional product description based on the following details.

                Product Details:
                - Name: ${name}
                - Category: ${category}
                - Key Features: ${features}

                Please structure your response with the following sections, using markdown for formatting:
                1.  An introductory paragraph.
                2.  A section titled "**Key Features:**" where you elaborate on each feature from the input, creating a descriptive bullet point for each one, preceded by an asterisk (*).
                3.  A section titled "**What You Can Expect:**" with a few bullet points describing the user benefits, preceded by an asterisk (*).
                4.  A concluding paragraph with a call to action.

                Do not include any other text or commentary. Just provide the structured description.
            `;

            const apiPayload = { model: "llama3-8b-8192", messages: [{ role: "user", content: prompt }] };
            const apiHeaders = { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' };

            try {
                const response = await fetch(GROQ_API_URL, { method: 'POST', headers: apiHeaders, body: JSON.stringify(apiPayload) });
                if (!response.ok) { throw new Error(JSON.stringify(await response.json())); }
                const responseData = await response.json();
                req.data.generatedDescription = responseData.choices[0].message.content.trim();
                console.log(">>>> Successfully generated detailed description from Groq API.");
            } catch (error) {
                console.error(">>>> Error calling Groq API for detailed description:", error.message);
                req.data.generatedDescription = "Error: Could not generate AI description.";
            }
        }
    });
});