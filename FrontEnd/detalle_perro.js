document.addEventListener('DOMContentLoaded', function() {
    const dog = JSON.parse(localStorage.getItem('selectedDog'));

    if (dog) {
        document.getElementById('dogImage').src = dog.img;
        document.getElementById('dogName').textContent = dog.name;
        document.getElementById('dogAge').textContent = dog.age;
        document.getElementById('dogHeight').textContent = dog.height;
        document.getElementById('dogPersonality').textContent = dog.personality;
        document.getElementById('dogWeight').textContent = dog.weight;
    } else {
        document.body.innerHTML = '<p>No se encontró la información del perro.</p>';
    }

    // Manejar el clic en el botón de Adoptar
    const adoptBtn = document.getElementById('adoptBtn');
    const contactInfo = document.getElementById('contactInfo');

    adoptBtn.addEventListener('click', function() {
        contactInfo.style.display = 'block';
    });
});
