document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const dni = document.getElementById('dni').value.trim();
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();
    const password = document.getElementById('password').value.trim();
    const photoFile = document.getElementById('photo').files[0];

    if (!dni || !fullName || !email || !phone || !address || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const reader = new FileReader();

    reader.onloadend = async function() {
        const user = {
            nombre: fullName,
            dni: dni,
            mail: email,
            numero: phone,
            direccion: address,
            contraseña: password,
            foto: reader.result // Base64 string
        };

        try {
            const response = await fetch('http://localhost:3000/usuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                alert('Usuario registrado con éxito');
                window.location.href = 'als';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error.message);
            alert('Error al registrarse. Inténtelo de nuevo más tarde.');
        }
    };

    if (photoFile) {
        reader.readAsDataURL(photoFile);
    }
});
