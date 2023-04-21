<?php
    $ajax = false;
    require_once "./controller/gestionController.php";
    $gestion = new gestionController();
    $productos = $gestion->ListarClientes();
?>
<div class="container">
    <div class="container-fluid">
        <div class ="">
            <label for="texto">Proveedor</label>
            <select class="form-select border-dark-subtle" id="clienteSelect">
                <option select>Seleccione un proveedor</option>
                <?php foreach($productos as $rowc)
                { ?>
                <option value="<?php echo $rowc ['id']; ?>"><?php echo $rowc ['nombre']; ?></option>
                <?php } ?>
            </select>
        </div>
    </div>
</div>
<table id="productosSeleccionados">
<thead>
    <tr>
        <th class="text-center">ID</th>
        <th class="text-center">Nombre</th>
        <th class="text-center">Precio</th>
        <th class="text-center">Cantidad</th>
        <th class="text-center">Precio Total</th>
        <th class="text-center">Acciones</th>
    </tr>
    </thead>
    <tbody></tbody>
</table>

<div class="container-fluid d-flex aling-items-center justify-content-between mt-4">
    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" id="productosModal">Seleccionar productos</button>
    <button type="button" class="btn btn-primary" id="save-venta">Guardar compra</button>
</div>
