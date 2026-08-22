<?php
require_once __DIR__ . '/../../../config/app.php';
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Iniciar Sesión - Veltrion</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php echo $URL; ?>public/assets/css/custon.css">
</head>

<body>

    <main class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-md-6 col-lg-4">

                <div class="card card-sistema p-4 shadow-sm">

                    <header class="logo text-center mb-4">
                        <img src="<?php echo $URL; ?>public/assets/image/logo.png" alt="Logotipo oficial de Veltrion"
                            class="logo-img" width="100" height="100">
                        <h1 class="titulo-sistema h3 mt-2">
                            Sistema Veltrion
                        </h1>
                    </header>

                    <form id="loginForm" autocomplete="on" novalidate>

                        <div class="mb-3">
                            <label for="email" class="form-label">Correo electrónico</label>
                            <input type="email" id="email" name="email" autocomplete="email" class="form-control"
                                placeholder="Ingrese su correo electrónico" required aria-required="true">
                        </div>

                        <div class="mb-3">
                            <label for="password" class="form-label">Contraseña</label>
                            <input type="password" id="password" class="form-control"
                                placeholder="Ingrese su contraseña" required aria-required="true">
                        </div>

                        <button id="btnLogin" type="submit" class="btn btn-principal w-100">
                            Iniciar sesión
                        </button>

                    </form>

                </div>
            </div>
        </div>
    </main>

    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>

    <!-- SweetAlert2 -->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <!-- Aplicación Veltrion -->
    <script type="module" src="<?php echo $URL; ?>public/assets/js/core/app.js"></script>

</body>

</html>
