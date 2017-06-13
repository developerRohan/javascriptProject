var budgetController = (function(){

  var Expense = function(id , description , value){
    this.id = id;
    this.description = description;
    this.value = value
  };

  var Income = function(id , description , value){
    this.id = id;
    this.description = description;
    this.value = value
  };

   //var allExpenses = [];
   //var allIncome = [];
   //var totalExpenses = 0;
  //rather than declaring many variables , we can maintain all that in data structure
  //, thus we declare the 'data' data structure  and store instances of expenses and income


   var data = {
     allItems : {
      exp: [],
      inc: []
    } ,
    totals : {
      exp:0,
      inc:0
    },
      budget : 0,
      percentage : -1

  };

  var calculateTotal = function(type) {
      var sum = 0;
      data.allItems[type].forEach(function(cur) {
          sum += cur.value;
      });
      data.totals[type] = sum;
  };


return{
  addItem : function(type , des , val){
    var newItem  , ID ;

    if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
    } else {
        ID = 0;
    }

    if(type === 'exp'){
      newItem = new Expense(ID,des,val);
    }else if (type === 'inc'){
      newItem = new Income(ID,des,val);
    }

    data.allItems[type].push(newItem);
    return newItem;
  },

  calculateBudget : function(){
    //calculate the total income and expenses
      calculateTotal('exp');
      calculateTotal('inc');
    //calculate the total budget
      data.budget = data.totals.inc - data.totals.exp;
    //calculate the percentages
    if (data.totals.inc > data.totals.exp && data.totals.inc > 0) {
          data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      }else{
          data.percentage = -1;
      }

  },

  getBudget: function() {
      return {
          budget: data.budget,
          totalInc: data.totals.inc,
          totalExp: data.totals.exp,
          percentage: data.percentage
      };
  },


  testing: function() {
            console.log(data);
  }
};

})();



var UIController = (function(){
 var DOMstrings = {
   inputType: '.add__type',
   inputDescription: '.add__description',
   inputValue: '.add__value',
   inputBtn: '.add__btn',
   incomeContainer: '.income__list',
   expensesContainer: '.expenses__list',
   budgetLabel: '.budget__value',
   incomeLabel: '.budget__income--value',
   expensesLabel: '.budget__expenses--value',
   percentageLabel: '.budget__expenses--percentage',
 };


  return{
    getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

    addListItem: function(obj, type) {
          var html, newHtml, element;
          // Create HTML string with placeholder text

          if (type === 'inc') {
              element = DOMstrings.incomeContainer;

              html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
          } else if (type === 'exp') {
              element = DOMstrings.expensesContainer;

              html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
          }

          // Replace the placeholder text with some actual data
          newHtml = html.replace('%id%', obj.id);
          newHtml = newHtml.replace('%description%', obj.description);
          newHtml = newHtml.replace('%value%', obj.value, type);

          // Insert the HTML into the DOM
          document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
      },

    clearFields: function() {
          var fields, fieldsArr;

          //query selector returns a list
          fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
          // we convert the list to the array by using array functions to the list
          fieldsArr = Array.prototype.slice.call(fields);
          fieldsArr.forEach(function(current, index, array) {
              current.value = "";
          });

          fieldsArr[0].focus();
      },

      displayBudget: function(obj) {
        document.querySelector(DOMstrings.budgetLabel).textContent =obj.budget;
        document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
        document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
          if (obj.percentage > 0) {
              document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
          } else {
              document.querySelector(DOMstrings.percentageLabel).textContent = '---';
          }

      },

        getDOMstrings: function() {
            return DOMstrings;
        }
  };
})();




var controller = (function(budgetCtrl, UICtrl) {

  var updateBudget = function(){
        //update the budget
        budgetCtrl.calculateBudget();
        //return the budget
        var budget =   budgetCtrl.getBudget();
        //display the budget on UIController
        UICtrl.displayBudget(budget);
  };

  var ctrlAddItem = function(){
    //1.get the input value
  var input = UICtrl.getInput();
    //console.log(input);

  if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // 2. Add the item to the budget controller
      newItem = budgetCtrl.addItem(input.type, input.description, input.value);

      // 3. Add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      //4.clear the fields
      UICtrl.clearFields();

      //calculate and update the budgetCtrl
      updateBudget();
    }
  };

  var setupEventListeners = function() {
    var DOM = UICtrl.getDOMstrings();

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);


     //because we want the data to add on enter key
    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });
  };

  return{
    init: function(){
      setupEventListeners();
    }
  }
})(budgetController, UIController);


controller.init();
