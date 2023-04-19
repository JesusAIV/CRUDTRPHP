(function () {

    let crud;
    let datosProducto;
    let datosCategoria;
    let idcat;
    let idcategoria;
    let filaSeleccionada;
    let tabla

    $(document).ready(function () {
        listarproductos();

        $("#open-modal-button").click(function () {
            crud = "agregar";
            showModalAdd(crud);
        });

        $('#open-modal-editar').click(function () {
            filaSeleccionada = obtenerFilaSeleccionada();
            crud = "editar";
            obtenerDatosProducto(filaSeleccionada, crud);
        });

        $("#open-modal-eliminar").click(function () {
            filaSeleccionada = obtenerFilaSeleccionada();
            crud = "eliminar";
            obtenerDatosProducto(filaSeleccionada, crud);
        });

    });

    function listarproductos() {
        tabla = $('#table-productos').DataTable({
            'columnDefs': [{
                'orderable': false,
                'className': 'select-checkbox',
                'targets': 0
            }],
            'select': {
                'style': 'single',
                'selector': 'td:first-child'
            },
            'order': [[1, 'asc']],
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
                { 'data': 'precio' },
                { 'data': 'stock' },
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

    function obtenerDatosProducto(idProducto, accion) {
        $.ajax({
            url: './view/ajax/productos.php',
            method: 'POST',
            data: { id: idProducto, action: 'modalUpdate' },
        }).done(function (response) {
            datosProducto = JSON.parse(response);

            if (accion == 'editar') {
                showModalAdd(crud)
            } else {
                showModalEliminar();
            }
        });
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
        form.setAttribute('action', './view/ajax/crudproducto.php');
        form.classList.add('ProductosAjax');

        if (accion == 'agregar') {
            form.setAttribute('data-form', 'add-producto');
        } else if (accion == 'editar') {
            form.setAttribute('data-form', 'up-producto');
        }

        form.setAttribute('enctype', 'multipart/form-data');

        // ID


        let id_input = document.createElement('input');
        id_input.classList.add('form-control');
        id_input.setAttribute('type', 'hidden');
        id_input.setAttribute('name', 'uppid');
        if (accion == 'editar') {
            id_input.value = datosProducto[0].idproducto;
        }
        // Fin ID
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
        select.setAttribute('name', 'categoria');
        select.id = "selectModal";

        if (accion == 'editar') {
            idcat = datosProducto[0].idcategoria;
        }


        fetch('./view/ajax/productos.php', {
            method: 'POST',
            body: new URLSearchParams({
                action: 'datosSelect'
            })
        })
            .then(response => response.json())
            .then(data => {
                // Generar las opciones del select
                data.forEach(opcion => {
                    let optionEl = document.createElement('option');
                    optionEl.textContent = opcion.nombre;
                    optionEl.value = opcion.idcategoria;
                    select.appendChild(optionEl);
                });

                if (accion == 'editar') {
                    obtenerDatosCategoria(idcat).then(function (datosCategoria) {
                        let selectElement = document.getElementById('selectModal');
                        for (let i = 0; i < selectElement.options.length; i++) {
                            if (selectElement.options[i].value == datosCategoria[0].idcategoria) {
                                selectElement.selectedIndex = i;
                                break;
                            }
                        }
                    });
                }
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
        if (accion == 'editar') {
            input_nombre.setAttribute('name', 'nombre');
        } else {
            input_nombre.setAttribute('name', 'addpname');
        }
        input_nombre.id = 'nombre';

        if (accion == 'editar') {
            input_nombre.value = datosProducto[0].nombre;
        }
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
        input_descripcion.setAttribute('name', 'descripcion');
        input_descripcion.id = 'descripcion';

        if (accion == 'editar') {
            input_descripcion.value = datosProducto[0].descripcion;
        }

        // Fin descripcion

        // Precio
        let precio_mb3 = document.createElement('div');
        precio_mb3.classList.add('mb-3');

        let label_precio = document.createElement('label');
        label_precio.setAttribute('for', 'precio');
        label_precio.classList.add('col-form-label');

        let label_precioText = document.createTextNode('Precio');
        label_precio.appendChild(label_precioText);

        let input_precio = document.createElement('input');
        input_precio.setAttribute('type', 'text');
        input_precio.classList.add('form-control');
        input_precio.setAttribute('name', 'precio');
        input_precio.id = 'precio';

        if (accion == 'editar') {
            input_precio.value = datosProducto[0].precio;
        }
        // Fin nombre

        // Precio
        let stock_mb3 = document.createElement('div');
        stock_mb3.classList.add('mb-3');

        let label_stock = document.createElement('label');
        label_stock.setAttribute('for', 'stock');
        label_stock.classList.add('col-form-label');

        let label_stockText = document.createTextNode('stock');
        label_stock.appendChild(label_stockText);

        let input_stock = document.createElement('input');
        input_stock.setAttribute('type', 'text');
        input_stock.classList.add('form-control');
        input_stock.setAttribute('name', 'stock');
        input_stock.id = 'stock';

        if (accion == 'editar') {
            input_stock.value = datosProducto[0].stock;
        }
        // Fin nombre

        // Imagen

        let rutaImage;
        let urlPhp;
        let content_img;
        let imagen;
        let rutaCompleta;

        if (accion == 'editar') {
            rutaImagen = datosProducto[0].imagen;

            urlPhp = "view/";

            content_img = document.createElement("div");
            content_img.classList.add('mb-3', 'd-flex', 'justify-content-center');

            imagen = document.createElement("img");
            imagen.setAttribute('width', '200px');
            rutaCompleta = urlPhp ? urlPhp + rutaImagen : rutaImagen;

            imagen.src = rutaCompleta;
        }

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
        input_imagen.setAttribute('name', 'imagen');
        input_imagen.id = 'imagen';

        // Fin imagen

        let respuestaAjax = document.createElement('div');
        respuestaAjax.classList.add('RespuestaAjax');

        let modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');

        let closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.classList.add('btn', 'btn-secondary');
        closeBtn.setAttribute('data-bs-dismiss', 'modal');
        closeBtn.textContent = 'Cancelar';
        closeBtn.addEventListener('click', closeModalAdd);

        let confirmBtn = document.createElement('button');
        confirmBtn.classList.add('btn', 'btn-primary');
        confirmBtn.textContent = 'Guardar';

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        modalFooter.appendChild(closeBtn);
        modalFooter.appendChild(confirmBtn);

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(form);
        if (accion == 'editar') {
            form.appendChild(id_input);
        }
        form.appendChild(categoria_mb3);
        categoria_mb3.appendChild(label_categoria);
        categoria_mb3.appendChild(select);
        form.appendChild(nombre_mb3);
        nombre_mb3.appendChild(label_nombre);
        nombre_mb3.appendChild(input_nombre);
        form.appendChild(descripcion_mb3);
        descripcion_mb3.appendChild(label_descripcion);
        descripcion_mb3.appendChild(input_descripcion);
        form.appendChild(precio_mb3);
        precio_mb3.appendChild(label_precio);
        precio_mb3.appendChild(input_precio);
        form.appendChild(stock_mb3);
        stock_mb3.appendChild(label_stock);
        stock_mb3.appendChild(input_stock);
        if (accion == 'editar') {
            form.appendChild(content_img);
            content_img.appendChild(imagen)
        };
        form.appendChild(imagen_mb3);
        imagen_mb3.appendChild(label_imagen);
        imagen_mb3.appendChild(input_imagen);
        form.appendChild(modalFooter);
        form.appendChild(respuestaAjax);
        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);

        document.body.appendChild(modal);

        // Activa el modal
        let myModal = new bootstrap.Modal(modal);
        myModal.show();

        crudProducto();

        function closeModalAdd() {
            myModal.hide();
            document.body.removeChild(modal);
        }
    }

    function showModalEliminar() {
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

        // ID

        let id_input = document.createElement('input');
        id_input.classList.add('form-control');
        id_input.setAttribute('type', 'hidden');
        id_input.setAttribute('name', 'idd');
        id_input.id = "idd";
        id_input.value = datosProducto[0].idproducto;

        let alerta = document.createElement('div');
        alerta.id = "alerta";

        // Fin ID

        // Confirmacion

        let confirmacion_mb3 = document.createElement('div');
        confirmacion_mb3.classList.add('mb-3');
        confirmacion_mb3.innerHTML = "¿Seguro que deseas eliminar el producto?";

        // Fin confirmacion

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
        form.appendChild(id_input);
        form.appendChild(confirmacion_mb3);
        form.appendChild(modalFooter);
        form.appendChild(alerta);

        modalDialog.appendChild(modalContent);
        modal.appendChild(modalDialog);

        document.body.appendChild(modal);

        // Activa el modal
        let myModal = new bootstrap.Modal(modal);
        myModal.show();

        function eliminarProducto() {
            event.preventDefault();
            const idd = document.getElementById('idd').value;
            fetch('./view/ajax/crudproducto.php', {
                method: 'POST',
                body: new URLSearchParams({
                    action: 'delete',
                    idd: idd
                })
            })
                .then(res => res.text())
                .then(data => {
                    document.getElementById('alerta').innerHTML = data;
                    cerrarModal();
                    recargarTabla();
                })
                .catch(error => console.error('Error:', error));
        }

        function cerrarModal() {
            myModal.hide();
            document.body.removeChild(modal);
        }

        function recargarTabla() {
            $('#table-productos').DataTable().ajax.reload();
        }

        $("#btn-delete").click(function () {
            eliminarProducto();
        });

        function closeModalAdd() {
            myModal.hide();
            document.body.removeChild(modal);
        }
    }

    function obtenerDatosCategoria(idcat) {
        return $.ajax({
            url: './view/ajax/productos.php',
            method: 'POST',
            data: { idcat: idcat, action: 'categoriaSelect' },
        }).then(function (response) {
            return JSON.parse(response);
        });
    }

    function crudProducto() {
        $('.ProductosAjax').submit(function (e) {
            e.preventDefault();

            var form = $(this);

            var tipo = form.attr('data-form');
            var accion = form.attr('action');
            var metodo = form.attr('method');
            var respuesta = form.children('.RespuestaAjax');

            var msjError = "<script>Swal.fire('Ocurrio un error inesperado', 'Error', 'error');</script>";
            var formdata = new FormData(this);

            var textoAlerta;
            if (tipo === "add-producto") {
                textoAlerta = "Los datos que enviaras quedaran almacenados en el sistema";
            } else if (tipo == "delete") {
                textoAlerta = "Los datos serán eliminados completamente del sistema";
            } else if (tipo === "up-producto") {
                textoAlerta = "Los datos del sistema serán actualizados";
            } else if (tipo === "generate") {
                textoAlerta = "Se va a generar un nuevo usuario";
            } else if (tipo === "disabled") {
                textoAlerta = "El usuario será desabilitado del sistema";
            } else if (tipo === "enable") {
                textoAlerta = "El usuario será habilitado del sistema";
            } else if (tipo === "update-perfil") {
                textoAlerta = "Los datos del sistema serán actualizados";
            } else {
                textoAlerta = "Quieres realizar la operación solicitada"
            }

            Swal.fire({
                title: '¿Estás seguro?',
                text: textoAlerta,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Aceptar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    $.ajax({
                        type: metodo,
                        url: accion,
                        data: formdata ? formdata : form.serialize(),
                        cache: false,
                        contentType: false,
                        processData: false,
                        xhr: function () {
                            var xhr = new window.XMLHttpRequest();
                            xhr.upload.addEventListener("progress", function (evt) {
                                if (evt.lengthComputable) {
                                    var percentComplete = evt.loaded / evt.total;
                                    percentComplete = parseInt(percentComplete * 100);
                                    if (percentComplete < 100) {
                                        respuesta.append('<p class="text-center">Procesado... (' + percentComplete + '%)</p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" style="width: ' + percentComplete + '%;"></div></div>');
                                    } else {
                                        respuesta.html('<p class="text-center"></p>');
                                    }
                                }
                            }, false);
                            return xhr;
                        },
                        success: function (data) {
                            respuesta.html(data);
                            form[0].reset();
                            tabla.ajax.reload();
                        },
                        error: function () {
                            respuesta.html(msjError);
                        }
                    });
                    return false;
                }
            })
        });
    }

})();