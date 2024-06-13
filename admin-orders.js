document.addEventListener("DOMContentLoaded", function() 
{
    const ordersList = document.getElementById("ordersList");

    function fetchOrders() 
    {
        fetch('http://localhost:3000/orders')
            .then(response => response.json())
            .then(orders => {
                ordersList.innerHTML = '';
                orders.forEach(order => {
                    const orderItem = document.createElement("div");
                    orderItem.classList.add("order-item");
                    orderItem.innerHTML = `
                        <p>ID: ${order.id}</p>
                        <p>Ім'я: ${order.username}</p>
                        <p>Додаткові побажання: ${order.additionalRequests}</p>
                        <p>Елементи замовлення IDs: ${order.orderedItemsIds}</p>
                        <button class="delete-button" data-id="${order.id}">Видалити</button>
                    `;
                    ordersList.appendChild(orderItem);
                });

                document.querySelectorAll(".delete-button").forEach(button => 
                    {
                    button.addEventListener("click", function() {
                        const orderId = this.dataset.id;
                        deleteOrder(orderId);
                    });
                });
            })
            .catch(error => console.error('Error fetching orders:', error));
    }

    function deleteOrder(id) 
    {
        fetch(`http://localhost:3000/orders/${id}`, 
            {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Замовлення успішно видалено.");
                fetchOrders();
            } else {
                alert("Помилка при видаленні замовлення.");
            }
        })
        .catch(error => console.error('Error:', error));
    }

    fetchOrders();
});
