<?php
    $ajax = false;
    require_once "./controller/gestionController.php";
    $gestion = new gestionController();
    $productos = $gestion->ListarClientes();
?>
<div class="container">
    <div class="container-fluid">
        <div class="">
            <label for="texto">Cliente</label>
            <select class="form-select border-dark-subtle" aria-label="Default select example">
                <option selected>Seleccione un cliente</option>
                <?php foreach ($productos as $rowc) { ?>
                <option value="<?php echo $rowc['id']; ?>"><?php echo $rowc['nombre']; ?></option>
                <?php } ?>
            </select>
        </div>
    </div>
</div>
<table id="productosSeleccionados">
    <thead>
        <tr>
            <th class="text-center">Nombre</th>
            <th class="text-center">Precio U</th>
            <th class="text-center">Cantidad</th>
            <th class="text-center">Precio Total</th>
            <th class="text-center">Acciones</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<div class="container-fluid d-flex align-items-center justify-content-between mt-4">
    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" id="productosModal">Seleccionar productos</button>
    <button type="button" class="btn btn-primary" id="save-venta">Guardar venta</button>
</div>