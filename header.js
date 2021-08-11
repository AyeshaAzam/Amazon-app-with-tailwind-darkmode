// function getCartItems() {
//   db.collection("cart-items")
//     .get()
//     .then((querySnapshot) => {
//       let totalCount = 0;
//       querySnapshot.forEach((doc) => {
//         // adding up each items/quantity
//         totalCount += doc.data().quantity;
//       });
//       setCartCounter(totalCount);
//     });
// }

// the same above function we will do it by using onSnapshot, to get real time data/counter
//Snapshot does is that 'onSnapshot' have eventlistener, so when something changes inside the fireStore, firebase knows
// that and updates it. ( call the websocket). OnSnapshot it will create a webSocket
function getCartItems() {
  db.collection("cart-items").onSnapshot((snapshot) => {
    let totalCount = 0;
    snapshot.docs.forEach((doc) => {
      // adding up each items/quantity
      totalCount += doc.data().quantity;
    });
    setCartCounter(totalCount);
  });
}

function setCartCounter(totalCount) {
  let count = document.querySelector(".cart-item-counter");
  count.innerText = totalCount;
}

getCartItems();
