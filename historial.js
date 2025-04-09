// app.js
let deliveries = [
    { dateTime: "2025-04-08 10:30 AM", toolName: "Guantes", personName: "Juan Pérez", actionType: "entrega" },
    { dateTime: "2025-04-08 11:15 AM", toolName: "Destornillador", personName: "Ana García", actionType: "devolucion" },
    { dateTime: "2025-04-09 09:00 AM", toolName: "Mouse", personName: "Carlos López", actionType: "entrega" },
    { dateTime: "2025-04-09 10:45 AM", toolName: "Brocha", personName: "María Fernández", actionType: "devolucion" }
]; // Datos ficticios para empezar

// Elementos del DOM
const form = document.getElementById('delivery-form');
const toolNameInput = document.getElementById('tool-name');
const personNameInput = document.getElementById('person-name');
const actionTypeInput = document.getElementById('action-type');
const editIdInput = document.getElementById('edit-id');
const historyTable = document.getElementById('history-table').getElementsByTagName('tbody')[0];
const filterInput = document.getElementById('filter-input');

// Función para mostrar los registros en la tabla con filtro
function displayHistory(filter = '') {
    historyTable.innerHTML = ''; // Limpiar la tabla antes de mostrarla
    deliveries.filter(entry => {
        return entry.toolName.toLowerCase().includes(filter.toLowerCase()) || 
               entry.personName.toLowerCase().includes(filter.toLowerCase());
    }).forEach((entry, index) => {
        const row = historyTable.insertRow();
        const timeCell = row.insertCell(0);
        const toolCell = row.insertCell(1);
        const personCell = row.insertCell(2);
        const actionCell = row.insertCell(3);
        const actionsCell = row.insertCell(4);

        timeCell.innerHTML = entry.dateTime;
        toolCell.innerHTML = entry.toolName;
        personCell.innerHTML = entry.personName;
        actionCell.innerHTML = entry.actionType === 'entrega' ? 'Entrega' : 'Devolución';
        actionsCell.innerHTML = `
            <button class="edit" onclick="editRecord(${index})">Editar</button>
            <button class="delete" onclick="deleteRecord(${index})">Eliminar</button>
        `;
    });
}

// Función para agregar o editar un registro
function handleFormSubmit(event) {
    event.preventDefault();

    const toolName = toolNameInput.value;
    const personName = personNameInput.value;
    const actionType = actionTypeInput.value;

    if (!toolName || !personName || !actionType) return;

    const currentDateTime = new Date().toLocaleString(); // Obtener fecha y hora actual

    if (editIdInput.value) {
        // Editar un registro existente
        const index = editIdInput.value;
        deliveries[index] = { dateTime: currentDateTime, toolName, personName, actionType };
        editIdInput.value = ''; // Limpiar el campo de edición
    } else {
        // Agregar un nuevo registro
        deliveries.push({ dateTime: currentDateTime, toolName, personName, actionType });
    }

    toolNameInput.value = '';
    personNameInput.value = '';
    actionTypeInput.value = 'entrega'; // Reseteamos el tipo de acción
    displayHistory();
}

// Función para editar un registro
function editRecord(index) {
    const entry = deliveries[index];
    toolNameInput.value = entry.toolName;
    personNameInput.value = entry.personName;
    actionTypeInput.value = entry.actionType;
    editIdInput.value = index; // Guardamos el índice para poder editarlo
}

// Función para eliminar un registro
function deleteRecord(index) {
    deliveries.splice(index, 1);
    displayHistory();
}

// Agregar evento al formulario
form.addEventListener('submit', handleFormSubmit);

// Agregar evento al filtro de búsqueda
filterInput.addEventListener('input', (event) => {
    const filter = event.target.value;
    displayHistory(filter); // Filtrar y mostrar los registros
});

// Mostrar el historial inicial
displayHistory();
