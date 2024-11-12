// Función para redimensionar la imagen antes de enviarla
const resizeImage = (file, maxSize) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const scaleSize = maxSize / Math.max(img.width, img.height);
                canvas.width = img.width * scaleSize;
                canvas.height = img.height * scaleSize;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                canvas.toBlob((blob) => {
                    resolve(blob);
                }, 'image/jpeg', 0.7); // Ajusta el formato y calidad según tus necesidades
            };
            img.src = event.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Recopilar datos del formulario
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

    let photoBase64 = "";
    if (photoFile) {
        const resizedImageBlob = await resizeImage(photoFile, 300); // Tamaño máximo en px
        photoBase64 = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(resizedImageBlob);
        });
    }

    // Preparar los datos del usuario
    const user = {
        nombre: fullName,
        dni: dni,
        mail: email,
        numero: phone,
        direccion: address,
        contraseña: password,
        foto: photoBase64
    };

    // Enviar los datos al servidor
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
            window.location.href = 'IniciarSesion.html';
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error.message);
        alert('Error al registrarse. Inténtelo de nuevo más tarde.');
    }
});
