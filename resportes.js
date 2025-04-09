function generateReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Asegúrate de que la imagen está disponible
    const logo = new Image();
    logo.src = 'logo-jhardsystex.png'; // Asegúrate de tener el logo en el directorio
    logo.onload = function() {
        // Cargar el logo en el PDF
        doc.addImage(logo, 'PNG', 10, 10, 30, 30);

        // Título
        doc.setFont('Arial', 'B', 16);
        doc.text('Reporte de Herramientas e Indumentaria - Jhardsystex', 50, 20);

        // Reporte de Herramientas
        doc.setFont('Arial', 'B', 12);
        doc.text('Reporte de Herramientas', 10, 40);

        // Crear tabla de herramientas
        const tools = [
            ['Martillo', '5', '1', '4'],
            ['Alicate', '6', '0', '7'],
            ['Destornillador', '10', '3', '12'],
            ['Llave inglesa', '4', '2', '6'],
            ['Pinzas', '3', '1', '8']
        ];

        doc.autoTable({
            head: [['Herramienta', 'En uso', 'Mantenimiento', 'Disponibles']],
            body: tools,
            startY: 50,
            theme: 'grid'
        });

        // Reporte de Indumentaria
        doc.addPage();
        doc.setFont('Arial', 'B', 12);
        doc.text('Reporte de Indumentaria', 10, 20);

        // Crear tabla de indumentaria
        const clothing = [
            ['Guantes Anti-estáticos', '50', '30', '20'],
            ['Batas de protección', '20', '10', '10'],
            ['Mascarillas', '40', '15', '25'],
            ['Botas de seguridad', '15', '5', '10'],
            ['Cascos', '10', '6', '4']
        ];

        doc.autoTable({
            head: [['Indumentaria', 'Entregados', 'En uso', 'Faltantes']],
            body: clothing,
            startY: 30,
            theme: 'grid'
        });

        // Guardar el PDF
        doc.save('reporte_herramientas_indumentaria.pdf');
    };
}
