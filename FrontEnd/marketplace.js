document.addEventListener('DOMContentLoaded', function() {
    const marketplace = document.getElementById('marketplace');
    const filterBtn = document.getElementById('filterBtn');
    const publishBtn = document.getElementById('publishBtn');

    // Redirigir a la página de publicación al hacer clic en "Publicar"
    publishBtn.addEventListener('click', function() {
        window.location.href = 'publicar.html';
    });

    // Lista de perros con detalles, incluyendo los guardados en localStorage
    let dogs = [
        { 
            name: 'Max', 
            img: 'https://placedog.net/500/300?id=1', 
            breed: 'Golden Retriever',
            birthdate: '2019-05-01',
            color: 'Dorado',
            size: 'Grande',
            difficulties: 'Ninguna',
            description: 'Un perro muy juguetón y amigable.'
        },
        { 
            name: 'Buddy', 
            img: 'https://placedog.net/500/300?id=2', 
            breed: 'Beagle',
            birthdate: '2018-03-10',
            color: 'Tricolor',
            size: 'Mediano',
            difficulties: 'Ninguna',
            description: 'Amigable y muy activo, ideal para familias.'
        },
        { 
            name: 'Charlie', 
            img: 'https://placedog.net/500/300?id=3', 
            breed: 'Bulldog Francés',
            birthdate: '2020-07-22',
            color: 'Blanco y negro',
            size: 'Pequeño',
            difficulties: 'Respiración corta',
            description: 'Un perro leal y perfecto para espacios pequeños.'
        },
        // Más perros...
    ];

    // Obtener perros guardados en localStorage y agregarlos a la lista
    const storedDogs = JSON.parse(localStorage.getItem('dogs')) || [];
    dogs = dogs.concat(storedDogs);

    // Función para cargar los perros en el marketplace
    function loadDogs(filteredDogs) {
        marketplace.innerHTML = ''; // Limpiar el marketplace antes de cargar nuevos perros
        filteredDogs.forEach(dog => {
            const dogCard = document.createElement('div');
            dogCard.classList.add('dog-card');

            const dogImg = document.createElement('img');
            dogImg.src = dog.img;
            dogImg.alt = dog.name;

            const dogName = document.createElement('h2');
            dogName.textContent = dog.name;

            dogCard.appendChild(dogImg);
            dogCard.appendChild(dogName);

            // Añadir evento de clic para redirigir a la página de detalles del perro
            dogCard.addEventListener('click', () => {
                localStorage.setItem('selectedDog', JSON.stringify(dog));
                window.location.href = 'detalle_perro.html';
            });

            marketplace.appendChild(dogCard);
        });
    }

    // Cargar todos los perros al inicio
    loadDogs(dogs);
});
