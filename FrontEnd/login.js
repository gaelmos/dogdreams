document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/inicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail: email, contraseña: password })
        });

        if (response.ok) {
            alert('Inicio de sesión exitoso');
            window.location.href = 'pagina_principal.html';
        } else {
            alert('Error: No has podido iniciar sesión, intenta de nuevo.');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión. Inténtelo de nuevo más tarde.');
    }
});

document.getElementById('registerBtn').addEventListener('click', function() {
    window.location.href = 'pagina_registro.html'; // Redirige a la página de registro
});

document.getElementById('homeBtn').addEventListener('click', function() {
    window.location.href = 'pagina_principal.html'; // Redirige a la página principal
});
