sap.ui.define( ["sap/ui/core/mvc/Controller", "sap/ui/Device"], function (Controller, Device) {
	"use strict";

	return Controller.extend("sap.ui.core.sample.RoutingMD.routingApp.controller.Master", {
		onToPage1 : function () {
			this.getOwnerComponent().getRouter().navTo("page1", {}, !Device.system.phone);
		}
	});

}, /* bExport= */ true);
