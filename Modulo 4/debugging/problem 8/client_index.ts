import Axios from "axios";



async function main() {
  const get_all_response = await Axios.get("http://localhost:8081/items/");
  console.info(get_all_response.data);

  await addItem({ id: 100, nombre: "Oliver", carro: "Veloster" });
}

async function addItem(item: any) {
  const post_item_response = await Axios.post(`http://localhost:8081/item/${item.id}`, { ...item });
  console.info(post_item_response.data);
}

main();