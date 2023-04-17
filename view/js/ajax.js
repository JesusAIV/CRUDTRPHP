$(document).ready(function(){
    $('.FormularioAjax').submit(function(e){
        e.preventDefault();

        var form = $(this);

        var tipo = form.attr('data-form');
        var accion = form.attr('action');
        var metodo = form.attr('method');
        var respuesta = form.children('.RespuestaAjax');

        var msjError="<script>Swal.fire('Ocurrio un error inesperado', 'Error', 'error');</script>";
        var formdata = new FormData(this);

        var textoAlerta;
        if(tipo==="save"){
            textoAlerta="Los datos que enviaras quedaran almacenados en el sistema";
        }else if(tipo == "delete"){
            textoAlerta="Los datos serán eliminados completamente del sistema";
        }else if(tipo === "update"){
            textoAlerta="Los datos del sistema serán actualizados";
        }else if(tipo === "generate"){
            textoAlerta="Se va a generar un nuevo usuario";
        }else if(tipo === "disabled"){
            textoAlerta="El usuario será desabilitado del sistema";
        }else if(tipo === "enable"){
            textoAlerta="El usuario será habilitado del sistema";
        }else if(tipo === "update-perfil"){
            textoAlerta="Los datos del sistema serán actualizados";
        }else{
            textoAlerta="Quieres realizar la operación solicitada"
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
                    xhr: function(){
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progres", function(evt) {
                            if (evt.lengthComputable) {
                                var percentComplete = evt.loaded / evt.total;
                                percentComplete = parseInt(percentComplete * 100);
                                if(percentComplete<100){
                                    respuesta.append('<p class="text-center">Procesado... ('+percentComplete+'%)</p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" style="width: '+percentComplete+'%;"></div></div>');
                                }else{
                                    respuesta.html('<p class="text-center"></p>');
                                }
                            }
                        }, false);
                        return xhr;
                    },
                    success: function (data) {
                        respuesta.html(data);
                        form[0].reset();
                    },
                    error: function() {
                        respuesta.html(msjError);
                    }
                });
                return false;
            }
        })
    });
});