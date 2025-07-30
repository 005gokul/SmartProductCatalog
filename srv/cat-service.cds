using my.smartproductcatalog as db from '../db/schema';

service CatalogService {
    @odata.draft.enabled
    entity Products as projection on db.Products;
}