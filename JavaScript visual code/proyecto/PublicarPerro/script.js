// script.js

// Función que se ejecuta cuando se envía el formulario
document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const formData = new FormData(event.target); // Crea un objeto FormData a partir del formulario
    const dogData = {
        nombre: formData.get('nombre'),
        raza: formData.get('raza'),
        descripcion: formData.get('descripcion'),
        foto: formData.get('photo'), // Aquí asegúrate de que 'photo' sea el nombre del input en tu formulario
        color: formData.get('color'),
        nacimiento: formData.get('nacimiento'),
        tamaño: formData.get('tamaño'),
        dificultades: formData.get('dificultades'),
        dniDueño: '12345678' // Cambia esto por el valor real del DNI del dueño
    };

    try {
        const response = await fetch('http://localhost:3000/api/perro', {
            method: 'POST',
            body: JSON.stringify(dogData),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Perro guardado:', result);
            // Redirigir a otra página donde mostrar los perros
            window.location.href = 'dogs.html';
        } else {
            const error = await response.json();
            console.error('Error al guardar los datos del perro:', error);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
});
