class Orbe {
  constructor(container='body',content="<h1 class = 'apply-font h-100 w-100'>seu conteúdo aqui</h1>",cb=()=>{}){
    let $default = `<div class="orbe invisible">
        <span class="orbe-handle"></span>
        <span class="orbe-animate"></span>
        <span class="orbe-processing"></span>
        <span class="orbe-editting"></span>
        <span class="orbe-remove"></span>
        <div class="orbe-content w-100 h-100">
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
      this._this.parent().find('.orbe').removeClass('orbe-active').addClass('orbe-blur');
      this._this.addClass('orbe-active');
      event.stopPropagation();
    });

    orb.on('mouseleave',(e)=>{
      this._this.removeClass('orbe-hover');
    });

    orb.find('.orbe-content').append(content);
    this._this = orb;
    this.active = false;
    this.dragg = orb.draggabilly({
      // options...
      containment: container,
      handle: '.orbe-handle'
    })
    .on('dragStart',(e,p,m)=>{
      this._this.parent().find('.orbe').removeClass('orbe-active').addClass('orbe-blur');
      this._this.addClass('orbe-active');
    })
    .on('dragMove',(e,p,m)=>{
      this._this.addClass('orbe-active');
    });
    cb(this);
  }
}