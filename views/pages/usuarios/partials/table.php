<div class="card card-primary card-outline">
    <div class="card-header">
        <h3 class="card-title">Listado</h3>
        <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 250px;">
                <input type="text" id="search-users" class="form-control float-right" placeholder="Buscar por DNI, Nombre, Email...">
                <div class="input-group-append">
                    <button type="button" class="btn btn-default">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- /.card-header -->
    <div class="card-body table-responsive p-0">
        <table class="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>DNI</th>
                    <th>Usuario</th>
                    <th>Nombre Completo</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Estado</th>
                    <th class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody id="users-table-body">
                <!-- Se llena mediante JS -->
            </tbody>
        </table>
    </div>
    <!-- /.card-body -->
    <div class="card-footer clearfix" id="users-pagination">
        <!-- Se llena mediante JS -->
    </div>
</div>
