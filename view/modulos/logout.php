<script>
    $(document).ready(function(){
        $('.btn-exit').on('click', function(e){
            e.preventDefault();
            Swal.fire({
                title: '¿Seguro que desea cerrar sesion?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                cancelButtonText: '<i class="fa-solid fa-xmark"></i>',
                confirmButtonText: '<i class="fa-solid fa-check"></i>'
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href='<?php echo SERVERURL; ?>view/ajax/logoutAjax.php'
                }
            })
        })
    })
</script>