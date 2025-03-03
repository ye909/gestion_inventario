document.getElementById('homeBtn').addEventListener('click', function() {
    changeContent("Inicio", "Bienvenido a la pantalla de inicio de SAP.");
});

document.getElementById('settingsBtn').addEventListener('click', function() {
    changeContent("Configuraciones", "Ajusta la configuración de la aplicación aquí.");
});

document.getElementById('reportsBtn').addEventListener('click', function() {
    changeContent("Informes", "Consulta los informes de tu actividad.");
});

document.getElementById('analyticsBtn').addEventListener('click', function() {
    changeContent("Analíticas", "Visualiza los gráficos y análisis de datos.");
});

function changeContent(title, description) {
    const panel = document.getElementById('panelContent');
    panel.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
    `;
}
