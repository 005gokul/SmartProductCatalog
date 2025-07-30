sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/sap/catalog/productcatalogui/test/integration/FirstJourney',
		'com/sap/catalog/productcatalogui/test/integration/pages/ProductsList',
		'com/sap/catalog/productcatalogui/test/integration/pages/ProductsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProductsList, ProductsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/sap/catalog/productcatalogui') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProductsList: ProductsList,
					onTheProductsObjectPage: ProductsObjectPage
                }
            },
            opaJourney.run
        );
    }
);