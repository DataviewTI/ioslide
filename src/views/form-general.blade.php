<div class = 'row'>
  <div class="col-sm-6 col-cx-12 pl-1">
    <div class = 'row'>
      <div class="col-12">
        <div class="form-group">
          <label for = 'name' class="bmd-label-floating __required">Nome/Título do slide</label>
          <input name = 'name' type = 'text' class = 'form-control form-control-lg' />
        </div>
      </div>
    </div>
    <div class = 'row' style = 'height:80px'>
      <div class="col-3 col-xs-12">
        <div class="form-group">
          <div>
            <label for = 'controls' class = 'bmd-label-static w-100 text-center'>Exibir Controles?</label>
            <div class = 'w-100 d-flex mt-3'>
              <button type="button" class="btn btn-lg mx-auto aanjulena-btn-toggle btn-sm active"
              data-toggle="button" aria-pressed="true" data-default-state='true'
              autocomplete="off" name = 'controls' id = 'controls'>
                <div class="handle"></div>
              </button>
              <input type = 'hidden' name = '__controls' id = '__controls' value='true'/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 col-xs-12">
        <div class="form-group">
          <div>
            <label for = 'indicators' class = 'bmd-label-static w-100 text-center'>Exibir Indicadores?</label>
            <div class = 'w-100 d-flex mt-3'>
              <button type="button" class="btn btn-lg mx-auto aanjulena-btn-toggle btn-sm"
              data-toggle="button" aria-pressed="false" data-default-state='true'
              autocomplete="off" name = 'indicators' id = 'indicators'>
                <div class="handle"></div>
              </button>
              <input type = 'hidden' name = '__indicators' id = '__indicators' value='false'/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 col-xs-12">
        <div class="form-group">
          <div>
            <label for = 'pause' class = 'bmd-label-static w-100 text-center'>Pausar no hover?</label>
            <div class = 'w-100 d-flex mt-3'>
              <button type="button" class="btn btn-lg mx-auto aanjulena-btn-toggle btn-sm"
              data-toggle="button" aria-pressed="false" data-default-state='true'
              autocomplete="off" name = 'pause' id = 'pause'>
                <div class="handle"></div>
              </button>
              <input type = 'hidden' name = '__pause' id = '__pause' value='false'/>
            </div>
          </div>
        </div>
      </div>
      <div class="col-3 col-xs-12">
        <div class="form-group">
          <div>
            <label for = 'wrap' class = 'bmd-label-static w-100 text-center'>Ciclo infinito?</label>
            <div class = 'w-100 d-flex mt-3'>
              <button type="button" class="btn btn-lg mx-auto aanjulena-btn-toggle btn-sm active"
              data-toggle="button" aria-pressed="true" data-default-state='true'
              autocomplete="off" name = 'wrap' id = 'wrap'>
                <div class="handle"></div>
              </button>
              <input type = 'hidden' name = '__wrap' id = '__wrap' value='true'/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr />
    <div class = 'row'>
      <div class="col-sm-3 col-xs-12">
        <div class="form-group">
          <label for = 'date_start' class="bmd-label-floating __required">Exibir em</label>
          <input name = 'date_start' id = 'date_start' type = 'text' 
          class = 'form-control datepicker form-control-lg' />
        </div>
      </div>
      <div class="col-sm-3 col-xs-12">
        <div class="form-group">
          <label for = 'date_end' class="bmd-label-floating">Exibir até</label>
          <input name = 'date_end' id = 'date_end' type = 'text' 
          class = 'form-control datepicker form-control-lg' />
        </div>
      </div>
      <div class="col-sm-3 col-xs-12">
        <div class="form-group">
          <label for = 'interval' class="bmd-label-floating">Transição em (ms)</label>
          <input name = 'interval' id = 'interval' type = 'text' maxlength="5" min='0' max = '99999' onkeypress='return event.charCode >= 48 && event.charCode <= 57'
          class = 'form-control form-control-lg' />
        </div>
      </div>
    </div>
    <div class = 'row'>
      <div class="col-sm-3 col-xs-12">
        <div class="form-group">
          <label for = 'width' class="bmd-label-static">Largura (px)</label>
          <input name = 'width' id = 'width' type = 'text' maxlength="4" min='1' max = '2000' onkeypress='return event.charCode >= 48 && event.charCode <= 57'
          class = 'form-control form-control-lg' />
        </div>
      </div>
      <div class="col-3 col-xs-12">
        <div class="form-group">
          <label for = 'height' class="bmd-label-static">Altura (px)</label>
          <input name = 'height' id = 'height' type = 'text' 
          class = 'form-control form-control-lg' maxlength="4" min='1' max = '2000' onkeypress='return event.charCode >= 48 && event.charCode <= 57' />
        </div>
      </div>
      <div class="col-3 col-xs-12">
        <div class="form-group">
          <label for = 'aspect_ratio' class="bmd-label-static">Aspect Ratio</label>
          <input name = 'aspect_ratio' id = 'aspect_ratio' type = 'text' 
          class = 'form-control form-control-lg disabled' disabled=disabled/>
        </div>
      </div>
    </div>
  </div>
  <div class="col-sm-6 col-xs-12">
    @include("IntranetOne::io.forms.form-images",[
      "modal" => 'Slide::infos-modal'
    ])
  </div>
</div>

