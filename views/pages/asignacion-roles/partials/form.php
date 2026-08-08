<form id="user-role-form">
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label for="user">Usuario <span class="text-danger">*</span></label>
                <select class="form-control" name="user" id="user">
                    <option value="">Cargando usuarios...</option>
                </select>
            </div>
        </div>
        <div class="col-md-6">
            <div class="form-group">
                <label for="role">Rol <span class="text-danger">*</span></label>
                <select class="form-control" name="role" id="role">
                    <option value="">Cargando roles...</option>
                </select>
            </div>
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-12 text-right">
            <a href="<?php echo $URL; ?>views/pages/asignacion-roles/index.php" class="btn btn-secondary">Cancelar</a>
            <button type="submit" class="btn btn-primary">Guardar Asignación</button>
        </div>
    </div>
</form>
