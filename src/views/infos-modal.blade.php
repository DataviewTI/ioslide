<div class="modal fade" id = 'slide-modal' tabindex="-1" role="dialog" aria-labelledby="SlideModal" aria-hidden="true">
  <div class="modal-dialog modal-md modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"><i class = 'ico ico-slide'></i> Outras informações do slide</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span class = 'ico ico-close' aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body">
        <div class = 'row'>
          <div class = 'col-12'>
            <div class = 'thumbnail'>
              <img class = 'img-fluid w-100' dz-info-modal = 'img'/>
            </div>
          </div>
        </div>
        <hr />
        <div class = 'row'>
          <div class = 'col-12'>
            <div class="form-group">
              <label for = 'dz-info-url' class="bmd-label-floating __required">URL</label>
              <input id = 'dz-info-url' type = 'text' class = 'form-control form-control-lg' />
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer p-3">
        <div class = 'w-100'>
            <button type="button" class="btn btn-lg btn-danger float-left d-inline" data-dismiss="modal"><span class = 'ico ico-close'></span> Fechar</button>
            <button type="button" class="btn btn-lg btn-success float-right" dz-info-modal='btn-save'><span class = 'ico ico-save'></span> Salvar Informações</button>
        </div>
      </div>
    </div>
  </div>
</div>
