<form id="role-form">
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label for="role_name">Nombre de Rol <span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="role_name" id="role_name" placeholder="Ej: Administrador, Vendedor...">
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="role_description">Descripción</label>
                <textarea class="form-control" name="role_description" id="role_description" rows="3" placeholder="Detalle qué puede hacer este rol..."></textarea>
            </div>
        </div>
    </div>
    <hr>
    <hr>

    <div class="row">
        <div class="col-12">
            <h4 class="mb-3">
                <i class="fas fa-shield-alt mr-2"></i>
                Permisos del rol
            </h4>

            <p class="text-muted">
                Selecciona las operaciones que podrá realizar este rol.
            </p>

            <div id="role-permissions">
                <div class="text-center py-4">
                    <i class="fas fa-spinner fa-spin"></i>
                    Cargando permisos...
                </div>
            </div>
        </div>
    </div>

    <hr>
    <div class="row">
        <div class="col-12 text-right">
            <a href="<?php echo $URL; ?>views/pages/roles/index.php" class="btn btn-secondary">Cancelar</a>
            <button type="submit" class="btn btn-primary">Guardar Rol</button>
        </div>
    </div>
</form>
