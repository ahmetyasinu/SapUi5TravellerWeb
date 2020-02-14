sap.ui.define([
  'app/controller/BaseController',
  "sap/ui/model/json/JSONModel",
  "app/service/TravellerService"

], function (BaseController, JSONModel, TravellerService) {
  "use strict";

  let self = Object.create(null);
  let updateModel = new JSONModel();
  let travellerService = new TravellerService();
  let id = null;


  return BaseController.extend("app.controller.Update", {

    onInit: function () {

      self = this;
      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("update").attachPatternMatched(this.onObjectMatched,this);
    },

    onObjectMatched: function (oEvent) {
      id=oEvent.getParameter("arguments").invoicePath;
      self.clearModels();
      self.setModels();
      self.initTravelsById(id);
    },
    updatePage: function(){
      travellerService.update(id,updateModel.getData(),
        function (response) {
          updateModel.setSizeLimit(response.data.length);
          updateModel.setData(response.data);
          alert("Güncelleme Başarıyla Yapıldı.");
          self.getRouter().navTo('traveller');

        },

        function (error) {
          alert("Başarısız");
          sap.m.MessageToast.show("Başarısız");

        })


    },


    initTravelsById: function (id) {
      // let dashboardMockData = jQuery.sap.getModulePath("app", "/") + "model/travels.json";
      // travellerModel.loadData(dashboardMockData);


      travellerService.findById(
        id,
        function (response) {
          updateModel.setSizeLimit(response.data.length);
          updateModel.setData(response.data);
        },

        function (error) {
          alert("Başarısız");
          sap.m.MessageToast.show("Başarısız");

        }
      );


    },
    setModels: function () {
      let oView = self.getView();
      oView.setModel(updateModel, "update");
    },

    clearModels: function () {
      updateModel.setData({});
    },


  });
});
