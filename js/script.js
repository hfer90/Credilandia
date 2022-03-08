const monto = document.getElementById('monto');
const cuotas = document.getElementById('cuotas');
const generar = document.getElementById('generar');
const guardar = document.getElementById('guardar');
const cargar = document.getElementById('cargar');

function prestamo(monto, cuotas, tasa, valorCuota) {
    this.monto = parseFloat(monto);
    this.cuotas = parseInt(cuotas);
    this.tasa = tasa;
    this.valorCuota = valorCuota;
}

var prestamo1 = new prestamo(0, 0, 0, 0);

$(document).ready(function () {

    function calcularTasa() {
        if (prestamo1.cuotas > 24) { prestamo1.tasa = 50; } else { prestamo1.tasa = 45; }
    }

    function calcularCuota(monto, cuotas, tasa) {
        prestamo1.valorCuota = parseInt(monto * (Math.pow(1 + tasa / 100, cuotas) * tasa / 100) / (Math.pow(1 + tasa / 100, cuotas) - 1));
    }

    function imprimirResultado() {
        $(".prestamo1").remove();

        let items = [];

        for (const dato in prestamo1) {
            let li = ` <li class="prestamo1">${dato}: ${prestamo1[dato]}</li> `;
            items.push(li);
        }

        $(".simulaciones").append(items);
    }

    function guardarPrestamo() {
        localStorage.setItem('producto1', JSON.stringify(prestamo1));
    }

    function cargarPrestamo() {
        prestamo1 = JSON.parse(localStorage.getItem('producto1'));
    }

    function animacion() {
        $('.ingreso').toggle('fast');
        $('.resultado').toggle('fast');
        $('.botones button').toggle('fast');
    }

    $('#monto').on('input', () => {
        prestamo1.monto = $('#monto').val();
    });

    $('#cuotas').on('input', () => {
        prestamo1.cuotas = $('#cuotas').val();
    });

    $('#generar').on('click', () => {
        calcularTasa();
        calcularCuota(prestamo1.monto, prestamo1.cuotas, prestamo1.tasa / 12);
        imprimirResultado();
        animacion();
    });

    guardar.addEventListener('click', () => {
        guardarPrestamo();

    });

    cargar.addEventListener('click', () => {
        cargarPrestamo();
        imprimirResultado();
        animacion();
    });

    $('#volver').on('click', () => {
        animacion();
    });

})



/* mostrar input en otro lado ao vivo
$('#nombre').on('input', ()=>{
    $('#mostrarAca').text($('#nombre'.val()));
})
*/