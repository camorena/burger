$(document).ready(function() {
  var burgerContainer = $(".burger-container");
  // Click event to delete a burger
  $(document).on("click", "button.delete", handleBurgerDelete);
  var burgers;

  // List all burgers
  getBurgers();

  // This function grabs Burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      console.log("Burgers", data);
      burgers = data;
      if (!burgers || !burgers.length) {
        displayEmpty();
      } else {
        displayBurgers();
      }
    });
  }

  // This function does an API call to delete Burgers
  function deleteBurger(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(function() {
      getBurgers();
    });
  }

  // burgerContainer
  function displayBurgers() {
    burgerContainer.empty();
    var BurgersToAdd = [];
    for (var i = 0; i < Burgers.length; i++) {
      BurgersToAdd.push(createNewBurger(Burgers[i]));
    }
    burgerContainer.append(BurgersToAdd);
  }

  // This function constructs a Burger's HTML
  function createNewBurger(burger) {
    var newBurger = $("<div>");
    var newBgImg = $(
      "<img src='https://us.123rf.com/450wm/juliarstudio/juliarstudio1601/juliarstudio160102455/51730485-hamburger-sign-in-cartoon-style-on-transparent-background.jpg?ver=6' alt='Burger' style='width:100%'>"
    );
    newBgImg.addClass(".burger-devoure");
    var newBgDelBtn = $("<button>");
    newBgDelBtn.text("Devour!");
    newBgDelBtn.addClass("delete btn");
    newBurger.append(newBgImg);
    newBurger.append(newBgDelBtn);
    newBurger.data("burger", burger);
    return newBurger;
  }

  // This function figures out which Burger we want to delete and then calls
  // deleteBurger
  function handleBurgerDelete() {
    var currentBurger = $(this)
      .parent()
      .parent()
      .data(".burger-devoure");
    deleteBurger(currentBurger.id);
  }

  // This function displays a message when there are no Burgers
  function displayEmpty() {
    burgerContainer.empty();
    var msg = $("<h2>");
    msg.css({ "text-align": "center", "margin-top": "50px" });
    msg.html("No Burgers yet ! Please order a new  Burger.");
    burgerContainer.append(msg);
  }
});
