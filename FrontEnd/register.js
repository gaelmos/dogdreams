document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const dni = document.getElementById('dni').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const photoFile = document.getElementById('photo').files[0];

    const reader = new FileReader();

    reader.onloadend = function() {
        const user = {
            dni: dni,
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            password: password,
            photo: reader.result // Base64 string
        };

        // Guardar el usuario en localStorage
        localStorage.setItem('user', JSON.stringify(user));

        // Redirigir a la página principal o de bienvenida
        window.location.href = 'pagina_principal.html';
    };

    if (photoFile) {
        reader.readAsDataURL(photoFile);
    }
});
