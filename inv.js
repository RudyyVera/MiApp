// scripts.js

// Simular el inventario de herramientas
let tools = [
    { id: 1, name: 'Guantes', quantity: 10 },
    { id: 2, name: 'Destornillador', quantity: 15 },
    { id: 3, name: 'Cinta', quantity: 5 },
    { id: 4, name: 'Brocha', quantity: 8 }
];

// Función para actualizar el inventario
function updateInventory() {
    const toolsContainer = document.getElementById('toolsContainer');
    toolsContainer.innerHTML = ''; // Limpiar el contenedor

    tools.forEach(tool => {
        const toolElement = document.createElement('div');
        toolElement.classList.add('tool-item');
        toolElement.innerHTML = `
            <i class="fa fa-hammer"></i>
            <div class="tool-details">
                <h3>${tool.name}</h3>
                <p>Cantidad disponible: ${tool.quantity}</p>
                <button class="manage-button" onclick="editTool(${tool.id})">Editar</button>
                <button class="delete-button" onclick="deleteTool(${tool.id})">Eliminar</button>
            </div>
        `;
        toolsContainer.appendChild(toolElement);
    });
}

// Función para agregar una nueva herramienta
document.getElementById('addToolForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar recarga de la página
    const toolName = document.getElementById('toolName').value;
    const toolQuantity = document.getElementById('toolQuantity').value;

    if (toolName && toolQuantity) {
        const newTool = {
            id: tools.length + 1,
            name: toolName,
            quantity: parseInt(toolQuantity)
        };
        tools.push(newTool);
        updateInventory(); // Actualizar el inventario después de agregar
        document.getElementById('addToolForm').reset(); // Limpiar el formulario
    } else {
        alert('Por favor, completa todos los campos.');
    }
});

// Función para editar una herramienta
function editTool(toolId) {
    const tool = tools.find(t => t.id === toolId);
    if (tool) {
        const newName = prompt('Nuevo nombre de la herramienta:', tool.name);
        const newQuantity = prompt('Nueva cantidad disponible:', tool.quantity);

        if (newName && newQuantity) {
            tool.name = newName;
            tool.quantity = parseInt(newQuantity);
            updateInventory(); // Actualizar el inventario después de la edición
        }
    }
}

// Función para eliminar una herramienta
function deleteTool(toolId) {
    const toolIndex = tools.findIndex(t => t.id === toolId);
    if (toolIndex !== -1) {
        tools.splice(toolIndex, 1);
        updateInventory(); // Actualizar el inventario después de eliminar
    }
}

// Inicializar el inventario al cargar la página
updateInventory();
