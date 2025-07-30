sap.ui.define([
    "sap/m/MessageBox",
    "sap/ui/core/mvc/View"
], function (MessageBox, View) {
    "use strict";

    return {
        onAnalyzeImage: function (oEvent) {
            let oView = oEvent.getSource();
            while (oView && !(oView instanceof View)) {
                oView = oView.getParent();
            }

            if (!oView) {
                MessageBox.error("Could not find the parent view.");
                return;
            }

            const oUploader = oView.byId("fileUploader");
            const file = oUploader.getDomRef("fu").files[0];

            if (!file) {
                MessageBox.error("Please select a file first.");
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Data = e.target.result.split(",")[1];
                const oBindingContext = oView.getBindingContext();
                const mimeType = file.type;

                // The path is now relative to the product, so it's much simpler
                const oAction = oBindingContext.getModel().bindContext("CatalogService.Products_uploadImage(...)", oBindingContext);

                oAction.setParameter("mimeType", mimeType);
                oAction.setParameter("imageData", base64Data);

                MessageBox.show("Analyzing image, please wait...");

                oAction.execute().then(() => {
                    const result = oAction.getBoundContext().getObject();
                    if (result.success) {
                        MessageBox.success("Image analysis complete!");
                        oBindingContext.refresh();
                    } else {
                        MessageBox.error(result.message || "An error occurred during analysis.");
                    }
                }).catch((oError) => {
                    MessageBox.error("Failed to call backend action: " + oError.message);
                });
            };
            reader.onerror = (error) => {
                MessageBox.error("Error reading file: " + error);
            };

            reader.readAsDataURL(file);
        }
    };
});