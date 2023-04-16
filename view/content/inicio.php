<?php
    $ajax = false;
    require_once "./controller/gestionController.php";
    $gestion = new gestionController();
?>
<a href="<?php echo SERVERURL; ?>compras" class="btn btn-primary py-3">
    <div class="d-flex align-items-center gap-5">
        <div class ="d-flex align-items-center gap-3">
            <p class="m-0">Compras</p>
            <i class="fa-regular fa-bag-shopping"></i>
        </div>
        <div>
            <p class="m-0">20</p>
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
            <p class="m-0">20</p>
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
        <p class="m-0">20</p>
    </div>

</div>
</a>
