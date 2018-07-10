sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/GroupHeaderListItem",
	"UI5ConOnlineApp/formatter/formatter",
	
], function (Controller, GroupHeaderListItem, formatter) {
	"use strict";

	return Controller.extend("UI5ConOnlineApp.controller.View1", {
		formatter: formatter,
		onInit: function(){
				
		},
		fnGetGroupHeader: function (oGroup) {
			return new GroupHeaderListItem({
				title: oGroup.key,
				upperCase: false
			}).addStyleClass("sapMH1Style");
		},
		handleNewToDoButtonPress: function () {

		},
		fnEditToDo: function (evt) {
			var oToDoDialog = sap.ui.xmlfragment( "UI5ConOnlineApp.fragments.ToDo", this.getView().getController() );
			oToDoDialog.open();
			
			//Bind Data
			
			//Unselect the item, so that it can be selected again
			var oList = this.byId("ToDoList");
			var oSelectedItem = oList.getSelectedItem();
			oList.setSelectedItem(oSelectedItem, false);
		},
		fnToDoDone: function (oEvent) {
			//Mark as done
			var oModel = this.getView().getModel();
			oModel.update("", oData, {
				success: mySuccessHandler,
				error: myErrorHandler
			});
		},
		mySuccessHandler: function () {

		},
		myErrorHandler: function (error) {

		},
		fnClose: function(evt){
			evt.getSource().getParent().close();
		}
	});

});