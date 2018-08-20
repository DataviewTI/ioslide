class Orbe {
  constructor(container='body',content="<h1 class = 'apply-font h-100 w-100'>seu conteúdo aqui</h1>",cb=()=>{}){
    let $default = `<div class="orbe invisible w-100 h-100">
        <div class = 'w-100 orbe-action-tools d-flex'>
          <span class="orbe-icon orbe-animate ml-2"></span>
          <span class="orbe-icon orbe-processing mr-auto"></span>
          <span class="orbe-icon orbe-save"></span>
          <span class="orbe-icon orbe-editting"></span>
          <span class="orbe-icon orbe-remove"></span>
        </div>
        <div class = 'orbe-text-tools d-flex flex-column justify-content-start'>
          <span class="orbe-icon orbe-handle"></span>
          <span class="orbe-icon orbe-text-align mt-2">
            <div class = 'orb-icon-submenu'>
              <div class = 'd-flex'>
                <span class="orbe-icon orb-text-center"></span>
                <span class="orbe-icon orb-text-middle"></span>
                <span class="orbe-icon orb-text-left"></span>
                <span class="orbe-icon orb-text-right"></span>
                <span class="orbe-icon orb-text-bottom"></span>
                <span class="orbe-icon orb-text-top"></span>
              </div>
            </div>
          </span>
        </div>
        <div class="orbe-content pl-0 h-100 d-flex">
        </div>
       </div>`;    
    this.id = getRandomString(5);
    let orb = $($default).appendTo($(container));


    orb.attr('id',this.id);
    orb.on('mouseenter',(e)=>{
      this._this.addClass('orbe-hover');
    });

    orb.parent().find('.orbe').removeClass('orbe-active').addClass('orbe-blur');

    orb.addClass('orbe-active').on('click',(e)=>{
      $('.container-orbes').find('.orbe-active').removeClass('orbe-active').addClass('orbe-blur');
      this._this.addClass('orbe-active');
      event.stopPropagation();
    });

    orb.on('mouseleave',(e)=>{
      this._this.removeClass('orbe-hover');
    });

    orb.find('.orbe-content').append(content);
    this._this = orb;
    this.active = false;
    cb(this);
  }
}