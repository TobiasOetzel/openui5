sap.ui.define( ["sap/ui/core/UIComponent"], function (UIComponent) {
	"use strict";
	return UIComponent.extend("sap.ui.core.sample.RoutingMD.routingApp", {

		metadata: {
			rootView: "sap.ui.core.sample.RoutingMD.routingApp.view.App",
			routing: {
				config: {
					routerClass: "sap.m.routing.Router",
					viewPath: "sap.ui.core.sample.RoutingMD.routingApp.view",
					controlId: "rootControl",
					viewType: "XML"
				},
				routes: [
					{
						name: "master",
						// empty hash - normally the start page
						pattern: "",
						target: ["page1", "master"]
					},
					{
						name: "page1",
						// empty hash - normally the start page
						pattern: "page1",
						target: ["master", "page1"]
					},
					{
						name: "page2",
						pattern: "page2",
						target: ["master", "page2"]
					}
				],
				targets: {
					master: {
						viewName: "Master",
						controlAggregation: "masterPages",
						viewLevel: 0
					},
					page1: {
						viewName: "View1",
						controlAggregation: "detailPages",
						viewLevel: 1
					},
					page2: {
						viewName: "View2",
						controlAggregation: "detailPages",
						viewLevel: 2
					}
				}
			}
		},

		init : function () {
			UIComponent.prototype.init.apply(this, arguments);

			// Parse the current url and display the targets of the route that matches the hash
			this.getRouter().initialize();
		}

	});
}, /* bExport= */ true);
