namespace my.smartproductcatalog;

using { cuid, managed } from '@sap/cds/common';

// Define the main entity for our products
entity Products : cuid, managed {
    name                 : String(100); // Product's name
    baseDescription      : String; // A simple, user-provided description
    stock                : Integer; // Available stock quantity
    generatedDescription : LargeString; // To store the AI-generated text
    imageURL             : String; // To store the URL of the uploaded product image
    imageAnalysis        : LargeString; // To store the result of the AI image analysis
}