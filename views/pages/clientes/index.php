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
                    <h1 class="m-0">Gestión de Clientes</h1>
                </div><!-- /.col -->
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?php echo $URL; ?>index.php">Home</a></li>
                        <li class="breadcrumb-item active">Clientes</li>
                    </ol>
                </div><!-- /.col -->
            </div><!-- /.row -->
            <div class="row mb-2">
                <div class="col-sm-12 text-right">
                    <a href="crear.php" class="btn btn-primary" data-permission="customers.create">
                        <i class="fas fa-plus"></i> Nuevo Cliente
                    </a>
                </div>
            </div>
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content">
        <div class="container-fluid">
            <?php require_once 'partials/table.php'; ?>
        </div><!-- /.container-fluid -->
    </div>
    <!-- /.content -->
</div>
<!-- /.content-wrapper -->

<?php
require_once __DIR__ . '../../../layout/footer.php';
require_once __DIR__ . '../../../layout/control_sidebar.php';
?>

<!-- JS Module del Feature -->
<script type="module" src="routes/clientes.routes.js"></script>
