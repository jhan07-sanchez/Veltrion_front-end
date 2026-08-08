<div class="card card-primary card-outline">
    <div class="card-header">
        <h3 class="card-title">Listado de Roles</h3>
        <div class="card-tools">
            <div class="input-group input-group-sm" style="width: 250px;">
                <input type="text" id="search-roles" class="form-control float-right" placeholder="Buscar por Nombre...">
                <div class="input-group-append">
                    <button type="button" class="btn btn-default">
                        <i class="fas fa-search"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="card-body table-responsive p-0">
        <table class="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>Nombre de Rol</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th class="text-center">Acciones</th>
                </tr>
            </thead>
            <tbody id="roles-table-body">
            </tbody>
        </table>
    </div>
    <div class="card-footer clearfix" id="roles-pagination">
    </div>
</div>
