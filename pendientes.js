// Datos de ejemplo de herramientas pendientes
const pendingTools = [
    { toolName: "Guantes", personName: "Juan Pérez", deliveryDate: "2025-04-08 10:30 AM", returnDate: null },
    { toolName: "Destornillador", personName: "Ana García", deliveryDate: "2025-04-08 11:15 AM", returnDate: null },
    { toolName: "Mouse", personName: "Carlos López", deliveryDate: "2025-04-09 09:00 AM", returnDate: null },
    { toolName: "Cinta", personName: "María Fernández", deliveryDate: "2025-04-09 10:45 AM", returnDate: null },
];

// Elemento de la tabla donde se mostrarán los registros
const pendingToolsTable = document.getElementById('pending-tools-table').getElementsByTagName('tbody')[0];

// Función para mostrar las herramientas pendientes
function displayPendingTools() {
    pendingToolsTable.innerHTML = '';  // Limpiar la tabla antes de agregar los registros

    pendingTools.forEach(entry => {
        const row = pendingToolsTable.insertRow();
        const toolCell = row.insertCell(0);
        const personCell = row.insertCell(1);
        const dateCell = row.insertCell(2);
        const actionCell = row.insertCell(3);

        toolCell.innerHTML = entry.toolName;
        personCell.innerHTML = entry.personName;
        dateCell.innerHTML = entry.deliveryDate;
        actionCell.innerHTML = `<button onclick="markAsReturned('${entry.toolName}')">Marcar como devuelta</button>`;
    });
}

// Función para marcar una herramienta como devuelta
function markAsReturned(toolName) {
    const toolIndex = pendingTools.findIndex(t => t.toolName === toolName);
    if (toolIndex !== -1) {
        const tool = pendingTools[toolIndex];
        tool.returnDate = new Date().toLocaleString();
        alert(`La herramienta ${toolName} ha sido marcada como devuelta y eliminada de la lista.`);

        // Eliminar la herramienta de la lista de pendientes
        pendingTools.splice(toolIndex, 1);
        displayPendingTools();
    }
}

// Función para filtrar las herramientas por nombre
function filterTools() {
    const searchTerm = document.getElementById('tool-search').value.toLowerCase();

    const filteredTools = pendingTools.filter(tool => tool.toolName.toLowerCase().includes(searchTerm));
    
    // Actualizar la tabla con las herramientas filtradas
    pendingToolsTable.innerHTML = '';
    filteredTools.forEach(entry => {
        const row = pendingToolsTable.insertRow();
        const toolCell = row.insertCell(0);
        const personCell = row.insertCell(1);
        const dateCell = row.insertCell(2);
        const actionCell = row.insertCell(3);

        toolCell.innerHTML = entry.toolName;
        personCell.innerHTML = entry.personName;
        dateCell.innerHTML = entry.deliveryDate;
        actionCell.innerHTML = `<button onclick="markAsReturned('${entry.toolName}')">Marcar como devuelta</button>`;
    });
}

// Inicialización: Mostrar herramientas pendientes al cargar la página
window.onload = function() {
    displayPendingTools();
};
