(function () {

    $(document).ready(function () {
        graficoProducto();
    });

    function graficoProducto() {
        // Obtener los datos de la base de datos mediante una solicitud AJAX
        $.ajax({
            url: './view/ajax/productos.php',
            type: 'POST',
            data: { action: 'graficoProducto' },
            dataType: 'json',
            success: function (data) {
                // Obtener los nombres de las categorías y las cantidades de productos
                var categorias = [];
                var cantidades = [];
                for (var i = 0; i < data.length; i++) {
                    categorias.push(data[i].categoria);
                    cantidades.push(data[i].cantidad);
                }

                // Crear el gráfico de barras
                var ctx = document.getElementById('graficoProductosPorCategoria').getContext('2d');
                var grafico = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: categorias,
                        datasets: [{
                            label: 'Cantidad de productos por categoría',
                            data: cantidades,
                            backgroundColor: '#428bca'
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });

    }

})();