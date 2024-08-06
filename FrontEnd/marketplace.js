document.addEventListener('DOMContentLoaded', function() {
    const marketplace = document.getElementById('marketplace');

    // Lista de imágenes y nombres de perros de ejemplo
    const dogs = [
        { name: 'Max', img: 'https://placedog.net/500/300?id=1' },
        { name: 'Buddy', img: 'https://placedog.net/500/300?id=2' },
        { name: 'Charlie', img: 'https://placedog.net/500/300?id=3' },
        { name: 'Rocky', img: 'https://placedog.net/500/300?id=4' },
        { name: 'Cooper', img: 'https://placedog.net/500/300?id=5' },
        { name: 'Toby', img: 'https://placedog.net/500/300?id=6' },
        { name: 'Jack', img: 'https://placedog.net/500/300?id=7' },
        { name: 'Duke', img: 'https://placedog.net/500/300?id=8' },
        { name: 'Bear', img: 'https://placedog.net/500/300?id=9' },
        { name: 'Scout', img: 'https://placedog.net/500/300?id=10' }
    ];

    // Función para cargar los perros en el marketplace
    function loadDogs() {
        dogs.forEach(dog => {
            const dogCard = document.createElement('div');
            dogCard.classList.add('dog-card');

            const dogImg = document.createElement('img');
            dogImg.src = dog.img;
            dogImg.alt = dog.name;

            const dogName = document.createElement('h2');
            dogName.textContent = dog.name;

            dogCard.appendChild(dogImg);
            dogCard.appendChild(dogName);

            marketplace.appendChild(dogCard);
        });
    }

    // Cargar perros al inicio
    loadDogs();

    // Función para cargar más perros al hacer scroll (simulación)
    window.addEventListener('scroll', () => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            loadDogs();  // Cargar más perros
        }
    });
});
