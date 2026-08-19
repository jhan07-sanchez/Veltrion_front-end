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
                    <h1 class="m-0">Gestión de Categorías</h1>
                </div>
                <div class="col-sm-6">
                    <ol class="breadcrumb float-sm-right">
                        <li class="breadcrumb-item"><a href="<?php echo $URL; ?>index.php">Home</a></li>
                        <li class="breadcrumb-item active">Categorías</li>
                    </ol>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-sm-12 text-right">
                    <a href="crear.php" class="btn btn-primary" data-permission="categories.create">
                        <i class="fas fa-plus"></i> Nueva Categoría
                    </a>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <div class="container-fluid">
            <?php require_once 'partials/table.php'; ?>
        </div>
    </div>
</div>

<?php
require_once __DIR__ . '../../../layout/footer.php';
require_once __DIR__ . '../../../layout/control_sidebar.php';
?>

<script type="module" src="routes/categorias.routes.js"></script>
