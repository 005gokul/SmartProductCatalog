using my.smartproductcatalog as db from '../db/schema';

service CatalogService {
    @odata.draft.enabled
    entity Products as projection on db.Products;

    // The action is defined at the service level and bound to the 'Products' entity
    action Products.uploadImage(mimeType: String, imageData: LargeString) returns {
        success: Boolean;
        message: String;
    };
}