sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"UI5ConOfflineApp5/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("UI5ConOfflineApp5.Component", {

		metadata: {
			manifest: "json",
			async: true
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
		}
	});

});