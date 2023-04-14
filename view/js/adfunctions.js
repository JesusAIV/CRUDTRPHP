$(document).ready(function () {
    listarproductos();
});

function listarproductos() {
    $('#table-productos').DataTable({
        'dom': 'Bfrtip',
        'searching': false,
        'ordering': false,
        'ajax': {
            'url': './view/ajax/productos.php',
            'dataSrc': '',
            'data': { action: 'listarproductos' },
            'method': 'POST'
        },
        'columns': [
            { 'data': 'contador' },
            { 'data': 'idproducto' },
            { 'data': 'categoria' },
            { 'data': 'nombre' },
            { 'data': 'descripcion' },
            { 'data': 'imagen' },
            { 'data': 'estado' }
        ],
        'language': {
            'url': './view/js/datatable-es.json'
        },
        responsive: true
    });
}