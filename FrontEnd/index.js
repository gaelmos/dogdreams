document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Obtener los datos de registro desde localStorage
    var registeredEmail = localStorage.getItem('registeredEmail');
    var registeredPassword = localStorage.getItem('registeredPassword');

    if (email === registeredEmail && password === registeredPassword) {
        window.location.href = "pagina_principal.html";  // Redirige a la página principal
    } else {
        document.getElementById('errorMsg').textContent = "Correo electrónico o contraseña incorrecta.";
    }
});

document.getElementById('registerBtn').addEventListener('click', function() {
    window.location.href = "pagina_registro.html";  // Redirige a la página de registro
});
