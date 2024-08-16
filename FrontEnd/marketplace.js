document.addEventListener('DOMContentLoaded', function() {
    const marketplace = document.getElementById('marketplace');
    const filterBtn = document.getElementById('filterBtn');
    const publishBtn = document.getElementById('publishBtn');
    const filterMenu = document.getElementById('filterMenu');
    const applyFiltersBtn = document.getElementById('applyFilters');

    // Redirigir a la página de publicación al hacer clic en "Publicar"
    publishBtn.addEventListener('click', function() {
        window.location.href = 'publicar.html';
    });

    // Lista de perros con detalles predefinidos
    let dogs = [
        { 
            name: 'Max', 
            img: 'https://placedog.net/500/300?id=1', 
            age: 3, 
            height: 50, 
            personality: 'Juguetón', 
            weight: 20 
        },
        { 
            name: 'Buddy', 
            img: 'https://placedog.net/500/300?id=2', 
            age: 2, 
            height: 45, 
            personality: 'Amigable', 
            weight: 18 
        },
        { 
            name: 'Charlie', 
            img: 'https://placedog.net/500/300?id=3', 
            age: 4, 
            height: 55, 
            personality: 'Enérgico', 
            weight: 22 
        },
        { 
            name: 'Rocky', 
            img: 'https://placedog.net/500/300?id=4', 
            age: 5, 
            height: 60, 
            personality: 'Leal', 
            weight: 25 
        },
        { 
            name: 'Cooper', 
            img: 'https://placedog.net/500/300?id=5', 
            age: 1, 
            height: 40, 
            personality: 'Cariñoso', 
            weight: 16 
        },
        { 
            name: 'Duke', 
            img: 'https://placedog.net/500/300?id=6', 
            age: 3, 
            height: 48, 
            personality: 'Leal', 
            weight: 21 
        },
        { 
            name: 'Bear', 
            img: 'https://placedog.net/500/300?id=7', 
            age: 2, 
            height: 46, 
            personality: 'Valiente', 
            weight: 19 
        },
        { 
            name: 'Scout', 
            img: 'https://placedog.net/500/300?id=8', 
            age: 4, 
            height: 54, 
            personality: 'Energético', 
            weight: 23 
        },
        { 
            name: 'Jack', 
            img: 'https://placedog.net/500/300?id=9', 
            age: 1, 
            height: 42, 
            personality: 'Curioso', 
            weight: 17 
        },
        { 
            name: 'Milo', 
            img: 'https://placedog.net/500/300?id=10', 
            age: 5, 
            height: 58, 
            personality: 'Sereno', 
            weight: 24 
        },
        { 
            name: 'Zeus', 
            img: 'https://placedog.net/500/300?id=11', 
            age: 2, 
            height: 47, 
            personality: 'Vigilante', 
            weight: 19 
        },
        { 
            name: 'Bella', 
            img: 'https://placedog.net/500/300?id=12', 
            age: 3, 
            height: 49, 
            personality: 'Activa', 
            weight: 20 
        }
    ];

    // Obtener perros guardados en localStorage y agregarlos a la lista
    const storedDogs = JSON.parse(localStorage.getItem('dogs')) || [];
    dogs = dogs.concat(storedDogs);

    // Función para mostrar el menú de filtros
    filterBtn.addEventListener('click', function() {
        filterMenu.style.display = filterMenu.style.display === 'block' ? 'none' : 'block';
    });

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

    // Función para aplicar filtros
    applyFiltersBtn.addEventListener('click', function() {
        const ageFilter = parseInt(document.getElementById('ageFilter').value);
        const heightFilter = parseInt(document.getElementById('heightFilter').value);
        const weightFilter = parseInt(document.getElementById('weightFilter').value);

        let filteredDogs = dogs;

        if (!isNaN(ageFilter)) {
            filteredDogs = filteredDogs.filter(dog => dog.age < ageFilter);
        }

        if (!isNaN(heightFilter)) {
            filteredDogs = filteredDogs.filter(dog => dog.height < heightFilter);
        }

        if (!isNaN(weightFilter)) {
            filteredDogs = filteredDogs.filter(dog => dog.weight < weightFilter);
        }

        loadDogs(filteredDogs);
        filterMenu.style.display = 'none'; // Cerrar el menú de filtros después de aplicar
    });
});
