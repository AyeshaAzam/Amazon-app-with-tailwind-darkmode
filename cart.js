// want to show cart items from database
//get all items from firebase and for each items add inner html to the cart-items
// onSnapshot() --- has constant connection and dynamic updating

function getCartItems() {
  db.collection("cart-items").onSnapshot((snapshot) => {
    let cartItems = [];
    snapshot.docs.forEach((doc) => {
      cartItems.push({
        id: doc.id,
        // image:  doc.data().image,
        // make:  doc.data().make,
        // name:  doc.data().name,
        // rating:  doc.data().rating,
        // price:  doc.data().price,
        // quantity: 1,

        // instead of repeating the items, in short do:
        ...doc.data(),
      });
    });
    //console.log(cartItems, "what is in the cartItems");
    generateCartItems(cartItems);
    getTotalCostOfItems(cartItems);
  });
}

// totalCost:
//total-cost-number
function getTotalCostOfItems(items) {
  console.log("totalItems", items);
  let totalCost = 0;
  items.forEach((item) => {
    totalCost += item.quantity * item.price;
  });
  document.querySelector(".total-cost-number").innerText =
    numeral(totalCost).format("$0,0.00");
}

function decreaseCount(itemId) {
  // grab data from database
  let cartItem = db.collection("cart-items").doc(itemId);
  // onece we have the itemid then we will check if item exists in db and if item/quantity is not zero then update
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().quantity > 1) {
        cartItem.update({
          quantity: doc.data().quantity - 1,
        });
      }
    }
  });
}

function increaseCount(itemId) {
  let cartItem = db.collection("cart-items").doc(itemId);
  cartItem.get().then(function (doc) {
    if (doc.exists) {
      if (doc.data().quantity > 0) {
        cartItem.update({
          quantity: doc.data().quantity + 1,
        });
      }
    }
  });
}

function deleteItem(itemId) {
  db.collection("cart-items").doc(itemId).delete();
}

//adding this attribute "data-id="${cartItem.id}"", in chevron  div to know exactly which Item we are increasing and decreasing
function generateCartItems(cartItems) {
  let itemsHTML = "";
  cartItems.forEach((cartItem) => {
    itemsHTML += `
     <div class="cart-item flex items-center  pb-5 border-b border-gray-100 ">
     <div class="cart-item-image w-40 h-24 bg-white p-2 rounded-lg">
       <img class="w-full h-full object-contain"
         src="${cartItem.image}" alt="logo">
     </div>
     <div class="cart-item-details flex-grow ">
       <div class="cart-item-title font-bold text-sm text-gray-600">
         ${cartItem.name}
       </div>
       <div class="cart-item-brand  text-sm text-gray-400">
       ${cartItem.make}
       </div>
     </div>
     <div class="cart-item-counter w-48 flex items-center"> 
       <div data-id="${cartItem.id}"
           class="counter-left bg-gray-100 rounded cursor-pointer text-gray-400 h-6 w-6 flex items-center justify-center mr-3 hover:bg-gray-300">
         <i class="fas fa-chevron-left fa-xs"></i>
       </div>
       <h1 class="text-gray-400">x${cartItem.quantity}</h1>
       <div data-id="${cartItem.id}"
         class="counter-right bg-gray-100  rounded cursor-pointer text-gray-400 h-6 w-6 flex items-center justify-center ml-3  hover:bg-gray-300">
         <i class="fas fa-chevron-right fa-xs"></i>
       </div>
     </div>

     <div class="cart-item-total-cost w-48 font-bold text-gray-400">
       ${numeral(cartItem.price * cartItem.quantity).format("$0,0.00")}
     </div>

     <div data-id="${cartItem.id}" 
          class="cart-item-delete  w-10 font-bold text-gray-300  cursor-pointer hover:text-gray-500">
       <i class="fas fa-times"></i>
     </div>
     </div>  
     `;
  });

  document.querySelector(".cart-items").innerHTML = itemsHTML;
  counterCreateEventListeners();
}

// for chevron-left and chevron-right
function counterCreateEventListeners() {
  let decreaseButtons = document.querySelectorAll(".counter-left");
  console.log(decreaseButtons, "decreaseButtons");
  let increaseButtons = document.querySelectorAll(".counter-right");
  let deleteButton = document.querySelectorAll(".cart-item-delete");

  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      decreaseCount(button.dataset.id);
    });
  });

  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      increaseCount(button.dataset.id);
    });
  });

  deleteButton.forEach((button) => {
    button.addEventListener("click", () => {
      deleteItem(button.dataset.id);
    });
  });
}

getCartItems();
