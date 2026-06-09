let peliculas = [];
const buscador = document.getElementById('buscador');
const btnLimpiar = document.getElementById('btn-limpiar');
const resultados = document.getElementById('resultados');
const totalPeliculas = document.getElementById('total-peliculas');

// 1. Cargar el archivo JSON automáticamente al abrir la página
async function cargarPeliculas() {
    try {
        const respuesta = await fetch('peliculas.json');
        peliculas = await respuesta.json();
        
        // Ordenar las películas por ID numérico de menor a mayor
        peliculas.sort((a, b) => Number(a.id) - Number(b.id));
        
        // Actualizar el contador de la cabecera
        totalPeliculas.textContent = `Total: ${peliculas.length} películas guardadas`;
        
        // Mostrar la lista completa al inicio
        mostrarPeliculas(peliculas);
    } catch (error) {
        console.error('Error cargando el archivo JSON:', error);
        totalPeliculas.textContent = "Error al cargar la lista.";
    }
}

// 2. Función encargada de dibujar las películas en la pantalla
function mostrarPeliculas(lista) {
    resultados.innerHTML = '';

    if (lista.length === 0) {
        resultados.innerHTML = '<div style="text-align:center; color:#888; margin-top:20px;">No se encontraron películas.</div>';
        return;
    }

    lista.forEach(p => {
        const div = document.createElement('div');
        div.className = 'pelicula';
        div.innerHTML = `
            <div class="titulo">${p.descripcion}</div>
            <div class="ubicacion">🔢 N° ${p.id}</div>
        `;
        resultados.appendChild(div);
    });
}

// 3. Filtrar en tiempo real cuando escribes en el buscador
buscador.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase().trim();

    // Si borras el texto del buscador, vuelve a mostrar la lista completa
    if (texto === '') {
        mostrarPeliculas(peliculas);
        return;
    }

    // Filtrar las películas por el campo "descripcion"
    const filtradas = peliculas.filter(p => p.descripcion.toLowerCase().includes(texto));
    mostrarPeliculas(filtradas);
});

// 4. Acción del botón Limpiar (Vacía el buscador y restablece la lista completa)
btnLimpiar.addEventListener('click', () => {
    buscador.value = '';
    buscador.focus(); // Devuelve el cursor al buscador
    mostrarPeliculas(peliculas);
});

// Iniciar la carga del JSON al abrir la página
cargarPeliculas();
