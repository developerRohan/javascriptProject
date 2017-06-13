var budgetController = (function(){

})();


var UIController = (function(){
 var DOMstrings = {
   inputType: '.add__type',
   inputDescription: '.add__description',
   inputValue: '.add__value',
   inputBtn: '.add__btn',
 };


  return{
    getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },
        getDOMstrings: function() {
            return DOMstrings;
        }
  };
})();



var controller = (function(budgetCtrl, UICtrl) {
  var ctrlAddItem = function(){
    //get the input value
    var input = UICtrl.getInput();
    console.log(input);
  }

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

  return{
    init: function(){
      setupEventListeners();
    }
  }
})(budgetController, UIController);


controller.init();
