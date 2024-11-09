document.addEventListener('DOMContentLoaded', function () {
    document.getElementById("registerForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Obtener los datos del formulario con comprobación de existencia
        const nombreInput = document.querySelector('input[name="nombre"]');
        const razaInput = document.querySelector('input[name="raza"]');
        const nacimientoInput = document.querySelector('input[name="nacimiento"]');
        const colorInput = document.querySelector('input[name="color"]');
        const tamañoInput = document.querySelector('input[name="tamaño"]');
        const dificultadesInput = document.querySelector('input[name="dificultades"]');
        const enfermedadInput = document.querySelector('input[name="enfermedad"]');
        const descripcionInput = document.querySelector('input[name="descripcion"]');
        const photoInput = document.querySelector('input[name="photo"]');

        // Verificación de que los campos necesarios existen
        if (!nombreInput || !razaInput || !nacimientoInput || !colorInput || !tamañoInput || !dificultadesInput || !enfermedadInput || !descripcionInput || !photoInput) {
            alert("Algunos campos no se han encontrado en el formulario.");
            return;
        }

        const nombre = nombreInput.value;
        const raza = razaInput.value;
        const nacimiento = nacimientoInput.value;
        const color = colorInput.value;
        const tamaño = tamañoInput.value;
        const dificultades = dificultadesInput.value;
        const enfermedad = enfermedadInput.value;
        const descripcion = descripcionInput.value;

        // Obtener la foto seleccionada y convertirla en base64
        const photoFile = photoInput.files[0];

        if (!photoFile) {
            alert('Por favor, selecciona una foto para el perro.');
            return; // Salir de la función si no hay foto seleccionada
        }

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
                dificultades,
                enfermedad
            };

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert('No se encontró el token de autenticación.');
                    return;
                }

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
    });
});
