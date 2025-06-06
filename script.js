const productionTable = document.getElementById('productionTable');

function formatHour(hour) {
    return String(hour).padStart(2, '0') + ':00';
}

function addRow(hour = '') {
    const row = document.createElement('tr');
    
    row.innerHTML = `
        <td><input type="text" class="hora" value="${hour}" placeholder="Ej. 07:00 - 08:00"></td>
        <td class="blank-column">&nbsp;</td>
        <td>
            <div class="corridas-control">
                <button type="button" class="btn btn-subtract" onclick="decrementCorridas(this)">-</button>
                <input type="number" class="corridas corridas-input" min="0" value="0">
                <button type="button" class="btn btn-add" onclick="incrementCorridas(this)">+</button>
            </div>
        </td>
        <td><input type="number" class="piezas" min="0" placeholder="0"></td>
        <td><input type="number" class="totales" readonly></td>
        <td class="blank-column">&nbsp;</td>
    `;

    productionTable.appendChild(row);
}

function incrementCorridas(button) {
    const input = button.previousElementSibling;
    input.value = parseInt(input.value) + 1;
    calculateTotals();
}

function decrementCorridas(button) {
    const input = button.nextElementSibling;
    const currentValue = parseInt(input.value) || 0;
    if (currentValue > 0) {
        input.value = currentValue - 1;
        calculateTotals();
    }
}

function calculateTotals() {
    const corridasInputs = document.querySelectorAll('.corridas');
    const piezasInputs = document.querySelectorAll('.piezas');
    const totalesInputs = document.querySelectorAll('.totales');
    let totalPiezas = 0;

    for (let i = 0; i < corridasInputs.length; i++) {
        const corridas = parseInt(corridasInputs[i].value) || 0;
        const piezas = parseInt(piezasInputs[i].value) || 0;
        const total = corridas * piezas;
        totalesInputs[i].value = total;
        totalPiezas += total;
    }

    document.getElementById('totalPiezas').value = totalPiezas;
}

// Inicialización cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    // Configurar fecha actual por defecto
    document.getElementById('fecha').value = new Date().toISOString().split('T')[0];

    // Event listener para cálculos automáticos
    document.getElementById('productionForm').addEventListener('input', function(e) {
        if (e.target.classList.contains('piezas')) {
            calculateTotals();
        }
    });

    // Generar filas para horario de trabajo (7:00 AM a 6:00 PM)
    for (let hour = 7; hour < 18; hour++) {
        const nextHour = hour + 1;
        addRow(`${formatHour(hour)} - ${formatHour(nextHour)}`);
    }

    // Calcular totales iniciales
    calculateTotals();
});