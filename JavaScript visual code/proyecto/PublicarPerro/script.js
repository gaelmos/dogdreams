document.getElementById('publishForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Recoger datos del formulario de publicación
    const nombrePerro = document.getElementById('nombrePerro').value.trim();
    const raza = document.getElementById('raza').value.trim();
    const descripcion = document.getElementById('descripcion').value.trim();
    const color = document.getElementById('color').value.trim();
    const tamaño = document.getElementById('tamano').value.trim();
    const nacimiento = document.getElementById('nacimiento').value.trim();
    const dificultades = document.getElementById('dificultades').value.trim();
    const fotoPerro = document.getElementById('fotoPerro').files[0];

    // Recuperar el token de autenticación del usuario (que se debe haber guardado al hacer login)
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Debes estar logueado para publicar un perro');
        return;
    }

    let fotoBase64 = "";
    if (fotoPerro) {
        const resizedImageBlob = await resizeImage(fotoPerro, 300); // Tamaño máximo en px
        fotoBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(resizedImageBlob);
        });
    }

    // Preparar los datos del perro
    const perro = {
        nombre: nombrePerro,
        raza: raza,
        descripcion: descripcion,
        color: color,
        tamaño: tamaño,
        nacimiento: nacimiento,
        dificultades: dificultades,
        foto: fotoBase64
    };

    // Enviar los datos del perro al servidor
    try {
        const response = await fetch('http://localhost:3000/perros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`  // Enviar el token en el header
            },
            body: JSON.stringify(perro)
        });

        if (response.ok) {
            alert('Perro publicado con éxito');
            window.location.href = 'BusquedaPerro.html';  // Redirigir a la página de búsqueda de perros
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al publicar el perro:', error.message);
        alert('Error al publicar el perro. Inténtelo de nuevo más tarde.');
    }
});
