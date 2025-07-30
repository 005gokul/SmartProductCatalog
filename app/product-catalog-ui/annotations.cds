using CatalogService as service from '../../srv/cat-service';
annotate service.Products with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'name',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : 'baseDescription',
                Value : baseDescription,
            },
            {
                $Type : 'UI.DataField',
                Label : 'stock',
                Value : stock,
            },
            {
                $Type : 'UI.DataField',
                Label : 'generatedDescription',
                Value : generatedDescription,
            },
            {
                $Type : 'UI.DataField',
                Label : 'imageURL',
                Value : imageURL,
            },
            {
                $Type : 'UI.DataField',
                Label : 'imageAnalysis',
                Value : imageAnalysis,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'baseDescription',
            Value : baseDescription,
        },
        {
            $Type : 'UI.DataField',
            Label : 'stock',
            Value : stock,
        },
        {
            $Type : 'UI.DataField',
            Label : 'generatedDescription',
            Value : generatedDescription,
        },
        {
            $Type : 'UI.DataField',
            Label : 'imageURL',
            Value : imageURL,
        },
    ],
);

