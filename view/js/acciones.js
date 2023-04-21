(function () {
    var tablaProductos;
    let modal;
    let myModal;
    let accion;

    $(document).ready(function () {
        productosTableSeleccionados();
        $("#productosModal").click(function () {
            accion = "venta";
            modalProductos(accion);
        });
        $("#productosModalcompra").click(function () {
            accion = "compra";
            modalProductos(accion);
        });
        $('#save-venta').click(function (e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del botón (recargar la página)

            guardarVenta();
        });
        $('#save-compra').click(function (e) {
            e.preventDefault(); // Prevenir el comportamiento predeterminado del botón (recargar la página)

            guardarCompra();
        });
        listarVentas();
        listarCompras();
    });

    function productosTableSeleccionados() {
        $('#productosSeleccionados').DataTable({
            "searching": false,
            "ordering": false,
            "info": false,
            'deferRender': true,
            'scrollY': 300,
            'scrollCollapse': true,
            'scroller': true,
            'language': {
                'url': './view/js/datatable-es.json'
            },
            'responsive': true
        });
    }

    function listadoProdductosModal(mod) {
        // Inicialización de la tabla con la extensión select
        var listar = mod;
        var lista;

        if (listar == "venta"){
            lista = "listarproductosdisponibles";
        } else if (listar == "compra"){
            lista = "listarproductos"
        }

        tablaProductos = $('#tablaProductos').DataTable({
            'columnDefs': [{
                'orderable': false,
                'className': 'select-checkbox',
                'targets': 0
            }],
            'lengthMenu': [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, 'All'],
            ],
            'ajax': {
                'url': './view/ajax/productos.php',
                'dataSrc': '',
                'data': { action: lista },
                'method': 'POST'
            },
            'select': {
                'style': 'multi'
            },
            'columns': [
                { 'data': 'contador' },
                { 'data': 'idproducto' },
                { 'data': 'categoria' },
                { 'data': 'nombre' },
                { 'data': 'precio' },
                { 'data': 'stock' },
                { 'data': 'imagen' }
            ],
            'language': {
                'url': './view/js/datatable-es.json'
            },
            'responsive': true
        });

        // Cargar productos en la tabla con PHP
        // listarProductos();

        // Evento para el botón de agregar productos
        $('#agregarProductosBtn').click(agregarProductosSeleccionados);
    }

    function agregarProductosSeleccionados() {
        // Obtener los productos seleccionados en la tabla
        var productosSeleccionados = tablaProductos.rows('.selected').data().toArray();

        var tablaProductosSeleccionados = $('#productosSeleccionados').DataTable();

        for (var i = 0; i < productosSeleccionados.length; i++) {
            var producto = productosSeleccionados[i];
            // var precioTotal = producto.precio * producto.cantidad;

            tablaProductosSeleccionados.row.add([
                producto.idproducto,
                producto.nombre,
                producto.precio,
                '<input type="number" id="' + producto.idproducto + '" class="form-control cantidad" value="1" min="1" data-id="' + producto.idproducto + '">',
                '<p class="precio-total" data-precio="' + producto.precio + '" data-id="' + producto.idproducto + '">' + producto.precio + '</p>',
                // precioTotal,
                '<button class="btn btn-danger eliminarProductoBtn" data-id="' + producto.idproducto + '">Eliminar</button>'
            ]).draw();
        }

        $('#productosSeleccionados').on('click', '.eliminarProductoBtn', function () {
            tablaProductosSeleccionados.row($(this).closest('tr')).remove().draw();
        });

        // Agrega un evento 'change' al input number de cada producto seleccionado
        $('#productosSeleccionados').on('change', 'input[type="number"]', function () {
            // Obtiene el id del producto y la cantidad del input
            var idProducto = $(this).data('id');

            var cantidad = parseInt($(this).val());

            // Obtiene el precio unitario del producto a través del atributo data
            var precioUnitario = parseFloat($('p[data-id="' + idProducto + '"]').data('precio'));

            // Calcula el precio total del producto
            var precioTotal = cantidad * precioUnitario;
            console.log(precioUnitario);
            // Actualiza el valor de la etiqueta <p> correspondiente
            $('p[data-id="' + idProducto + '"]').text(precioTotal.toFixed(2));
        });

        // Cerrar el modal
        myModal.hide();
        document.body.removeChild(modal);
    }

    function guardarVenta() {
        // Obtener los datos de la venta
        var cliente = $('#clienteSelect').val();
        var productos = obtenerProductosSeleccionados();

        // Hacer la solicitud AJAX
        $.ajax({
            url: './view/ajax/productos.php',
            type: 'POST',
            data: { cliente: cliente, productos: productos, action: 'guardarventa' },
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    // Mostrar alerta de SweetAlert2
                    Swal.fire({
                        icon: 'success',
                        title: response.message
                    });

                    // Reiniciar el select y vaciar la tabla de productos seleccionados
                    reiniciarSelectClientes();
                    vaciarTablaProductosSeleccionados();
                } else {
                    // Mostrar alerta de SweetAlert2 con error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al guardar la venta',
                        text: response.message
                    });
                }
            },
            error: function (xhr, status, error) {
                // Mostrar alerta de SweetAlert2 con error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar la venta',
                    text: error
                });
            }
        });
    }

    function reiniciarSelectClientes() {
        // Reiniciar el select de clientes a la opción por defecto
        $('#clienteSelect').val($('#clienteSelect option:first').val());
    }

    function vaciarTablaProductosSeleccionados() {
        // Vaciar la tabla de productos seleccionados
        $('#productosSeleccionados').DataTable().clear().draw();
    }

    function obtenerProductosSeleccionados() {
        var productosSeleccionados = $('#productosSeleccionados').DataTable().rows().data().toArray();

        var productos = [];

        for (var i = 0; i < productosSeleccionados.length; i++) {
            var producto = {
                id: productosSeleccionados[i][0],
                cantidad: $('#' + productosSeleccionados[i][0]).val()
            };

            productos.push(producto);
        }

        return productos;
    }

    function modalProductos(acciones) {
        var acc = acciones;
        modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.id = 'productosModal';
        modal.setAttribute('data-bs-backdrop', 'static');
        modal.setAttribute('data-bs-keyboard', 'false');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-hidden', 'true');

        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        let modalTitle = document.createElement('h1');
        modalTitle.classList.add('modal-title', 'fs-5');
        modalTitle.id = 'tituloLabel';

        modalTitle.textContent = 'Productos disponibles';

        let closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.classList.add('btn-close');
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.addEventListener('click', closeModalAdd);

        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        // Table
        let table = document.createElement('table');
        table.classList.add('table', 'table-striped');
        table.id = "tablaProductos";

        // Thead
        let thead = document.createElement('thead');

        // Tr
        let tr = document.createElement('tr');

        // Th
        var encabezados = ['#', 'Codigo', 'Categoria', 'Nombre', 'Precio', 'Stock', 'Imagen'];

        for (var i = 0; i < encabezados.length; i++) {
            var th = document.createElement('th');
            th.classList.add('text-center');
            th.textContent = encabezados[i];
            tr.appendChild(th);
        }

        // Tbody
        let tbody = document.createElement('tbody');

        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        let closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.classList.add('btn', 'btn-secondary');
        closeBtn.setAttribute('data-bs-dismiss', 'modal');
        closeBtn.textContent = 'Cancelar';
        closeBtn.addEventListener('click', closeModalAdd);

        let confirmBtn = document.createElement('button');
        confirmBtn.classList.add('btn', 'btn-success');
        confirmBtn.textContent = 'Agregar elementos';
        confirmBtn.id = "agregarProductosBtn";

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        modalFooter.appendChild(closeBtn);
        modalFooter.appendChild(confirmBtn);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(table);
        table.appendChild(thead);
        thead.appendChild(tr);
        table.appendChild(tbody);
        modalContent.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);

        document.body.appendChild(modal);

        listadoProdductosModal(acc);

        // Activa el modal
        myModal = new bootstrap.Modal(modal);
        myModal.show();

        function closeModalAdd() {
            myModal.hide();
            document.body.removeChild(modal);
        }
    }

    function listarVentas() {
        // Inicialización de la tabla con la extensión select
        $('#tablaVentas').DataTable({
            'lengthMenu': [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, 'All'],
            ],
            'ajax': {
                'url': './view/ajax/productos.php',
                'dataSrc': '',
                'data': { action: 'listarventas' },
                'method': 'POST'
            },
            'dom': 'Bfrtip',
            'columns': [
                { 'data': 'contador' },
                { 'data': 'fecha' },
                { 'data': 'producto' },
                { 'data': 'cliente' },
                { 'data': 'cantidad' },
                { 'data': 'precio_unitario' },
                { 'data': 'total' }
            ],
            'language': {
                'url': './view/js/datatable-es.json'
            },
            'responsive': true
        });
    }

    function guardarCompra() {
        // Obtener los datos de la venta
        var proveedor = $('#proveedorSelect').val();
        var productos = obtenerProductosSeleccionados();

        // Hacer la solicitud AJAX
        $.ajax({
            url: './view/ajax/productos.php',
            type: 'POST',
            data: { proveedor: proveedor, productos: productos, action: 'guardarcompra' },
            dataType: 'json',
            success: function (response) {
                if (response.status === 'success') {
                    // Mostrar alerta de SweetAlert2
                    Swal.fire({
                        icon: 'success',
                        title: response.message
                    });

                    // Reiniciar el select y vaciar la tabla de productos seleccionados
                    reiniciarSelectProveedores();
                    vaciarTablaProductosSeleccionados();
                } else {
                    // Mostrar alerta de SweetAlert2 con error
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al guardar la compra',
                        text: response.message
                    });
                }
            },
            error: function (xhr, status, error) {
                // Mostrar alerta de SweetAlert2 con error
                Swal.fire({
                    icon: 'error',
                    title: 'Error al guardar la compra',
                    text: error
                });
            }
        });
    }

    function reiniciarSelectProveedores() {
        // Reiniciar el select de clientes a la opción por defecto
        $('#proveedorSelect').val($('#proveedorSelect option:first').val());
    }

    function listarCompras() {
        // Inicialización de la tabla con la extensión select
        $('#tablaCompras').DataTable({
            'lengthMenu': [
                [5, 10, 25, 50, -1],
                [5, 10, 25, 50, 'All'],
            ],
            'ajax': {
                'url': './view/ajax/productos.php',
                'dataSrc': '',
                'data': { action: 'listarcompras' },
                'method': 'POST'
            },
            'dom': 'Bfrtip',
            'columns': [
                { 'data': 'contador' },
                { 'data': 'fecha' },
                { 'data': 'producto' },
                { 'data': 'proveedor' },
                { 'data': 'cantidad' },
                { 'data': 'precio_unitario' },
                { 'data': 'total' }
            ],
            'language': {
                'url': './view/js/datatable-es.json'
            },
            'responsive': true
        });
    }
})();
