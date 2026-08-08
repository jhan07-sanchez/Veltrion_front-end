<!-- Main Sidebar Container -->
<aside class="main-sidebar sidebar-dark-primary elevation-4">

    <!-- Brand Logo -->
    <a href="<?php echo $URL; ?>index.php" class="brand-link">

        <img src="<?php echo $URL; ?>public/assets/image/logo.png"
            class="brand-image img-circle elevation-3"
            style="opacity:.8">

        <span class="brand-text font-weight-light">
            Veltrion
        </span>

    </a>


    <!-- Sidebar -->
    <div class="sidebar">


        <!-- Usuario dinámico -->
        <div class="user-panel mt-3 pb-3 mb-3 d-flex align-items-center">

            <div class="image">
                <img src="<?php echo $URL; ?>public/assets/vendor/AdminLTE-3.2.0/dist/img/user2-160x160.jpg"
                    class="img-circle elevation-2"
                    alt="User avatar"
                    data-user-avatar>
            </div>

            <div class="info">
                <a href="#"
                    class="d-block"
                    data-user-name>
                    Usuario
                </a>
            </div>

        </div>



        <!-- Search -->
        <div class="form-inline">

            <div class="input-group"
                data-widget="sidebar-search">

                <input class="form-control form-control-sidebar"
                    type="search"
                    placeholder="Buscar">

            </div>

        </div>



        <!-- MENU DINÁMICO -->
        <nav class="mt-2">

            <ul id="sidebarMenu"
                class="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false">


            </ul>

        </nav>


    </div>


</aside>

<!-- SweetAlert2 -->
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
