document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("registerForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Obtener los datos del formulario
        const nombre = document.querySelector('input[name="nombre"]').value;
        const raza = document.querySelector('input[name="raza"]').value;
        const nacimiento = document.querySelector('input[name="nacimiento"]').value;
        const color = document.querySelector('input[name="color"]').value;
        const tamaño = document.querySelector('input[name="tamaño"]').value;
        const dificultades = document.querySelector('input[name="dificultades"]').value;
        const descripcion = document.querySelector('input[name="descripcion"]').value;

        // Obtener la foto seleccionada y convertirla en base64
        const photoInput = document.querySelector('input[name="photo"]');
        const photoFile = photoInput.files[0];

        if (photoFile) {
            const reader = new FileReader();

            reader.onloadend = async function () {
                const photoBase64 = reader.result.split(',')[1]; // Obtener solo la parte base64 de la cadena

                const perroData = {
                    nombre,
                    raza,
                    descripcion,
                    foto: photoBase64,
                    color,
                    nacimiento,
                    tamaño,
                    dificultades
                };

                try {
                    const token = localStorage.getItem("token"); // Suponiendo que el token ya está almacenado
                    const response = await fetch("http://localhost:3000/perros", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify(perroData)
                    });

                    if (response.ok) {
                        const result = await response.json();
                        console.log("Perro publicado correctamente:", result);
                        alert("¡Perro publicado con éxito!");
                        window.location.href = "busquedaperro.html"; // Redirigir a la página de búsqueda
                    } else {
                        const error = await response.json();
                        console.error("Error al publicar el perro:", error);
                        alert(`Error: ${error.error || 'Hubo un problema al crear el perro'}`);
                    }
                } catch (error) {
                    console.error("Error de red:", error);
                    alert('Hubo un error al conectar con el servidor.');
                }
            };

            reader.readAsDataURL(photoFile);
        } else {
            alert('Por favor, selecciona una foto para el perro.');
        }
    });
});