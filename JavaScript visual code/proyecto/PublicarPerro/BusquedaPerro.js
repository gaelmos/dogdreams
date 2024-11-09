document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Realiza una solicitud al backend para obtener los datos de los perros
        const response = await fetch("http://localhost:3000/perros");
        const perros = await response.json();

        // Selecciona todos los cuadros blancos donde se mostrarán los perros
        const rectangulos = document.querySelectorAll(".Rectangulo");

        // Muestra los datos de cada perro en los cuadros blancos
        perros.forEach((perro, index) => {
            if (rectangulos[index]) { // Verifica que haya cuadros suficientes para los datos
                rectangulos[index].innerHTML = `
                    <div>
                        <h3>${perro.nombre}</h3>
                        <p>Raza: ${perro.raza}</p>
                        <p>Nacimiento: ${perro.nacimiento}</p>
                        <p>Color: ${perro.color}</p>
                        <p>Tamaño: ${perro.tamaño}</p>
                        <p>Dificultades: ${perro.dificultades}</p>
                        <img src="data:image/png;base64,${perro.foto}" alt="Foto de ${perro.nombre}" style="width: 100%; height: auto; border-radius: 10px;">
                    </div>
                `;
            }
        });
    } catch (error) {
        console.error("Error al cargar los perros:", error);
    }
});
