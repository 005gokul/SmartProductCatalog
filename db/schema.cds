namespace my.smartproductcatalog;

using { cuid, managed } from '@sap/cds/common';

// Define the main entity for our products with the new fields
entity Products : cuid, managed {
    name                 : String(100); // Product's name
    category             : String;      // The product category (e.g., Electronics)
    features             : String;      // Key features, comma-separated
    generatedDescription : LargeString; // To store the AI-generated text
}