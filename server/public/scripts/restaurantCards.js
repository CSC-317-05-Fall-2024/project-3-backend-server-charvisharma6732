/* This file should contain definitions for deleteRestaurantCard,
    and js to attach it as a handler per card.
*/

async function deleteRestaurantCard(event)
{
    const deleteButton = event.target;
    const restaurantCard = deleteButton.closest('.restaurantItem');
    const ID = restaurantCard.dataset.id;

    try{
        const response = await fetch(`/api/restaurants/${ID}`, {
            method: 'DELETE',
        });

        if(response.ok)
        {
            fetchAndRenderRestaurants();
        }
        else{
            console.error('Failed to delete');
        }
    } 
    catch(error)
    {
        console.error('Error: ', error)
    }

    restaurantCard.remove();
}

async function fetchAndRenderRestaurants(){
    try{
        const response = await fetch('/api/restaurants');
        const restaurants = await response.json();
    
        const restaurantContainer = document.querySelector('.restaurantContainer');
        restaurantContainer.innerHTML = '';
    
        restaurants.forEach(restaurant => {
            const restaurantCard = document.createElement('div');
            restaurantCard.classList.add('restaurantItem');
            restaurantCard.dataset.id = restaurant.id;
    
            restaurantCard.innerHTML = `
                <img src="${restaurant.photo}" alt="${restaurant.name}">
                <div class="restaurantInfo">
                    <h3>${restaurant.name}</h3>
                    <p>${restaurant.address}</p>
                    <p>${restaurant.phone}</p>
                </div>
                <button class="deleteButton">X</button>
            `;
    
            restaurantContainer.appendChild(restaurantCard);
    
        });
        deleteListeners();
    }
    catch(error)
    {
        console.error('Could not fetch restaurants: ', error)
    }

}


function deleteListeners()
{
    const deleteButtons = document.querySelectorAll('.deleteButton')
    deleteButtons.forEach(button => {
        button.addEventListener('click', deleteRestaurantCard)
    });
}

document.addEventListener('DOMContentLoaded', fetchAndRenderRestaurants);
