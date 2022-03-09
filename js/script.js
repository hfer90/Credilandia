const monto = document.getElementById('monto');
const cuotas = document.getElementById('cuotas');
const generar = document.getElementById('generar');
const guardar = document.getElementById('guardar');
const cargar = document.getElementById('cargar');
const llenarTabla = document.querySelector('#lista-tabla tbody');

function prestamo(monto, cuotas, tasa, valorCuota) {
    this.monto = parseInt(monto);
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

        while(llenarTabla.firstChild){
            llenarTabla.removeChild(llenarTabla.firstChild);
        }
    
        let fechas = [];
        let fechaActual = Date.now();
        let mes_actual = moment(fechaActual);
        mes_actual.add(1, 'month');    
    
        let interes = 0, capital = 0;
    
        prestamo1.valorCuota = parseFloat(monto * (Math.pow(1 + tasa / 100, cuotas) * tasa / 100) / (Math.pow(1 + tasa / 100, cuotas) - 1));
    
        for(let i = 1; i <= prestamo1.cuotas; i++) {
    
            interes = parseFloat(monto*(tasa / 100));
            capital = prestamo1.valorCuota - interes;
            monto = parseFloat(monto-capital);
    
            //Formato fechas
            fechas[i] = mes_actual.format('DD-MM-YYYY');
            mes_actual.add(1, 'month');
    
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${fechas[i]}</td>
                <td>${prestamo1.valorCuota.toFixed(2)}</td>
                <td>${capital.toFixed(2)}</td>
                <td>${interes.toFixed(2)}</td>
                <td>${monto.toFixed(2)}</td>
            `;
            llenarTabla.appendChild(row)
        }
    
    
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
        if (monto.value > 0 && cuotas.value > 0){
            calcularTasa();
            calcularCuota(prestamo1.monto, prestamo1.cuotas, prestamo1.tasa / 12);
            imprimirResultado();
            animacion();
        } else {alert("Por favor ingrese correctamente monto y cuotas.")}
    });

    guardar.addEventListener('click', () => {
        guardarPrestamo();
    });

    cargar.addEventListener('click', () => {
        if (localStorage.length > 0) {
            cargarPrestamo();
            imprimirResultado();
            animacion();
        } else {alert("No posee simulaciones guardadas.");}
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