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
                    <h1 class="m-0">Nueva Categoría</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?php echo $URL; ?>index.php">Home</a></li>
                        <li class="breadcrumb-item"><a href="index.php">Categorías</a></li>
                        <li class="breadcrumb-item active">Nueva</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <div class="card card-primary card-outline">
                <div class="card-header">
                    <h3 class="card-title">Formulario de Registro</h3>
                </div>
                <form id="categoria-form" data-id="">
                    <div class="card-body">
                        <div id="form-errors"></div>
                        <div class="row">
                            <div class="col-md-6 form-group">
                                <label for="name">Nombre de la Categoría</label>
                                <input type="text" class="form-control" id="name" name="name" placeholder="Ingrese nombre">
                            </div>
                            <div class="col-md-6 form-group">
                                <label for="parent">Categoría Padre (Opcional)</label>
                                <select class="form-control" id="parent" name="parent">
                                    <option value="">Ninguna</option>
                                    <!-- Las opciones se cargarán por JS -->
                                </select>
                            </div>
                            <div class="col-md-12 form-group">
                                <label for="description">Descripción</label>
                                <textarea class="form-control" id="description" name="description" rows="3" placeholder="Ingrese descripción"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-right">
                        <a href="index.php" class="btn btn-default">Cancelar</a>
                        <button type="submit" class="btn btn-primary" id="btn-submit">
                            <span class="spinner-border spinner-border-sm d-none" role="status" aria-hidden="true"></span>
                            Guardar
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

<script type="module" src="routes/categorias.routes.js"></script>
