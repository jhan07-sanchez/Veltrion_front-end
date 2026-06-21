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

                    <form id="loginForm" action="<?php echo $URL; ?>" method="POST" autocomplete="on"
                        onsubmit="if(document.getElementById('txtUsuario').value !== 'admin' || document.getElementById('txtPassword').value !== 'admin') { alert('Usuario o contraseña de prueba incorrectos (Usa admin/admin)'); return false; }">

                        <div class="mb-3">
                            <label for="txtUsuario" class="form-label">Usuario</label>
                            <input type="text" id="txtUsuario" name="usuario" class="form-control"
                                placeholder="Ingrese su usuario" required aria-required="true">
                        </div>

                        <div class="mb-3">
                            <label for="txtPassword" class="form-label">Contraseña</label>
                            <input type="password" id="txtPassword" name="password" class="form-control"
                                placeholder="Ingrese su contraseña" required aria-required="true">
                        </div>

                        <button type="submit" class="btn btn-principal w-100">
                            Iniciar sesión
                        </button>

                        <footer class="mt-3 text-center">
                            <div class="mb-2">
                                <a href="registro.html" class="text-decoration-none">
                                    Crear una cuenta
                                </a>
                            </div>
                            <div>
                                <a href="#" class="text-decoration-none text-muted">
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>
                        </footer>

                    </form>

                </div>
            </div>
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" defer></script>
    <script src="<?php echo $URL; ?>public/assets/js/script.js"></script>
</body>

</html>