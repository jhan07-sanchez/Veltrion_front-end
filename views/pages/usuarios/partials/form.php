<form id="user-form">
    <div class="row">
        <div class="col-md-6">
            <div class="form-group">
                <label for="document_number">Número de Documento <span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="document_number" id="document_number" placeholder="Ingrese el DNI">
            </div>
            
            <div class="form-group">
                <label for="first_name">Nombre <span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="first_name" id="first_name" placeholder="Nombre completo">
            </div>
            
            <div class="form-group">
                <label for="last_name">Apellidos <span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Apellidos completos">
            </div>
            
            <div class="form-group">
                <label for="phone_number">Teléfono</label>
                <input type="text" class="form-control" name="phone_number" id="phone_number" placeholder="Ej: +51 999 999 999">
            </div>
        </div>
        
        <div class="col-md-6">
            <div class="form-group">
                <label for="username">Nombre de Usuario <span class="text-danger">*</span></label>
                <input type="text" class="form-control" name="username" id="username" placeholder="Nombre corto para inicio de sesión">
            </div>

            <div class="form-group">
                <label for="email">Correo electrónico <span class="text-danger">*</span></label>
                <input type="email" class="form-control" name="email" id="email" placeholder="correo@ejemplo.com">
            </div>
            
            <!-- Contraseñas: Serán opcionales si es edición (manejado por UI/backend, pero acá las mostramos) -->
            <div class="form-group">
                <label for="password">Contraseña <span class="text-danger">*</span></label>
                <input type="password" class="form-control" name="password" id="password" placeholder="Ingrese la contraseña">
            </div>
            
            <div class="form-group">
                <label for="password_confirm">Repita Contraseña <span class="text-danger">*</span></label>
                <input type="password" class="form-control" name="password_confirm" id="password_confirm" placeholder="Vuelva a escribir la contraseña">
            </div>
        </div>
    </div>

    <hr>
    
    <div class="row">
        <div class="col-12 text-right">
            <a href="<?php echo $URL; ?>views/pages/usuarios/index.php" class="btn btn-secondary">Cancelar</a>
            <button type="submit" class="btn btn-primary">Guardar Usuario</button>
        </div>
    </div>
</form>
