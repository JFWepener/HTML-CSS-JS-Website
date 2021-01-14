var cart = [];

const Item = function(name, price, count) {
  this.name = name;
  this.price = price;
  this.count = count;
};

function generateReference() {
  let reference = 0;
}

function addItemToCart(name, price, count) {
  for (i in cart) {
    if (cart[i].name === name) {
      cart[i].count += count;
      saveCart();
      return;
    }
  }
  if (cart === null) {
    cart = [];
  }
  let item = new Item(name, price, count);
  cart.push(item);
  console.log(cart);
  saveCart();
}

function removeItemFromCart(name) {
  //Removes one item
  for (let i in cart) {
    if (cart[i].name === name) {
      cart[i].count--;
      if (cart[i].count === 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }
  saveCart();
}

function removeItemFromCartAll(name) {
  // removes all of item name
  for (let i in cart) {
    if (cart[i].name === name) {
      cart.splice(i, 1);
      break;
    }
  }
  saveCart();
}

function clearCart() {
  cart = [];
  saveCart();
}

function countCart() {
  // return total count
  let totalCount = 0;
  for (let i in cart) {
    totalCount += cart[i].count;
  }
  return totalCount;
}

function totalCart() {
  // return the total cost
  let totalCost = 0;
  for (let i in cart) {
    totalCost += cart[i].price * cart[i].count;
  }

  return totalCost.toFixed(2);
}

function vatCalc() {
  let vat = 0;
  vat =
    ((totalCart() - Number(discountCoupon()) + Number(getDeliveryOption())) *
      15) /
    100;
  return vat.toFixed(2);
}

function cartTotal() {
  let cartTotal = 0;
  cartTotal = (
    Number(totalCart()) +
    Number(vatCalc()) -
    Number(discountCoupon()) +
    Number(getDeliveryOption())
  ).toFixed(2);
  // alert(cartTotal);
  return cartTotal;
}

// Coupons
var couponValue = new Array();
couponValue["coupon0"] = 0;
couponValue["coupon5"] = 5;
couponValue["coupon10"] = 10;
couponValue["coupon15"] = 15;
couponValue["coupon20"] = 20;

function discountCoupon() {
  // Loops through coupons and return the coupon selected
  var discountCoupon = 0;
  var theForm = document.getElementById("coupons");
  var selectedCoupon = theForm.elements["selectedcoupon"];
  for (var i = 0; i < selectedCoupon.length; i++) {
    if (selectedCoupon[i].checked) {
      discountCoupon = couponValue[selectedCoupon[i].value];
      break;
    }
  }
  return discountCoupon;
}

var deliveryPrices = new Array();
deliveryPrices["None"] = 0;
deliveryPrices["SameDay"] = 100;
deliveryPrices["NextDay"] = 75;
deliveryPrices["TwoDays"] = 50;
deliveryPrices["Economy"] = 25;

function getDeliveryOption() {
  // Loops through delivery options and return option selected.
  var deliveryOptionPrice = 0;
  var theForm = document.getElementById("coupons");
  var selectedDelivery = theForm.elements["deliveryoptions"];
  deliveryOptionPrice = deliveryPrices[selectedDelivery.value];

  return deliveryOptionPrice;
}

function listCart() {
  // returns array of Items
  let cartCopy = [];
  for (var i in cart) {
    var item = cart[i];
    var itemCopy = {};
    for (var p in item) {
      itemCopy[p] = item[p];
    }
    itemCopy.total = (item.price * item.count).toFixed(2);
    cartCopy.push(itemCopy);
  }
  return cartCopy;
}

// Does not work when cart quantity is null
// Get Qty
// function getQty() {
//   let qty = 0;
//   for (let i = 0; i < cart.length; i++) {
//     if (cart.length === 0) {
//       qty = 0;
//     } else {
//       qty += cart[i].count;
//     }
//   }
//   return qty;
// }

function checkOut() {
  alert(
    "Your total cart is " +
      totalCart() +
      " and your reference number is: " +
      Math.floor(Math.random() * 1000)
  );
}

function saveCart() {
  localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

function loadCart() {
  cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

loadCart();
displayCart();

// -----------------Jquery-----------------------

$(".add-to-cart").click(function(e) {
  e.preventDefault();
  let name = $(this).attr("data-name");
  let price = Number($(this).attr("data-price"));
  addItemToCart(name, price, 1);
  displayCart();
});

$("#clear-cart").click(function() {
  clearCart();
  displayCart();
});

function displayCart() {
  let cartArray = listCart();
  let output = "";
  for (let i in cartArray) {
    output +=
      "<li>" +
      cartArray[i].name +
      " " +
      cartArray[i].count +
      " x " +
      cartArray[i].price +
      " = " +
      cartArray[i].total +
      " <button class='plus-item' data-name='" +
      cartArray[i].name +
      "'>+</button> " +
      " <button class='subtract-item' data-name='" +
      cartArray[i].name +
      "'>-</button> " +
      " <button class='delete-item' data-name='" +
      cartArray[i].name +
      "'>X</button> " +
      "</li>";
  }
  $("#show-cart").html(output);
  $("#vat-cart").html(vatCalc());
  $("#discount-coupon").html(discountCoupon());
  $("#delivery-option").html(getDeliveryOption());
  $("#total-cart").html(totalCart());
  $("#total-cart-vat").html(cartTotal());
  $("#cart-total").html(countCart());
}

$("#show-cart").on("click", ".delete-item", function(e) {
  var name = $(this).attr("data-name");
  removeItemFromCartAll(name);
  displayCart();
});

$("#show-cart").on("click", ".subtract-item", function(e) {
  var name = $(this).attr("data-name");
  removeItemFromCart(name);
  displayCart();
});

$("#show-cart").on("click", ".plus-item", function(e) {
  var name = $(this).attr("data-name");
  addItemToCart(name, 0, 1);
  displayCart();
});

$("#hideBtn").click(function() {
  $("#cartDiv").slideUp();
});

$("#showBtn").click(function() {
  $("#cartDiv").slideDown();
});

$("#chain-btn").click(function() {
  $(".chain-event")
    .css("background-color", "gray")
    .slideUp(3000)
    .slideDown(3000);
});

$("#check-out").click(function(){
  checkOut();
});
