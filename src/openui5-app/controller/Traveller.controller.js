sap.ui.define([
  'app/controller/BaseController',
  "sap/ui/model/json/JSONModel",
  "app/service/TravellerService"
], function (BaseController, JSONModel,TravellerService) {
  "use strict";

  let self = Object.create(null);
  let travellerModel = new JSONModel();
  let travellerService  = new TravellerService();
  let id = null;
  return BaseController.extend("app.controller.Traveller", {

    onInit: function () {

      self =this;

      var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.getRoute("traveller").attachPatternMatched(this.onRouteMatched, this);
    },


    onRouteMatched: function () {


      self.clearModels();
      self.setModels();
      self.getTravels();

    },


    getTravels: function(){
      // let dashboardMockData = jQuery.sap.getModulePath("app", "/") + "model/travels.json";
      // travellerModel.loadData(dashboardMockData);

      travellerService.findAll(
        function(response){
            travellerModel.setSizeLimit(response.data.length);
            travellerModel.setData(response.data);
            travellerModel.getData().forEach(a=>{
              a.enabled=true;
            });
        },

        function(error){
            alert("Başarısız");
            sap.m.MessageToast.show("Başarısız");

        }
      );



    },
    onDeleteTravel:function(oEvent){
      let selectedRow = oEvent.getSource().getBindingContext("traveller").getObject();
      id=selectedRow.id;
      console.log(id);
      travellerService.delete(id,
        function (response) {
          self.getTravels();
          alert("Güncelleme Başarıyla Yapıldı.");

        },

        function (error) {
          alert("Başarısız");
          sap.m.MessageToast.show("Başarısız");

        })

    },
    disable: function(){
     /* self.getView().byId("endDp").setEnabled(false);
      self.getView().byId("endDp").setVisible(false);
      console.log(self.getView().byId("endDp"));*/


    },

    clearModels: function () {
      travellerModel.setData({});
    },

    setModels: function () {
      let oView = self.getView();
      oView.setModel(travellerModel, "traveller");
    },
    onPressAdd: function () {
      self.getRouter().navTo('add');

    },
    onUpdateTravel: function(oEvent){
      let selectedRow = oEvent.getSource().getBindingContext("traveller").getObject();
      self.getRouter().navTo('update', {
        invoicePath: selectedRow.id});
      id=oEvent.getParameter("arguments").invoicePath;
    }

  });
});
