<div class="container">
    <div class="container-fluid row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        <div class="col">
            <label for="texto">Cliente</label>
            <select class="form-select border-dark-subtle" aria-label="Default select example">
                <option selected>Seleccione un cliente</option>
                <option value="1">Cliente 1</option>
                <option value="2">Cliente 2</option>
                <option value="3">Cliente 3</option>
            </select>
        </div>
        <div class="col">
            <label for="texto">Cantidad</label>
            <input type="number" readonly class="form-control border-dark-subtle" id="texto">
        </div>
        <div class="col">
            <label for="texto">Fecha</label>
            <input type="date" readonly class="form-control border-dark-subtle" id="texto">
        </div>
        <div class="col">
            <label for="texto">Texto</label>
            <input type="text" readonly class="form-control border-dark-subtle" id="texto">
        </div>
    </div>
</div>
<table id="productosSeleccionados">
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Precio U</th>
            <th>Cantidad</th>
            <th>Precio Total</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<button type="button" class="btn btn-primary" data-bs-toggle="modal" id="productosModal">Seleccionar productos</button>
<!-- Modal de productos -->
<!-- <div class="modal fade" id="productosModal" tabindex="-1" aria-labelledby="productosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title fs-5" id="productosModalLabel">Productos disponibles</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <table id="tablaProductos" class="table table-striped">
                    <thead>
                        <tr>
                            <th class="text-center">#</th>
                            <th class="text-center">Codigo</th>
                            <th class="text-center">Categoria</th>
                            <th class="text-center">Nombre</th>
                            <th class="text-center">Precio</th>
                            <th class="text-center">Stock</th>
                            <th class="text-center">Imagen</th <th class="text-center">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                    </tbody>
                </table>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="button" class="btn btn-primary" id="agregarProductosBtn">Agregar a la lista</button>
            </div>
        </div>
    </div>
</div> -->