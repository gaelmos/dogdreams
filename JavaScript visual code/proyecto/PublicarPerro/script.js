document.getElementById('registerForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario

    const token = localStorage.getItem("token");

    const formData = new FormData(event.target); // Crea un objeto FormData a partir del formulario
    const dogData = {
        nombre: formData.get("nombre"),
        raza: formData.get('raza'),
        color: formData.get('color'),
        nacimiento: formData.get('nacimiento'),
        tamaño: formData.get('tamaño'),
        dificultades: formData.get('dificultades'),
        descripcion: formData.get("descripcion"),
        foto: formData.get("foto")
    };

    console.log(token);

    try {
        const response = await fetch('http://localhost:3000/perros', {
            method: 'POST',
            body: JSON.stringify(dogData),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if (response.ok) {
            const result = await response.json();
            console.log('Perro guardado:', result);
            // Redirigir a otra página donde mostrar los perros
            window.location.href = 'BusquedaPerro.html';
        } else {
            const error = await response.json();
            console.error('Error al guardar los datos del perro:', error);
        }
    } catch (error) {
        console.error('Error de red:', error);
    }
});
