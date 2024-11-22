// Función para redimensionar la imagen
function resizeImage(file, maxWidth) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = function(e) {
            img.onload = function() {
                // Crear un canvas para redimensionar la imagen
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                const ratio = img.height / img.width;
                canvas.width = maxWidth;  // Establecer el ancho máximo
                canvas.height = maxWidth * ratio;  // Calcular la altura manteniendo la proporción

                // Dibujar la imagen en el canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Convertir la imagen redimensionada a blob
                canvas.toBlob(function(blob) {
                    resolve(blob);
                }, 'image/jpeg');
            };
            img.src = e.target.result;
        };

        reader.onerror = function(error) {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
}

// Evento para manejar el formulario de publicación
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Recoger datos del formulario de publicación
    const nombrePerro = document.querySelector('input[name="nombre"]').value.trim();
    const raza = document.querySelector('input[name="raza"]').value.trim();
    const descripcion = document.querySelector('input[name="descripcion"]').value.trim();
    const color = document.querySelector('input[name="color"]').value.trim();
    const tamaño = document.querySelector('input[name="tamaño"]').value.trim();
    const nacimiento = document.querySelector('input[name="nacimiento"]').value.trim();
    const dificultades = document.querySelector('input[name="dificultades"]').value.trim();
    const fotoPerro = document.querySelector('input[name="photo"]').files[0];

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
