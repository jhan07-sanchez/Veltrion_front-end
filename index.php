<?php
require_once __DIR__ . '/config/app.php';

require_once __DIR__ . '/views/layout/head.php';
require_once __DIR__ . '/views/layout/navbar.php';
require_once __DIR__ . '/views/layout/sidebar.php';
?>


<!-- Content Wrapper -->
<div class="content-wrapper">


    <!-- Content Header -->
    <section class="content-header">

        <div class="container-fluid">

            <div class="row mb-2">

                <div class="col-sm-6">

                    <h1 class="m-0">
                        Dashboard
                    </h1>

                </div>


                <div class="col-sm-6">

                    <ol class="breadcrumb float-sm-right">

                        <li class="breadcrumb-item">
                            <a href="#">
                                Home
                            </a>
                        </li>

                        <li class="breadcrumb-item active">
                            Dashboard
                        </li>

                    </ol>

                </div>

            </div>

        </div>

    </section>



    <!-- Main Content -->
    <section class="content">


        <div class="container-fluid">


            <!-- Dashboard dinámico -->
            <div class="row" id="dashboardWidgets">


                <!-- Estado inicial mientras carga -->
                <div class="text-center p-5">

                    <i class="fas fa-spinner fa-spin"></i>

                    <p class="mt-2">
                        Cargando dashboard...
                    </p>

                </div>


            </div>


        </div>


    </section>


</div>



<?php

require_once __DIR__ . '/views/layout/footer.php';

require_once __DIR__ . '/views/layout/control_sidebar.php';

?>
