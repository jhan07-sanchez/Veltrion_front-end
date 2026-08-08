<?php

require_once __DIR__ . '/config/app.php';

header(
    "Location: " . $URL . "views/pages/auth/login.php"
);

exit;
