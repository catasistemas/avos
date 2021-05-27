const baseUrl = "https://platzi-avo.vercel.app";
const appMount = document.querySelector("#app");

//Usaremos la api int para darle formato a los precios

const formatPrice = (price) =>
  new Intl.NumberFormat("en-EN", {
    style: "currency",
    currency: "USD",
  }).format(price);

//hacemos un fetch
async function fetchData() {
  const res = await fetch(`${baseUrl}/api/avo`);
  const { data: allAvos } = await res.json();

  const nodeArray = allAvos.map((aguacate) => {
    //create image node
    const image = document.createElement("img");
    image.className =
      "h-52 w-max rounded-lg mx-auto md:mx-0 md:mr-6 bg-white-0";
    image.src = `${baseUrl}${aguacate.image}`;

    //create title node
    const title = document.createElement("h2");
    title.className = "text-lg text-red-600 font-bold";
    title.textContent = aguacate.name;

    //create price node
    const price = document.createElement("div");
    price.className =
      "text-gray-100 font-bold rounded-md bg-gray-900 w-20 mx-auto cursor-pointer mb-2";
    price.textContent = formatPrice(aguacate.price);

    // create a title and price item
    const titleAndPrice = document.createElement("div");
    titleAndPrice.className = "text-center pt-5 bg-green-200";
    titleAndPrice.append(title, price);

    //create a card
    const card = document.createElement("div");
    card.className =
      "md:flex flex-col bg-white  shadow-md pt-6 px-0 hover:bg-green-200 h-76 w-72 border border-green-400 my-4";
    card.append(image, titleAndPrice);

    return card;
  });
  appMount.append(...nodeArray);
}
fetchData();
