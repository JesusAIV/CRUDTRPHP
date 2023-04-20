(function () {
    var tablaProductos;

    $(document).ready(function () {
        $("#productosModal").click(function () {
            modalProductos();
        });
    });

    function listadoProdductosModal(){
        // Inicialización de la tabla con la extensión select
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
            'order': [[1, 'asc']],
            'dom': 'Bfrtip',
            'searching': true,
            'ordering': false,
            'ajax': {
                'url': './view/ajax/productos.php',
                'dataSrc': '',
                'data': { action: 'listarproductos' },
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
        listarProductos();

        // Evento para el botón de agregar productos
        $('#agregarProductosBtn').click(agregarProductosSeleccionados);
    }

    function listarProductos() {
        tablaProductos.ajax.reload();
    }

    function agregarProductosSeleccionados() {
        // Obtener los productos seleccionados en la tabla
        var productosSeleccionados = tablaProductos.rows('.selected').data().toArray();

        for (var i = 0; i < productosSeleccionados.length; i++) {
            var producto = productosSeleccionados[i];
            console.log(producto);
            var productoHtml = '<tr id="' + producto.idproducto + '">';
            productoHtml += '<td>' + producto.nombre + '</td>';
            productoHtml += '<td>' + producto.precio + '</td>';
            productoHtml += '<td><input type="number" id="idprod" class="cantidad" value="1" min="1" data-id="' + producto.idproducto + '"></td>';
            productoHtml += '<td><p class="precio-total" data-precio="' + producto.precio + '" data-id="' + producto.idproducto + '">' + producto.precio + '</p></td>';
            productoHtml += '<td><button class="eliminarProductoBtn" data-id="' + producto.idproducto + '">Eliminar</button></td>';
            productoHtml += '</tr>';
            $('#productosSeleccionados tbody').append(productoHtml);
        }


        $('#productosSeleccionados').on('click', '.eliminarProductoBtn', function () {
            $(this).closest('tr').remove();
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
        $('#productosModal').modal('hide');
    }

    function elementosSeleccionados() {

    }

    function modalProductos(){
        let modal = document.createElement('div');
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

        modalTitle.textContent = 'Eliminar Producto';

        let closeButton = document.createElement('button');
        closeButton.type = 'button';
        closeButton.classList.add('btn-close');
        closeButton.setAttribute('data-bs-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
        closeButton.addEventListener('click', closeModalAdd);

        let modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');

        let form = document.createElement('form');
        form.setAttribute('method', 'POST');

        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        let closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.classList.add('btn', 'btn-secondary');
        closeBtn.setAttribute('data-bs-dismiss', 'modal');
        closeBtn.textContent = 'Cancelar';
        closeBtn.addEventListener('click', closeModalAdd);

        let confirmBtn = document.createElement('button');
        confirmBtn.classList.add('btn', 'btn-danger');
        confirmBtn.textContent = 'Eliminar';
        confirmBtn.id = "btn-delete";

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        modalFooter.appendChild(closeBtn);
        modalFooter.appendChild(confirmBtn);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(form);
        form.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);

        document.body.appendChild(modal);

        // Activa el modal
        let myModal = new bootstrap.Modal(modal);
        myModal.show();

        function closeModalAdd() {
            myModal.hide();
            document.body.removeChild(modal);
        }
    }
})();
