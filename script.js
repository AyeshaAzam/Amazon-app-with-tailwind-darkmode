// we will use this script to get the data from the firebase
// check : https://firebase.google.com/docs/firestore/quickstart
/*
querySnapshot is basically making a snapshot of everything you have in your firestore
and then looping through all of the documents/ items. its like taking a pics....
*/
function getItems() {
  db.collection("items")
    .get()
    .then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
        items.push({
          id: doc.id,
          image: doc.data().image,
          name: doc.data().name,
          make: doc.data().make,
          price: doc.data().price,
          rating: doc.data().rating,
        });
      });
      // console.log(items);
      generateItems(items);
    });
}

// working with string
// function generateItems(items) {
//   let itemsHTML = "";
//   items.forEach((item) => {
//     itemsHTML += `
//     <div class="hot-deals-product mr-5">
//               <div class="product-image  h-52 w-48 bg-white rounded-lg p-4">
//                 <img class="w-full h-full object-contain "
//                   src="${item.image}">
//               </div>
//               <div class=" product-name text-gray-700 font-bold mt-2 text-sm">
//                 ${item.name}
//               </div>
//               <div class="product-make text-green-700 font-bold ">
//               ${item.make}
//               </div>
//               <!--my-1 is margintop and marginbottom, the y-axis, and for right and left is mx-1-->
//               <div class="product-rating text-yellow-300 font-bold my-1">
//                 ⭐⭐⭐⭐⭐ ${item.rating}
//               </div>
//               <div class="product-price font-bold text-gray-700 text-lg mb-4">
//               $ ${item.price}
//               </div>
//               <div
//                 class="Add-to-cart-button w-28 h-8  flex items-center justify-center  bg-yellow-500     cursor-pointer rounded text-white text-md hover:bg-yellow-600">
//                 Add to cart
//               </div>

//             </div> `;

//     // now add in the frontend index.html
//     document.querySelector(".hot-deals-products").innerHTML = itemsHTML;
//   });
// }

function addToCard(item) {
  //console.log("Item", item);
  // add data to the database
  let cartItems = db.collection("cart-items").doc(item.id);
  cartItems.get().then(function (doc) {
    console.log("doc", doc);
    // if item exits, add quantity to current one, otherwise create a new cart item
    if (doc.exists) {
      cartItems.update({
        quantity: doc.data().quantity + 1,
      });
    } else {
      cartItems.set({
        image: item.image,
        make: item.make,
        name: item.name,
        rating: item.rating,
        price: item.price,
        quantity: 1,
      });
    }
  });
}

// To add or work with EventListener() funtion, we need to create object{}, we cannot work with string
// so lets converts the above function to object:

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    //object
    let doc = document.createElement("div");
    doc.classList.add("hot-deals-product", "mr-5");
    doc.innerHTML = `
             <div class="product-image  h-52 w-48 bg-white rounded-lg p-4">
                <img class="w-full h-full object-contain "
                  src="${item.image}">
              </div>
              <div class=" product-name text-gray-700 font-bold mt-2 text-sm">
                ${item.name}
              </div>
              <div class="product-make text-green-700 font-bold ">
              ${item.make}
              </div>
              <!--my-1 is margintop and marginbottom, the y-axis, and for right and left is mx-1-->
              <div class="product-rating text-yellow-300 font-bold my-1">
                ⭐⭐⭐⭐⭐ ${item.rating}
              </div>
              <div class="product-price font-bold text-gray-700 text-lg mb-4">
               ${numeral(item.price).format("$0,0.00")}
              </div>
    `;

    let addToCartEL = document.createElement("div");
    addToCartEL.classList.add(
      "Add-to-cart-button",
      "w-28",
      "h-8",
      "flex",
      "items-center",
      "justify-center",
      "bg-yellow-500",
      "cursor-pointer",
      "rounded",
      "text-white",
      "text-md",
      "hover:bg-yellow-600"
    );
    addToCartEL.innerText = "Add to cart";
    addToCartEL.addEventListener("click", function () {
      addToCard(item);
    });
    doc.appendChild(addToCartEL);
    document.querySelector(".hot-deals-products").appendChild(doc);
    //console.log(addToCartEL);
  });
}

getItems();
