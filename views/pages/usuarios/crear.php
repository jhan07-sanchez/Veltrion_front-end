<?php
require_once __DIR__ . '../../../../config/app.php';

require_once __DIR__ . '../../../layout/head.php';
require_once __DIR__ . '../../../layout/navbar.php';
require_once __DIR__ . '../../../layout/sidebar.php';
?>

<!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <div class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6">
                    <h1 class="m-0">Crear Usuario</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?php echo $URL; ?>index.php">Home</a></li>
                        <li class="breadcrumb-item active">Crear Usuario</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-6">
                    <div class="card card-primary">
                        <div class="card-header">
                            <h3 class="card-title">Llene los datos con cuidado</h3>

                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse"><i class="fas fa-minus"></i>
                                </button>
                            </div>
                            <!-- /.card-tools -->
                        </div>
                        <!-- /.card-header -->
                        <div class="card-body style=" display: block;">
                            <div class="row">
                                <div class="col-md-12">
                                    <form action="">
                                        <div class="form-group">
                                            <label for="nombre_usuario">Nombre de usuario</label>
                                            <input type="text" class="form-control" id="nombre_usuario" placeholder="Escribe el nombre de usuario...">
                                        </div>
                                        <div class="form-group">
                                            <label for="Correo">Correo electrónico</label>
                                            <input type="email" class="form-control" id="Correo" placeholder="Escribe el correo electrónico...">
                                        </div>
                                        <div class="form-group">
                                            <label for="Contraseña">Contraseña</label>
                                            <input type="password" class="form-control" id="Contraseña" placeholder="Escribe la contraseña...">
                                        </div>
                                        <div class="form-group">
                                            <label for="Contraseña">Repita contraseña</label>
                                            <input type="password" class="form-control" id="Contraseña" placeholder="Vuelve a escribir la contraseña...">
                                        </div>
                                        <hr>
                                        <div class="form-group">
                                            <a href="<?php echo $URL; ?>views/pages/usuarios/" class="btn btn-secondary">Cancelar</a>
                                            <button type="submit" class="btn btn-primary">Crear Usuario</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                    </div>
                    <!-- /.card -->
                </div>
            </div>

        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->
<?php
require_once __DIR__ . '../../../layout/footer.php';
require_once __DIR__ . '../../../layout/control_sidebar.php';
?>
