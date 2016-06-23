sap.ui.define( ["sap/ui/core/UIComponent"], function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.ui.core.sample.RoutingMD.Component", {

		metadata : {
			dependencies : {
				libs : [
					"sap.m"
				]
			},
			config : {
				sample : {
					iframe : "RoutingMD.html",
					stretch : true,
					files : [
						"routingApp/Component.js",
						"routingApp/view/Master.view.xml",
						"routingApp/view/View1.view.xml",
						"routingApp/controller/View1.controller.js",
						"routingApp/view/View2.view.xml",
						"routingApp/controller/View2.controller.js",
						"routingApp/view/App.view.xml",
						"RoutingMD.html"
					]
				}
			}
		}

	});

}, /* bExport= */ true);

