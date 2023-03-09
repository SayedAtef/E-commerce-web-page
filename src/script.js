// This function will be called upon loading
// it checks if there is data stored in localStorage will not add new data
// if there isn't data in localStorage it will add new data
function storeData() {
  // Define an array of data
  const myArray = [
    {
      product_name: "Airpods",
      product_price: "100",
      product_image: "/img/airpods.png",
      added_to_cart: false,
    },
    {
      product_name: "Bag",
      product_price: "20",
      product_image: "/img/bag.png",
      added_to_cart: false,
    },
    {
      product_name: "Bottle",
      product_price: "10",
      product_image: "/img/bottle.png",
      added_to_cart: false,
    },
    {
      product_name: "Headphone",
      product_price: "90",
      product_image: "/img/headphone.png",
      added_to_cart: false,
    },
    {
      product_name: "Iphone",
      product_price: "500",
      product_image: "/img/iphone.png",
      added_to_cart: false,
    },
    {
      product_name: "Watch",
      product_price: "200",
      product_image: "/img/watch.png",
      added_to_cart: false,
    },
  ];

  // Convert the array to a string using JSON.stringify
  const myArrayString = JSON.stringify(myArray);

  if (localStorage.getItem("myData") === null)
    localStorage.setItem("myData", myArrayString);
}
