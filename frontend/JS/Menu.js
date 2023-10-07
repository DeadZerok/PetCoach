const infoUser = document.getElementById('profile')
const nombre = document.getElementById('name');
const email = document.getElementById('email');

// const token = localStorage.getItem('token');

// // Enviar el token en el encabezado de autorización
// const requestOptions = {
//     method: "GET",
//     headers: {
//         "Authorization": `Bearer ${token}`,
//         "Content-Type": "application/json"
//     },
//     body: JSON.stringify({ nombre: nombre, email: email }),
// };

// // Realiza la solicitud al servidor
// fetch('http://127.0.0.1:3000/user/readuser', requestOptions)
//     .then((response) => response.json())
//     .then((data) => {
//         if (data.message) {
//             message = data.message;
//         } else {
//             message = `ID: ${token.id} | Nombre: ${data.nombre} | Email: ${data.email}`;
//         }
//     });

    function redirigir() {
        // Utiliza window.location.href para redirigir a la página deseada
        window.location.href = '../HTML/RegisterPet.html'; 
    }