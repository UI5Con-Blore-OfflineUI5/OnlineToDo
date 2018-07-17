sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/GroupHeaderListItem",
	"UI5ConOfflineApp/formatter/formatter",
	"sap/ui/core/format/DateFormat"
], function (Controller, GroupHeaderListItem, formatter, DateFormat) {
	"use strict";

	return Controller.extend("UI5ConOfflineApp.controller.View1", {
		formatter: formatter,
		onInit: function () {

		},
		onBeforeRendering: function () {
			this.fnFetchToDos();
		},
		fnFetchToDos: function () {
			var oJSONModel = this.getView().getModel("oJSONModel");
			var oDataModel = this.getView().getModel();
			oJSONModel.setData({
				"ToDos": null
			});
			oDataModel.read("/ToDos", {
				success: function (oData) {
					oJSONModel.setData({
						"ToDos": oData.results
					});
				},
				error: function (response) {}
			});
		},
		fnGetGroupHeader: function (oGroup) {
			return new GroupHeaderListItem({
				title: oGroup.key,
				upperCase: false
			}).addStyleClass("sapMH1Style");
		},
		handleNewToDoButtonPress: function () {
			var oToDoDialog = sap.ui.xmlfragment("UI5ConOfflineApp.fragments.ToDoNew", this.getView().getController());
			//Bind Data
			this.getView().addDependent(oToDoDialog);
			oToDoDialog.open();

		},
		fnSave: function (evt) {
			var oDataModel = this.getView().getModel();
			var oJSONModel = this.getView().getModel("oJSONModel");
			var Content = evt.getSource().getParent().getContent()[0].getItems()[0].getItems()[0].getValue();
			var Due = evt.getSource().getParent().getContent()[0].getItems()[0].getItems()[2].getDateValue();
			var dateFormat = DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTKK:mm:ss"
			});
			var dateOdataVal = dateFormat.format(Due);
			var Data = {
				"Content": Content,
				"DueDate": dateOdataVal
			};
			var array = oJSONModel.getData().ToDos;
			array.push(Data);
			oJSONModel.setData({
				"ToDos": array
			});
			oDataModel.create("/ToDos", Data, {
				success: function (response) {

				}.bind(this),
				error: function (response) {

				}
			});
			evt.getSource().getParent().close();

		},
		fnEditToDo: function (evt) {
			var oToDoDialog = sap.ui.xmlfragment("UI5ConOfflineApp.fragments.ToDo", this.getView().getController());
			//Bind Data
			this.getView().addDependent(oToDoDialog);
			var oList = this.byId("ToDoList");
			var oSelectedItem = oList.getSelectedItem();
			oToDoDialog.setBindingContext(oSelectedItem.getBindingContext("oJSONModel"), "oJSONModel");

			oToDoDialog.open();
			//Unselect the item, so that it can be selected again
			oList.setSelectedItem(oSelectedItem, false);
		},
		fnToDoDone: function (oEvent) {
			var itemId = oEvent.getSource().getParent().getBindingContext("oJSONModel").getObject().id;
			var Path = oEvent.getSource().getParent().getBindingContext("oJSONModel").sPath;
			this.getView().getModel("oJSONModel").setProperty(Path + "/Done", true);
			var Payload = this.getView().getModel("oJSONModel").getProperty(Path);
			//Mark as done
			var oModel = this.getView().getModel();
			oModel.update("/ToDos('" + itemId + "')", Payload, {
				success: this.mySuccessHandler(),
				error: this.myErrorHandler()
			});
		},
		mySuccessHandler: function (Response) {
			this.fnFetchToDos();
		},
		myErrorHandler: function (error) {

		},
		fnClose: function (evt) {
			evt.getSource().getParent().close();
		},
		onChangeDatePicker: function (oEvent) {
			// Format date to remove UTC issue
			var oDatePicker = oEvent.getSource();
			var oNewDate = oDatePicker.getDateValue();
			if (oNewDate) {
				oDatePicker.setDateValue(this.convertDateTimeToDateOnly(oNewDate));
			}
		},
		convertDateTimeToDateOnly: function (oDateTime) {
			var oFormatDate = DateFormat.getDateTimeInstance({
				pattern: "yyyy-MM-ddTKK:mm:ss"
			});
			var oDate = oFormatDate.format(oDateTime);
			oDate = oDate.split("T");
			var oDateActual = oDate[0];
			return new Date(oDateActual);
		}
	});

});