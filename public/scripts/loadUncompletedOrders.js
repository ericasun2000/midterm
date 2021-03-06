const loadUncompletedOrders = () => {
  const time = 5 * 1000; // minutes * 60s/min * 1000ms/s
  $.ajax({
    method: "GET",
    url: "/orders/uncompleted",
    dataType: "json",
    success: function (orders) {
      $("#uncompleted-orders").empty();
      renderOrders(orders);

    },
    complete: () => setTimeout(loadUncompletedOrders, time)
  });
};

const renderOrders = function (orders) {
  for (const order of orders) {
    $("#uncompleted-orders").append(createOrdersElement(order));
  }
};

const createOrdersElement = function (order) {
  return `<li> Order ID : ${order.id}</li>`;
};