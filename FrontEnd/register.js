document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var dni = document.getElementById('dni').value;
    var telefono = document.getElementById('telefono').value;
    var barrio = document.getElementById('barrio').value;
    var provincia = document.getElementById('provincia').value;

    // Validación básica de los campos
    if (!email || !password || !dni || !telefono || !barrio || !provincia) {
        document.getElementById('errorMsg').textContent = "Todos los campos son obligatorios.";
        return;
    }

    // Guardar los datos de registro en localStorage
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);

    // Redirigir a una página de éxito (simulada)
    window.location.href = "registro_exitoso.html";  // Redirige a una página de registro exitoso
});
