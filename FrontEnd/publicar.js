document.getElementById('publishForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;
    const personality = document.getElementById('personality').value;
    const imageFile = document.getElementById('image').files[0];

    const reader = new FileReader();

    reader.onloadend = function() {
        const newDog = {
            name: name,
            age: parseInt(age),
            height: parseInt(height),
            weight: parseInt(weight),
            personality: personality,
            img: reader.result  // Base64 string
        };

        // Guardar el nuevo perro en localStorage
        let dogs = JSON.parse(localStorage.getItem('dogs')) || [];
        dogs.push(newDog);
        localStorage.setItem('dogs', JSON.stringify(dogs));

        // Redirigir a la página principal
        window.location.href = 'pagina_principal.html';
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }
});
