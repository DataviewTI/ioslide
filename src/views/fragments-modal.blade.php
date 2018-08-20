@php
  $fsizes = [10,14,18,24,30,36,48,60,72,96,120,144];
@endphp
<div class="modal fade" id = 'orbs-modal' tabindex="-1" role="dialog" aria-labelledby="SlideModal" aria-hidden="true">
  <div class="modal-dialog modal-md modal-dialog-centered" style = 'max-width: 100%!important; width:100%!important;' role="document">
    <div class="modal-content">
      <div class="modal-header position-relative">
        <div class="modal-title w-100 d-flex">
          <div class = 'col-4 col-xs-12 d-flex p-0'>
            <button class = 'btn btn-lg btn-circle btn-info my-auto mr-2' id = 'btn-add-orb'>
              <i class = 'ico ico-plus'></i>
            </button>
            <input id="font-select" type="text">
              <select class = 'orb-selection' id = 'fsize'>
              @foreach($fsizes as $p)
                <option value = '{{$p}}' @if($p==48){{'selected'}}@endif>{{$p}}</option>
              @endforeach
              </select>
            <input id="fcolor" type="text">
          </div>
          <div class = 'col-3 d-flex'>
            <select class = 'orb-selection' id = 'o-animate'>
              <option value = ''>Sem animação</option>
              @include('Slide::css-animations')
            </select>
            <select class = 'orb-selection' id = 'o-speed'>
              <option value = ''>normal</option>
              <option value = 'slow'>lenta</option>
              <option value = 'slower'>mais lenta</option>
              <option value = 'fast'>rápida</option>
              <option value = 'faster'>mais rápida</option>
            </select>
            <select class = 'orb-selection' id = 'o-delay'>
              <option value = ''>1s</option>
              <option value = 'delay-2s'>2s</option>
              <option value = 'delay-3s'>3s</option>
              <option value = 'delay-4s'>4s</option>
              <option value = 'delay-5s'>5s</option>
            </select>
          </div>
          <div class = 'col-3 d-flex justify-content-center px-0' style = 'height:48px'>
            <span class = 'mr-2 m-auto'>
                <button type="button" class="btn btn-lg mx-auto aanjulena-btn-toggle btn-sm active"
                data-toggle="button" aria-pressed="true" data-default-state='true'
                autocomplete="off" name = 'text-shadow' id = 'text-shadow'>
                  <div class="handle"></div>
                </button>
                <input type = 'hidden' name = '__text-shadow' id = '__text-shadow' value='true'/>
            </span>
            <div class = 'container-text-shadow d-flex justify-content-center position-relative'>
              <span>
                <input type="text" id = 'shadow-angle' value='45'/>
              </span>
              <span>
                  <input id="shadow-color" type="text">
              </span>
              <span class = 'mx-2'>
                <input type="text" id = 'shadow-distance' value='5'/>
              </span>
              <span>
                <input type="text" id = 'shadow-blur' value='2'/>
              </span>
            </div>
          </div>
          <div class = 'col-2 d-flex justify-content-center'>
            <button type="button" id = 'btn-orb-preview' class="btn btn-lg btn-danger mr-3 my-auto">
              <span class = 'ico ico-eye'></span>
            </button>
            <button type="button" class="btn btn-lg btn-success my-auto" dz-info-modal='btn-save'>
              <span class = 'ico ico-save'></span>
            </button>
          </div>
      </div>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span class = 'ico ico-close' aria-hidden="true"></span>
        </button>
      </div>
      <div class="modal-body h-100">
        <div class = 'row h-100'>
          <div class = 'col-12'>
            <div class = 'thumbnail d-flex h-100'>
              <div class = 'container-orbes m-auto'>
                  <img class = 'img-fluid w-100' dz-info-modal = 'img'/>
                  <div class = 'container-splitters d-flex'>
                    <div id = 'splita' data-col='1' class = 'splitter position-relative'>
                      <div id = 'split1' data-row='1' class = 'vsplitter position-relative'></div>
                      <div id = 'split2' data-row='2' class = 'vsplitter position-relative'></div>
                      <div id = 'split3' data-row='3' class = 'vsplitter position-relative'></div>
                    </div>
                    <div id = 'splitb' data-col='2' class = 'splitter position-relative'>
                      <div id = 'split4' data-row='1' class = 'vsplitter position-relative'></div>
                      <div id = 'split5' data-row='2' class = 'vsplitter position-relative'></div>
                      <div id = 'split6' data-row='3' class = 'vsplitter position-relative'></div>
                    </div>
                    <div id = 'splitc' data-col='3' class = 'splitter position-relative'>
                      <div id = 'split7' data-row='1' class = 'vsplitter position-relative'></div>
                      <div id = 'split8' data-row='2' class = 'vsplitter position-relative'></div>
                      <div id = 'split9' data-row='3' class = 'vsplitter position-relative'></div>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer p-3 d-none">
        <div class = 'w-100'>
            <button type="button" class="btn btn-lg btn-danger float-left d-inline" data-dismiss="modal"><span class = 'ico ico-close'></span> Fechar</button>
        </div>
      </div>
    </div>
  </div>
</div>
