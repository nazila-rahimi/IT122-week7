export const items = [
  { id: 1, name: "iPhone 15 Pro Max", type: "Smartphone", year: 2024, price: "$1,199" },
  { id: 2, name: "MacBook Pro M3", type: "Laptop", year: 2024, price: "$1,999" },
  { id: 3, name: "iPad Air M2", type: "Tablet", year: 2024, price: "$899" },
  { id: 4, name: "Apple Vision Pro", type: "Mixed Reality Headset", year: 2024, price: "$3,499" },
  { id: 5, name: "Apple Watch Ultra 2", type: "Smartwatch", year: 2024, price: "$799" }
];

export function getAll() {
  return items;
}

export function getItem(id) {
  return items.find(item => item.id === parseInt(id));
}
