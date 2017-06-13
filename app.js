var controller = (function(budgetCtrl, UICtrl) {

    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);


         //because we want the data to add on enter key
         document.addEventListener('keypress', function(event) {
             if (event.keyCode === 13 || event.which === 13) {
                 ctrlAddItem();
             }
         });
      }
})(budgetController, UIController);


var budgetController = (function(){

});


var UIController = (function(){

});
