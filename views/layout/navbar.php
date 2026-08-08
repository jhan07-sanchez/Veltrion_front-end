<!-- Navbar -->
<nav class="main-header navbar navbar-expand navbar-white navbar-light">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
        <li class="nav-item">
            <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
        </li>
        <li class="nav-item d-none d-sm-inline-block">
            <a href="#" class="nav-link">Home</a>
        </li>
    </ul>

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
        <!-- Navbar Search -->
        <li class="nav-item">
            <a class="nav-link" data-widget="navbar-search" href="#" role="button">
                <i class="fas fa-search"></i>
            </a>
            <div class="navbar-search-block">
                <form class="form-inline">
                    <div class="input-group input-group-sm">
                        <input class="form-control form-control-navbar" type="search" placeholder="Search"
                            aria-label="Search">
                        <div class="input-group-append">
                            <button class="btn btn-navbar" type="submit">
                                <i class="fas fa-search"></i>
                            </button>
                            <button class="btn btn-navbar" type="button" data-widget="navbar-search">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </li>


        <!-- Notifications Dropdown Menu -->
        <li class="nav-item dropdown">
            <a class="nav-link" data-toggle="dropdown" href="#">
                <i class="far fa-bell"></i>
            </a>
            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                <span class="dropdown-header">1 Notificaciones</span>
                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item">
                    <i class="fas fa-envelope mr-2"></i> 4 Nuevos mensajes
                    <span class="float-right text-muted text-sm">3 mins</span>
                </a>
                <div class="dropdown-divider"></div>

                <div class="dropdown-divider"></div>

                <div class="dropdown-divider"></div>
                <a href="#" class="dropdown-item dropdown-footer">Ver todas las notificaciones</a>
            </div>
        </li>
        <li class="nav-item dropdown user-menu">
            <a href="#" class="nav-link dropdown-toggle py-1" data-toggle="dropdown">
                <img src="<?php echo $URL; ?>public/assets/vendor/AdminLTE-3.2.0/dist/img/user2-160x160.jpg"
                    class="user-image img-circle elevation-2"
                    alt="User avatar"
                    data-user-avatar>
                <span class="d-none d-md-inline ml-1 font-weight-medium" data-user-name>Usuario</span>
            </a>
            <div class="dropdown-menu dropdown-menu-right shadow border-0 rounded-lg" style="min-width: 220px;">
                <div class="dropdown-header p-3 text-center bg-primary text-white rounded-top">
                    <img src="<?php echo $URL; ?>public/assets/vendor/AdminLTE-3.2.0/dist/img/user2-160x160.jpg"
                        class="img-circle elevation-2 mb-2"
                        style="width: 70px; height: 70px; object-fit: cover;"
                        alt="User avatar"
                        data-user-avatar>
                    <p class="mb-1 font-weight-bold" data-user-name>Usuario</p>
                    <p class="text-sm text-white-50 mb-0" data-user-email>usuario@dominio.com</p>
                </div>
                <div class="dropdown-divider m-0"></div>
                <div class="px-3 py-2">
                    <button class="btn btn-outline-primary btn-sm btn-block" disabled aria-disabled="true">Perfil</button>
                </div>
                <div class="dropdown-divider m-0"></div>
                <div class="px-3 py-2">
                    <button class="btn btn-danger btn-block btn-sm" data-action="logout">Cerrar sesión</button>
                </div>
            </div>
        </li>

        <li class="nav-item">
            <a class="nav-link" data-widget="fullscreen" href="#" role="button">
                <i class="fas fa-expand-arrows-alt"></i>
            </a>
        </li>
        <li class="nav-item">
            <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                <i class="fas fa-th-large"></i>
            </a>
        </li>
    </ul>
</nav>
<!-- /.navbar -->
