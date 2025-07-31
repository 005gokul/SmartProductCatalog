using CatalogService as service from '../../srv/cat-service';

annotate service.Products with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Category',
                Value : category,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Features',
                Value : features,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Generated Description',
                Value : generatedDescription,
            }
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        }
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Category',
            Value : category,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Features',
            Value : features,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Generated Description',
            Value : generatedDescription,
        }
    ]
);
