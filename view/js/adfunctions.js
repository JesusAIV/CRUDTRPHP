(function () {

    let crud;

    $(document).ready(function () {
        listarproductos();

        $("#open-modal-button").click(function () {
            crud = "agregar";
            showModalAdd(crud);
        });

        $('#open-modal-editar').click(function () {
            var filaSeleccionada = obtenerFilaSeleccionada();
            obtenerDatosProducto(filaSeleccionada);
        });

    });

    function listarproductos() {
        var tabla = $('#table-productos').DataTable({
            'select': {
                'style': 'single'
            },
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
            'responsive': true
        });

        tabla.on('select', function (e, dt, type, indexes) {
            if (type === 'row') {
                filaSeleccionada = tabla.rows(indexes).data()[0].idproducto;
            }
        });
    }

    function obtenerFilaSeleccionada() {
        return filaSeleccionada;
    }

    function obtenerDatosProducto(idProducto) {
        $.ajax({
            url: './view/ajax/productos.php',
            method: 'POST',
            data: { id: idProducto, action: 'modalUpdate' },
            success: function (response) {
                var datosProducto = JSON.parse(response);

                mostrarModalEditar(datosProducto);
            }
        });
    }

    function mostrarModalEditar(datosProducto) {
        var modal = document.createElement('div');

        // Crea los elementos de input para mostrar los datos
        var inputNombre = document.createElement('input');
        inputNombre.type = 'text';
        inputNombre.value = datosProducto.nombre;

        var inputDescripcion = document.createElement('input');
        inputDescripcion.type = 'text';
        inputDescripcion.value = datosProducto.descripcion;

        // Agrega los elementos de input al modal
        modal.appendChild(inputNombre);
        modal.appendChild(inputDescripcion);

        console.log(datosProducto[0].nombre)

        // Abre el modal
        // ...
    }

    function showModalAdd(accion) {
        let modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.id = 'staticBackdrop';
        modal.setAttribute('data-bs-backdrop', 'static');
        modal.setAttribute('data-bs-keyboard', 'false');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
        modal.setAttribute('aria-hidden', 'true');

        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        let modalTitle = document.createElement('h1');
        modalTitle.classList.add('modal-title', 'fs-5');
        modalTitle.id = 'staticBackdropLabel';

        if (accion == 'agregar') {
            modalTitle.textContent = 'Agregar Producto';
        } else if (accion == 'editar') {
            modalTitle.textContent = 'Actualizar Producto';
        }

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
        form.setAttribute('action', '/url-de-destino');

        // Categoria

        let categoria_mb3 = document.createElement('div');
        categoria_mb3.classList.add('mb-3');

        let label_categoria = document.createElement('label');
        label_categoria.setAttribute('for', 'categoria');
        label_categoria.classList.add('col-form-label');

        let label_categoriaText = document.createTextNode('Categoria');
        label_categoria.appendChild(label_categoriaText);

        // Crear el elemento select
        let select = document.createElement('select');
        select.classList.add('form-select');

        // Hacer una petición fetch para obtener las opciones del select desde PHP
        fetch('./view/ajax/productos.php', {
            method: 'POST',
            body: new URLSearchParams({
                action: 'datosSelect'
            })
        })
            .then(response => response.json()) // Procesar la respuesta como JSON
            .then(data => {
                // Generar las opciones del select
                data.forEach(opcion => {
                    let optionEl = document.createElement('option');
                    optionEl.textContent = opcion.nombre;
                    optionEl.value = opcion.idcategoria;
                    select.appendChild(optionEl);
                });

            })
            .catch(error => console.error(error));

        // Fin categoria

        // Nombre
        let nombre_mb3 = document.createElement('div');
        nombre_mb3.classList.add('mb-3');

        let label_nombre = document.createElement('label');
        label_nombre.setAttribute('for', 'nombre');
        label_nombre.classList.add('col-form-label');

        let label_nombreText = document.createTextNode('Nombre');
        label_nombre.appendChild(label_nombreText);

        let input_nombre = document.createElement('input');
        input_nombre.setAttribute('type', 'text');
        input_nombre.classList.add('form-control');
        input_nombre.id = 'nombre';

        // Fin nombre

        // Descripcion
        let descripcion_mb3 = document.createElement('div');
        descripcion_mb3.classList.add('mb-3');

        let label_descripcion = document.createElement('label');
        label_descripcion.setAttribute('for', 'descripcion');
        label_descripcion.classList.add('col-form-label');

        let label_descripcionText = document.createTextNode('Descripcion');
        label_descripcion.appendChild(label_descripcionText);

        let input_descripcion = document.createElement('textarea');
        input_descripcion.classList.add('form-control');
        input_descripcion.id = 'descripcion';

        // Fin descripcion

        // Imagen
        let imagen_mb3 = document.createElement('div');
        imagen_mb3.classList.add('mb-3');

        let label_imagen = document.createElement('label');
        label_imagen.setAttribute('for', 'imagen');
        label_imagen.classList.add('col-form-label');

        let label_imagenText = document.createTextNode('Imagen');
        label_imagen.appendChild(label_imagenText);

        let input_imagen = document.createElement('input');
        input_imagen.setAttribute('type', 'file');
        input_imagen.classList.add('form-control');
        input_imagen.id = 'imagen';

        // Fin imagen

        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        let closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.classList.add('btn', 'btn-secondary');
        closeBtn.setAttribute('data-bs-dismiss', 'modal');
        closeBtn.textContent = 'Cancelar';
        closeBtn.addEventListener('click', closeModalAdd);

        let confirmBtn = document.createElement('button');
        confirmBtn.type = 'button';
        confirmBtn.classList.add('btn', 'btn-primary');
        confirmBtn.textContent = 'Guardar';

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        modalFooter.appendChild(closeBtn);
        modalFooter.appendChild(confirmBtn);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(form);
        form.appendChild(categoria_mb3);
        categoria_mb3.appendChild(label_categoria);
        categoria_mb3.appendChild(select);
        form.appendChild(nombre_mb3);
        nombre_mb3.appendChild(label_nombre);
        nombre_mb3.appendChild(input_nombre);
        form.appendChild(descripcion_mb3);
        descripcion_mb3.appendChild(label_descripcion);
        descripcion_mb3.appendChild(input_descripcion);
        form.appendChild(imagen_mb3);
        imagen_mb3.appendChild(label_imagen);
        imagen_mb3.appendChild(input_imagen);
        modalContent.appendChild(modalFooter);

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

    function showModalUpdate(rowId) {
        let modal = document.createElement('div');
        modal.classList.add('modal', 'fade');
        modal.id = 'staticBackdrop';
        modal.setAttribute('data-bs-backdrop', 'static');
        modal.setAttribute('data-bs-keyboard', 'false');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-labelledby', 'staticBackdropLabel');
        modal.setAttribute('aria-hidden', 'true');

        let modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog', 'modal-dialog-centered', 'modal-dialog-scrollable');

        let modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        let modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');

        let modalTitle = document.createElement('h1');
        modalTitle.classList.add('modal-title', 'fs-5');
        modalTitle.id = 'staticBackdropLabel';
        modalTitle.textContent = 'Actualizar Producto';

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
        form.setAttribute('action', '/url-de-destino');

        // Categoria

        let categoria_mb3 = document.createElement('div');
        categoria_mb3.classList.add('mb-3');

        let label_categoria = document.createElement('label');
        label_categoria.setAttribute('for', 'categoria');
        label_categoria.classList.add('col-form-label');

        let label_categoriaText = document.createTextNode('Categoria');
        label_categoria.appendChild(label_categoriaText);

        // Crear el elemento select
        let select = document.createElement('select');
        select.classList.add('form-select');

        // Obtener la fila seleccionada
        let selectedRow = document.querySelector(".table-productos .select");

        // Obtener el ID de la fila seleccionada

        // Hacer una petición fetch para obtener las opciones del select desde PHP
        fetch('./view/ajax/productos.php', {
            method: 'POST',
            body: new URLSearchParams({
                action: 'datosSelect'
            })
        })
            .then(response => response.json()) // Procesar la respuesta como JSON
            .then(data => {
                // Generar las opciones del select
                data.forEach(opcion => {
                    let optionEl = document.createElement('option');
                    optionEl.textContent = opcion.nombre;
                    optionEl.value = opcion.idcategoria;
                    select.appendChild(optionEl);
                });

            })
            .catch(error => console.error(error));

        // Fin categoria

        // Nombre
        let nombre_mb3 = document.createElement('div');
        nombre_mb3.classList.add('mb-3');

        let label_nombre = document.createElement('label');
        label_nombre.setAttribute('for', 'nombre');
        label_nombre.classList.add('col-form-label');

        let label_nombreText = document.createTextNode('Nombre');
        label_nombre.appendChild(label_nombreText);

        let input_nombre = document.createElement('input');
        input_nombre.setAttribute('type', 'text');
        input_nombre.classList.add('form-control');
        input_nombre.id = 'nombre';

        // Fin nombre

        // Descripcion
        let descripcion_mb3 = document.createElement('div');
        descripcion_mb3.classList.add('mb-3');

        let label_descripcion = document.createElement('label');
        label_descripcion.setAttribute('for', 'descripcion');
        label_descripcion.classList.add('col-form-label');

        let label_descripcionText = document.createTextNode('Descripcion');
        label_descripcion.appendChild(label_descripcionText);

        let input_descripcion = document.createElement('textarea');
        input_descripcion.classList.add('form-control');
        input_descripcion.id = 'descripcion';

        // Fin descripcion

        // Imagen
        let imagen_mb3 = document.createElement('div');
        imagen_mb3.classList.add('mb-3');

        let label_imagen = document.createElement('label');
        label_imagen.setAttribute('for', 'imagen');
        label_imagen.classList.add('col-form-label');

        let label_imagenText = document.createTextNode('Imagen');
        label_imagen.appendChild(label_imagenText);

        let input_imagen = document.createElement('input');
        input_imagen.setAttribute('type', 'file');
        input_imagen.classList.add('form-control');
        input_imagen.id = 'imagen';

        // Fin imagen

        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        let closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.classList.add('btn', 'btn-secondary');
        closeBtn.setAttribute('data-bs-dismiss', 'modal');
        closeBtn.textContent = 'Cancelar';
        closeBtn.addEventListener('click', closeModalAdd);

        let confirmBtn = document.createElement('button');
        confirmBtn.type = 'button';
        confirmBtn.classList.add('btn', 'btn-primary');
        confirmBtn.textContent = 'Guardar';

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        modalFooter.appendChild(closeBtn);
        modalFooter.appendChild(confirmBtn);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(form);
        form.appendChild(categoria_mb3);
        categoria_mb3.appendChild(label_categoria);
        categoria_mb3.appendChild(select);
        form.appendChild(nombre_mb3);
        nombre_mb3.appendChild(label_nombre);
        nombre_mb3.appendChild(input_nombre);
        form.appendChild(descripcion_mb3);
        descripcion_mb3.appendChild(label_descripcion);
        descripcion_mb3.appendChild(input_descripcion);
        form.appendChild(imagen_mb3);
        imagen_mb3.appendChild(label_imagen);
        imagen_mb3.appendChild(input_imagen);
        modalContent.appendChild(modalFooter);

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