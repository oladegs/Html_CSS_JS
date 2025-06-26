export const orders = JSON.parse(localStorage.getItem("orders")) || [];

function saveToStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });

  return matchingOrder;
}
