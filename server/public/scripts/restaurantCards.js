/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/

function deleteRestaurantCard(event)
{
    const deleteButton = event.target;
    const restaurantCard = deleteButton.closest('.restaurantItem');
    restaurantCard.remove();
}

function deleteListeners()
{
    const deleteButtons = document.querySelectorAll('.deleteButton')
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteRestaurantCard)
    });
}

document.addEventListener('DOMContentLoaded', deleteListeners);
