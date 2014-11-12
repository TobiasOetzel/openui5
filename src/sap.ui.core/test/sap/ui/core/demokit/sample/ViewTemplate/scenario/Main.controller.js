/*!
 * ${copyright}
 */
jQuery.sap.require("sap.ui.model.odata.ODataUtils");

sap.ui.controller("sap.ui.core.sample.ViewTemplate.scenario.Main", {
	onInit: function () {
		var oEntityTypes = {
				selectedType: "Product",
				icon: jQuery.sap.getUriParameters().get("realOData") === "true" ?
						"sap-icon://building" : "sap-icon://record",
				types: [
					{
						type: "BusinessPartner",
						itemKey: "BusinessPartnerID",
						itemKeyType: "Edm.String",
						set: "/BusinessPartnerSet",
						target: "GWSAMPLE_BASIC.BusinessPartner",
					},
					{
						type: "Contact",
						itemKey: "ContactGuid",
						itemKeyType: "Edm.Guid",
						set: "/ContactSet",
						target: "GWSAMPLE_BASIC.Contact",
					},
					{
						type: "Product",
						itemKey: "ProductID",
						itemKeyType: "Edm.String",
						set: "/ProductSet",
						target: "GWSAMPLE_BASIC.Product",
					},
					{
						type: "SalesOrder",
						itemKey: "SalesOrderID",
						itemKeyType: "Edm.String",
						set: "/SalesOrderSet",
						target: "GWSAMPLE_BASIC.SalesOrder",
					}
				]
			};

		this.getView().setModel(new sap.ui.model.json.JSONModel(oEntityTypes), "ui");
	},

	//TODO clarify with UI5 Core: why can view models not be accessed in onInit?
	onBeforeRendering: function () {
		this._bindSelectInstance();
	},

	onChangeType: function (oEvent) {
		this._bindSelectInstance();
	},

	onChangeInstance: function (oEvent) {
		var sInstanceKey = this.getView().getModel("ui").getProperty("/selectedInstance"),
			oType = this._getSelectedType();

		this._showDetails(oType.set + "("
			+ sap.ui.model.odata.ODataUtils.formatValue(sInstanceKey, oType.itemKeyType)
			+ ")");
	},

	_bindSelectInstance: function() {
		var oBinding,
			oType = this._getSelectedType(),
			oControl = this.getView().byId("selectInstance");

		oControl.bindAggregation("items", {
			path: oType.set,
			template: new sap.ui.core.ListItem({
				text: "{" + oType.itemKey + "}",
				key: "{" + oType.itemKey + "}"
			})
		});

		oBinding = oControl.getBinding("items");
		oBinding.attachDataReceived(
			function () { //select first instance
				this._showDetails(oBinding.getContexts()[0].getPath());
			},
			this);
	},

	_getSelectedType: function () {
		var oView = this.getView(),
			aTypes = oView.getModel("ui").getProperty("/types");

		for (i = 0; i < aTypes.length; i += 1) {
			if (aTypes[i].type === oView.getModel("ui").getProperty("/selectedType")) {
				return aTypes[i];
			}
		}
	},

	_showDetails: function (sPath) {
		var sANNO_PATH = "/schemas/GWSAMPLE_BASIC/annotations",
			oDetailView,
			oView = this.getView(),
			oMetaContext,
			oMetaModel = oView.getModel("meta"),
			aAnnotations = oMetaModel.getObject(sANNO_PATH),
			oModel = oView.getModel(),
			i;

		for (i = 0; i < aAnnotations.length; i += 1) {
			if (aAnnotations[i].target === this._getSelectedType().target) {
				oMetaContext = oMetaModel.createBindingContext(sANNO_PATH + "/" + i);
				break;
			}
		}
		oDetailView = sap.ui.view({
			type: sap.ui.core.mvc.ViewType.XML,
			viewName: "sap.ui.core.sample.ViewTemplate.scenario.Detail",
			bindingContexts: {meta: oMetaContext},
			models: {meta: oMetaModel}
		});

		oDetailView.bindElement(sPath, {models: oModel});
		oView.byId("detail").destroyItems().addItem(oDetailView);
	}
});