<?php
require_once __DIR__ . '../../../../config/app.php';
require_once __DIR__ . '../../../layout/head.php';
require_once __DIR__ . '../../../layout/navbar.php';
require_once __DIR__ . '../../../layout/sidebar.php';
?>

<div class="content-wrapper">
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Editar Proveedor</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?php echo $URL; ?>index.php">Home</a></li>
                        <li class="breadcrumb-item"><a href="index.php">Proveedores</a></li>
                        <li class="breadcrumb-item active">Editar</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">Formulario de Edición</h3>
                </div>
                <form id="proveedor-form" data-id="">
                    <div class="card-body">
                        <div id="form-errors"></div>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label for="document_type">Tipo de Documento</label>
                                <select class="form-control" id="document_type" name="document_type">
                                    <option value="NIT">NIT</option>
                                    <option value="CC">CC</option>
                                    <option value="CE">CE</option>
                                    <option value="PAS">PAS</option>
                                    <option value="TI">TI</option>
                                </select>
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="document_number">Número de Documento</label>
                                <input type="text" class="form-control" id="document_number" name="document_number" placeholder="Ingrese número">
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="business_name">Razón Social</label>
                                <input type="text" class="form-control" id="business_name" name="business_name" placeholder="Razón social o empresa">
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="first_name">Nombres Contacto</label>
                                <input type="text" class="form-control" id="first_name" name="first_name" placeholder="Nombres">
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="last_name">Apellidos Contacto</label>
                                <input type="text" class="form-control" id="last_name" name="last_name" placeholder="Apellidos">
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="email">Email</label>
                                <input type="email" class="form-control" id="email" name="email" placeholder="Correo electrónico">
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="phone">Teléfono</label>
                                <input type="text" class="form-control" id="phone" name="phone" placeholder="Teléfono fijo">
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="mobile">Celular</label>
                                <input type="text" class="form-control" id="mobile" name="mobile" placeholder="Celular">
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="address">Dirección</label>
                                <input type="text" class="form-control" id="address" name="address" placeholder="Dirección">
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="city">Ciudad</label>
                                <input type="text" class="form-control" id="city" name="city" placeholder="Ciudad">
                            </div>
                            <div class="col-md-3 form-group">
                                <label for="country">País</label>
                                <input type="text" class="form-control" id="country" name="country" placeholder="País">
                            </div>
                            <div class="col-md-12 form-group">
                                <label for="notes">Notas</label>
                                <textarea class="form-control" id="notes" name="notes" rows="2" placeholder="Notas adicionales"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-right">
                        <a href="index.php" class="btn btn-default">Cancelar</a>
                        <button type="submit" class="btn btn-primary" id="btn-submit">
                            <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                            Guardar Cambios
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<?php
require_once __DIR__ . '../../../layout/footer.php';
require_once __DIR__ . '../../../layout/control_sidebar.php';
?>

<script type="module" src="routes/proveedores.routes.js"></script>
