const nombre = document.getElementById('nombre');
const fecha = document.getElementById('fecha');
const personas = document.getElementById('personas');
const horasExtra = document.getElementById('horasExtra');
const comentarios = document.getElementById('comentarios');
const btnWhatsApp = document.getElementById('btnWhatsApp');

const precioBase = document.getElementById('precioBase');
const precioHorasExtra = document.getElementById('precioHorasExtra');
const total = document.getElementById('total');

const PRECIO_ENTRE_SEMANA = 2500;
const PRECIO_FIN_SEMANA = 3500;
const PRECIO_HORA_EXTRA = 500;

function formatoPrecio(cantidad) {
    return '$' + cantidad.toLocaleString('es-MX');
}

function formatearFecha(fechaTexto) {
    const fechaFormateada = new Date(fechaTexto + 'T00:00:00');

    const dias = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
    ];

    const meses = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre'
    ];

    return `${dias[fechaFormateada.getDay()]} ${fechaFormateada.getDate()} de ${meses[fechaFormateada.getMonth()]} de ${fechaFormateada.getFullYear()}`;
}

function calcularCotizacion() {
    let base = 0;

    if (fecha.value) {
        const dia = new Date(fecha.value + 'T00:00:00').getDay();

        if (dia === 5 || dia === 6 || dia === 0) {
            base = PRECIO_FIN_SEMANA;
        } else {
            base = PRECIO_ENTRE_SEMANA;
        }
    }

    const extra = Number(horasExtra.value || 0) * PRECIO_HORA_EXTRA;

    precioBase.textContent = formatoPrecio(base);
    precioHorasExtra.textContent = formatoPrecio(extra);
    total.textContent = formatoPrecio(base + extra);
}

function enviarWhatsApp() {
    if (!nombre.value || !fecha.value || !personas.value) {
        alert('Por favor completa los campos obligatorios.');
        return;
    }

    const mensaje = `SOLICITUD DE RESERVACIÓN - LA QUINTITA

Nombre:
${nombre.value}

Fecha del evento:
${formatearFecha(fecha.value)}

Cantidad aproximada de personas:
${personas.value}

Horas adicionales:
${horasExtra.value || 0}

COTIZACIÓN ESTIMADA

Precio base: ${precioBase.textContent}
Horas adicionales: ${precioHorasExtra.textContent}
Total estimado: ${total.textContent}

Comentarios adicionales:
${comentarios.value || 'Sin comentarios adicionales.'}`;

    const url = `https://wa.me/528146189937?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
}

fecha.addEventListener('change', calcularCotizacion);
horasExtra.addEventListener('input', calcularCotizacion);
btnWhatsApp.addEventListener('click', enviarWhatsApp);

calcularCotizacion();