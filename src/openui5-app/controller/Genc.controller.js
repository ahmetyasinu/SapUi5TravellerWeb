sap.ui.define([
  'app/controller/BaseController',
  "sap/ui/model/json/JSONModel",
  "app/service/TravellerService"
], function (BaseController, JSONModel,TravellerService) {
  "use strict";

  var self = Object.create(null);
  var addModel = new JSONModel();
  let travellerService  = new TravellerService();


  return BaseController.extend("app.controller.Genc", {

    onInit: function () {

      self = this;

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("add").attachPatternMatched(this.onRouteMatched, this);
    },


    onRouteMatched: function () {
      self.clearModels();
      self.setModels();

    },
    addTravels: function(){
      // let dashboardMockData = jQuery.sap.getModulePath("app", "/") + "model/travels.json";
      // travellerModel.loadData(dashboardMockData);

    },


    clearModels: function () {
      addModel.setData({});
    },

    setModels: function () {
      let oView = self.getView();
      oView.setModel(addModel, "add");
    }

  });
});
