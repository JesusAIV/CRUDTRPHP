<?php
    $pagina = explode("/", $_GET['views']);

    $viewurl = $pagina[0];
?>
<header class="header" id="header">
    <div class="header_toggle">
        <i class="fa-solid fa-bars" id="header-toggle"></i>
    </div>
    <div class="header_img">
        <img src="https://avatars.githubusercontent.com/u/90335295?v=4" alt="">
    </div>
</header>
<div class="l-navbar" id="nav-bar">
    <nav class="nav">
        <div>
            <a href="" class="nav_logo">
                <!-- <i class="fa-brands fa-html5 nav_logo-icon"></i> -->
                <img src="<?php echo SERVERURL;?>view/img/TG2.png" class="nav_logo-icon" id="nav_logo-icon" alt="">
                <span class="nav_logo-name">TGESTIONA</span>
            </a>
            <div class="nav_list">
                <a href="<?php echo SERVERURL; ?>inicio"
                    class="nav_link <?php if($viewurl == "inicio"){echo "active"; }; ?>">
                    <i class="fa-regular fa-file-chart-pie"></i>
                    <span>Informes</span>
                </a>
                <a href="<?php echo SERVERURL; ?>compras"
                    class="nav_link <?php if($viewurl == "compras"){echo "active"; }; ?>">
                    <i class="fa-regular fa-cart-shopping"></i>
                    <span>Compras</span>
                </a>
                <a href="<?php echo SERVERURL; ?>ventas"
                    class="nav_link <?php if($viewurl == "ventas"){echo "active"; }; ?>">
                    <i class="fa-regular fa-bag-shopping"></i>
                    <span>Ventas</span>
                </a>
                <a href="<?php echo SERVERURL; ?>almacen"
                    class="nav_link <?php if($viewurl == "almacen"){echo "active"; }; ?>">
                    <i class="fa-regular fa-shop"></i>
                    <span>Almacen</span>
                </a>
            </div>
        </div>
        <a href="#" class="nav_link btn-exit">
            <i class="fa-regular fa-right-from-bracket"></i>
            <span class="nav_name">Cerrar sesion</span>
        </a>
    </nav>
</div>