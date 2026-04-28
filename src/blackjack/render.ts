
const divCartasJugador = document.querySelector('#cartas-jugador');

export const actualizarPuntos = (elementId: string, puntos: number) => {
    const elemento = document.querySelector(elementId);

    if (elemento) {
        elemento.textContent = puntos.toString();
    }
}

export const mostrarCarta = (carta: string) => {
    // <img src="src/assets/cartas/10C.png" alt="" class="carta">
    const imgCarta = document.createElement('img');

    imgCarta.src = `src/assets/cartas/${carta}.png`;
    imgCarta.className = 'carta';

    divCartasJugador?.append(imgCarta);
}

export const mostrarMensaje = (mensaje: string, tipo: 'success' | 'warning' | 'danger' | 'info' = 'warning') => {

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed m-3`;
    alertDiv.role = 'alert';
    alertDiv.style.bottom = '0';
    alertDiv.style.right = '0';
    alertDiv.style.zIndex = '1050';

    alertDiv.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" aria-label="Close"></button>
    `;

    // Evento de cierre manual
    const closeButton = alertDiv.querySelector('.btn-close');
    closeButton?.addEventListener('click', () => {
        alertDiv.remove();
    });

    document.body.appendChild(alertDiv);

    // Auto-cierre
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}