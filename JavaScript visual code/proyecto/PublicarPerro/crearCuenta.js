document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const dni = document.getElementById('dni').value;
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const password = document.getElementById('password').value;
    const photoFile = document.getElementById('photo').files[0];

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
            const response = await fetch('postgres://default:Bla6HiYkjq7G@ep-muddy-snowflake-a4oyv7a0-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                alert('Usuario registrado con éxito');
                window.location.href = 'pagina_principal.html';
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`);
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
            alert('Error al registrarse. Inténtelo de nuevo más tarde.');
        }
    };

    if (photoFile) {
        reader.readAsDataURL(photoFile);
    }
});
