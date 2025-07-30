const cds = require('@sap/cds');

// Load environment variables from the .env file
require('dotenv').config();

// API Keys and URLs
const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_VISION_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent?key=${GEMINI_API_KEY}`;

module.exports = cds.service.impl(function () {

    const { Products } = this.entities;

    // Text Generation Handler (No changes here)
    this.before('CREATE', Products, async (req) => {
        const { name, baseDescription } = req.data;
        if (name && baseDescription) {
            console.log(`>>>> Calling Groq API for text generation...`);
            const prompt = `Based on the product name "${name}" and its basic description "${baseDescription}", write a compelling and professional marketing description of about 40-60 words.`;
            const apiPayload = { model: "llama3-8b-8192", messages: [{ role: "user", content: prompt }] };
            const apiHeaders = { 'Authorization': `Bearer ${GROQ_API_KEY}`, 'Content-Type': 'application/json' };
            try {
                const response = await fetch(GROQ_API_URL, { method: 'POST', headers: apiHeaders, body: JSON.stringify(apiPayload) });
                if (!response.ok) { throw new Error(JSON.stringify(await response.json())); }
                const responseData = await response.json();
                req.data.generatedDescription = responseData.choices[0].message.content.trim();
                console.log(">>>> Successfully generated description from Groq API.");
            } catch (error) {
                console.error(">>>> Error calling Groq API:", error.message);
                req.data.generatedDescription = "Error: Could not generate AI description.";
            }
        }
    });

    // Image Analysis Handler (Updated for bound action)
    this.on('uploadImage', Products, async (req) => {
        const productID = req.params[0].ID; // The product ID is now in req.params for a bound action
        const { mimeType, imageData } = req.data;
        console.log(`>>>> Received image for product ID: ${productID}. Calling Gemini Vision API...`);

        const prompt = "Analyze this product image. Describe the product's key visual features, material, and likely use case in a single paragraph.";
        const visionPayload = { contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: mimeType, data: imageData } }] }] };

        try {
            const response = await fetch(GEMINI_VISION_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(visionPayload) });
            if (!response.ok) { throw new Error(JSON.stringify(await response.json())); }
            const responseData = await response.json();
            const imageAnalysisText = responseData.candidates[0].content.parts[0].text;
            console.log(">>>> Successfully received image analysis from Gemini.");

            await UPDATE(Products, productID).with({ imageAnalysis: imageAnalysisText });
            return { success: true, message: "Image analyzed successfully." };
        } catch (error) {
            console.error(">>>> Error calling Gemini Vision API:", error.message);
            await UPDATE(Products, productID).with({ imageAnalysis: "Error analyzing image." });
            req.error(500, 'Failed to analyze image via AI service.');
        }
    });
});