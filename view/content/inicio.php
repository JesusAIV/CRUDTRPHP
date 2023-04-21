<?php
$ajax = false;
require_once "./controller/gestionController.php";
$gestion = new gestionController();
$tabla = 'producto';
$cantidadProductos = $gestion->cantidadRegistros($tabla);
$tabla = 'ventas';
$cantidadVentas = $gestion->cantidadRegistros($tabla);
$tabla = 'compras';
$cantidadCompras = $gestion->cantidadRegistros($tabla);
?>
<a href="<?php echo SERVERURL; ?>compras" class="btn btn-primary py-3">
    <div class="d-flex align-items-center gap-5">
        <div class="d-flex align-items-center gap-3">
            <p class="m-0">Compras</p>
            <i class="fa-regular fa-bag-shopping"></i>
        </div>
        <div>
            <p class="m-0"><?php echo $cantidadCompras['cantidad']; ?></p>
        </div>
    </div>
</a>

<a href="<?php echo SERVERURL; ?>ventas" class="btn btn-primary py-3">
    <div class="d-flex align-items-center gap-5">
        <div class="d-flex align-items-center gap-3">
            <p class="m-0">Ventas</p>
            <i class="fa-regular fa-cart-shopping"></i>
        </div>
        <div>
            <p class="m-0"><?php echo $cantidadVentas['cantidad']; ?></p>
        </div>
    </div>
</a>

<a href="<?php echo SERVERURL; ?>almacen" class="btn btn-primary py-3">
    <div class="d-flex aling-items-center gap-5">
        <div class="d-flex align-items-center gap-3">
            <p class="m-0">Almacen</p>
            <i class="fa-regular fa-shop"></i>
        </div>
        <div>
            <p class="m-0"><?php echo $cantidadProductos['cantidad']; ?></p>
        </div>
    </div>
</a>

<div class="container-fluid mt-5">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        <div class="col">
            <div class="chart-container" style="height: 400px;">
                <canvas id="graficoProductosPorCategoria"></canvas>
            </div>
        </div>
        <div class="col">
            <div class="chart-container" style="height: 400px;">
                <canvas id="graficoVentaPorCategoria"></canvas>
            </div>
        </div>
    </div>
</div>