namespace my.smartproductcatalog;
using { cuid, managed } from '@sap/cds/common';

entity Products : cuid, managed {
    name                 : String(100);
    category             : String;
    features             : String;
    generatedDescription : LargeString;
}