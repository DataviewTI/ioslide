new IOService({
    name:'Slide',
  },
  function(self){


  //self.orbs = new Orbe();
    let btn_add_slide = $(`<button type = 'button' class = 'd-flex btn-lg btn-info btn-add-slide'>
      <i class = 'ico ico-plus my-auto'></i>
    </button>`).on('click',()=>{
      $('#custom-dropzone').trigger('click');
    });

    $(".dropzone-container").append(btn_add_slide);
    $('#btn-orb-preview').on('click',(e)=>{

      let ico = $(e.target).find('.ico');
      let _orbes = $('.container-orbes').find('.orbe[data-animate]');
      let counter = _orbes.length;
      if(_orbes.length){
        ico.addClass('ico-orbe ico-spin').removeClass('ico-eye');
        $('#orbs-modal .modal-header').css('position','relative').setDisabled(true);
        $('.container-splitters .gutter').css('visibility','hidden');
        $('.container-orbes')
        .find('.orbe')
        .removeClass('orbe-active')

        _orbes.each((index,el)=>{
          let _el = $(el);
          let _anim = _el.attr('data-animate');
          _el.animateCss(_anim,()=>{
            if(!--counter){
              $('#orbs-modal .modal-header').setDisabled(false);
              ico.removeClass('ico-orbe ico-spin').addClass('ico-eye')
              $('.container-splitters .gutter').css('visibility','visible');
            }
          });
        });
      }
    });

    $('#shadow-angle').knob({
      "min":0,
      "max":360,
      "fgColor":"#333",
      "skin":"tron",
      font : "normal 10px Oswald",
      "width":48,
      thickness:.3,
      cursor:10,
      'change' : v=> {
        applyTextShadow($('.container-orbes').find('.orbe-active .apply-font'));
      }
    });

    $('#shadow-distance').knob({
      "min":-75,
      "max":75,
      rotation:"anticlockwise",
      "fgColor":"#333",
      "skin":"tron",
      font : "normal 10px Oswald",
      "width":48,
      thickness:.3,
      cursor:10,
      'change' : v=> {
        applyTextShadow($('.container-orbes').find('.orbe-active .apply-font'));
      }
    });

    $('#shadow-blur').knob({
      "min":0,
      "max":30,
      "fgColor":"#333",
      "skin":"tron",
      font : "normal 10px Oswald",
      "width":48,
      thickness:.3,
      cursor:10,
      'change' : v=> {
        applyTextShadow($('.container-orbes').find('.orbe-active .apply-font'));
      }
    });

    //$('.container-text-shadow').setDisabled(true);

    $('#text-shadow').attrchange(function(attrName){
      let attr = $(this).attr('aria-pressed');
      if(attrName == 'aria-pressed'){
        $('#__text-shadow').val(attr);

        if(attr == 'true'){
          $('.container-text-shadow').setDisabled(false);
          applyTextShadow($('.container-orbes').find('.orbe-active .apply-font'));
        }
        else{
          $('.container-text-shadow').setDisabled(true);
          $('.container-orbes').find('.orbe-active .apply-font').css('text-shadow','none');
        }

      }
    });

    $('#btn-add-orb').on('click',(e)=>{
      addOrbe();
    });

    $('.container-orbes').on('click',(e)=>{
      //console.log(this);
      $('.container-orbes')
      .find('.orbe')
      .addClass('orbe-blur')
      .removeClass('orbe-active editting')
      .find('.orb-text-edit').each((i,obj)=>{
        let _obj = $(obj);
        let h1 = $(obj).next();
        h1.text(_obj.val());
        _obj.remove();
      })

      $('.font-select').parent().setDisabled(false).next().setDisabled(false);


      //console.log(self.fontPicker.getActiveFont());
     });

     $('#font-select').fontselect({
      placeholder: 'Selecione a fonte'
     }).change(function(){
      let font = $(this).val().replace(/\+/g, ' ') || 'Oswald';
      $('.container-orbes').find('.orbe-active .apply-font').css({'font-family':font}).attr('data-font',font);
    });

    $('#fsize').change(function(){
      let size = $(this).val()+'px';
      $('.container-orbes').find('.orbe-active .apply-font').css({'font-size':size}).attr('data-size',size);
    });

    $('#fcolor').minicolors({
      defaultValue: '#fff',
      letterCase: 'uppercase',
      opacity:true,
      change: function(value, opacity) {
        let rgba = $(this).minicolors('rgbaString');
        $('.container-orbes').find('.orbe-active .apply-font').css({'color':rgba}).attr('data-color',rgba);
      }
    });

    $('#shadow-color').minicolors({
      defaultValue: '#000',
      letterCase: 'uppercase',
      opacity:true,
      change: function(value, opacity) {
        applyTextShadow($('.container-orbes').find('.orbe-active .apply-font'));
      }
    });

    $('#o-speed, #o-delay').prop('disabled',true);


    $('#o-animate').change(function(){
      setAnimation($(this).val());
    });

    $('#o-speed').change(function(){
      setAnimationSpeed($(this).val());
    });

      $('#o-delay').change(function(){
        setAnimationDelay($(this).val());
      });



    $('[data-toggle="popover"]').popover();

    $('#controls').attrchange(function(attrName) {
      if(attrName == 'aria-pressed')
        $('#__controls').val($(this).attr('aria-pressed'));
    });
    $('#indicators').attrchange(function(attrName) {
      if(attrName == 'aria-pressed')
        $('#__indicators').val($(this).attr('aria-pressed'));
    });
    $('#pause').attrchange(function(attrName) {
      if(attrName == 'aria-pressed')
        $('#__pause').val($(this).attr('aria-pressed'));
    });
    $('#wrap').attrchange(function(attrName) {
      if(attrName == 'aria-pressed')
        $('#__wrap').val($(this).attr('aria-pressed'));
    });


    Sortable.create(document.getElementById('custom-dropzone'),{
      animation: 250,
      handle: ".dz-reorder",
    });

    Sortable.create(document.getElementById('custom-dropzone'),{
      animation: 250,
      handle: ".dz-reorder",
    });


    $('.vsplitter').each((i,obj)=>{
      Sortable.create(document.getElementById($(obj).attr('id')),{
        animation: 250,
        handle: ".orbe-handle",
        group: {
          name:'orbes',
          pull: function (to, from) {
            return !(to.el.children.length > 0)
          }
        },
      });
    })


    $('#height, #width').on('change, keyup',()=>{
      $('#aspect_ratio').val(calcAspect());
    });

    //pickadate objects initialization
    $('#date_start').pickadate({
      formatSubmit: 'yyyy-mm-dd 00:00:00',
      min: new Date(),
      onClose:function(){
        //$("[name='date_end']").focus();
      }
    }).pickadate('picker').on('set', function(t){
      $('#date_end').pickadate().pickadate('picker').clear();

      if(t.select!==undefined)
        $('#date_end').pickadate().pickadate('picker').set('min',new Date(t.select));
      else
        $('#date_end').pickadate().pickadate('picker').set('min',new Date())
        self.fv[0].revalidateField('date_start');
    });

    $('#date_end').pickadate({
      formatSubmit: 'yyyy-mm-dd 00:00:00',
      min: new Date(),
      onClose:function(){
        $("[name='description']").focus();
      }
    }).pickadate('picker').on('render', function(){
      self.fv[0].revalidateField('date_end');
    });


    //Datatables initialization

    self.dt = $('#default-table').DataTable({
      aaSorting:[ [0,"desc" ]],
      ajax: self.path+'/list',
      initComplete:function(){
        //parent call
        let api = this.api();
        $.fn.dataTable.defaults.initComplete(this);

        //pickadate objects initialization
        $('#ft_dtini').pickadate({
        }).pickadate('picker').on('set', function(t){
          $('#ft_dtfim').pickadate().pickadate('picker').clear();
          if(t.select!==undefined)
            $('#ft_dtfim').pickadate().pickadate('picker').set('min',new Date(t.select));
          else
            $('#ft_dtfim').pickadate().pickadate('picker').set('min',false)
            api.draw()
        });

        $('#ft_dtfim').pickadate().pickadate('picker').on('render', function(){
          api.draw()
        });

        api.addDTBetweenDatesFilter({
          column:'date_start',
          min: $('#ft_dtini'),
          max: $('#ft_dtfim')
        });
      },
      footerCallback:function(row, data, start, end, display){
      },
      columns: [
        { data: 'id', name: 'id'},
        { data: 'name', name: 'name'},
        { data: 'date_start', name: 'date_start'},
        { data: 'date_end', name: 'date_end'},
        { data: 'actions', name: 'actions'},
      ],
      columnDefs:
      [
        {targets:'__dt_',width: "3%",class:"text-center",searchable: true,orderable:true},
        {targets:'__dt_name',searchable: true,orderable:true},
        {targets:'__dt_dt-inicial',type:'date-br',width: "9%",orderable:true,className:"text-center",
          render:function(data,type,row){
            return moment(data).format('DD/MM/YYYY');
          }
        },
        {targets:'__dt_dt-final',type:'date-br',width: "9%",orderable:true,className:"text-center",
          render:function(data,type,row){
              return data!==null ? moment(data).format('DD/MM/YYYY') : "";
          }
        },
        {targets:'__dt_s',width: "2%",orderable:false,className:"text-center",
          render:function(data,type,row){
            if(data.sizes!=''){
              data = JSON.parse(data.sizes.replace(/&quot;/g,'"'));
              let __sizes = [];
              let s;
              for(s in data.sizes){
                __sizes.push(s+': '+data.sizes[s].w+'x'+data.sizes[s].h);
              }
              return self.dt.addDTIcon({ico:'ico-structure',
              title:"<span class = 'text-left'>"+(__sizes.join('<br>'))+"</span>",
              value:1,pos:'right',_class:'text-primary text-normal',html:true});
            }
            else
              return "";
            }
        },
        {targets:'__dt_acoes',width:"7%",className:"text-center",searchable:false,orderable:false,
          render:function(data,type,row,y){
            return self.dt.addDTButtons({
              buttons:[
                // {ico:'ico-eye',_class:'text-primary',title:'preview'},
                {ico:'ico-edit',_class:'text-info',title:'editar'},
                {ico:'ico-trash',_class:'text-danger',title:'excluir'},
            ]});
          }
        }
      ]
    }).on('click',".btn-dt-button[data-original-title=editar]",function(){
      var data = self.dt.row($(this).parents('tr')).data();
      self.view(data.id);
    }).on('click','.ico-trash',function(){
      var data = self.dt.row($(this).parents('tr')).data();
      self.delete(data.id);
    }).on('click','.ico-eye',function(){
      var data = self.dt.row($(this).parents('tr')).data();
      preview({id:data.id});
    }).on('draw.dt',function(){
      $('[data-toggle="tooltip"]').tooltip();
    });

    let form = document.getElementById(self.dfId);
    let fv1 = FormValidation.formValidation(
      form.querySelector('.step-pane[data-step="1"]'),
      {
        fields: {
          name:{
            validators:{
              notEmpty:{
                message: 'O nome/título do slide é obrigatório!'
              }
            }
          },
          date_start:{
            validators:{
              notEmpty:{
                message: 'O data inicial é obrigatória'
              },
              date:{
                format: 'DD/MM/YYYY',
                message: 'Informe uma data válida!'
              }
            }
          },
          date_end:{
            validators:{
              date:{
                format: 'DD/MM/YYYY',
                message: 'Informe uma data válida!'
              }
            }
          },
          width: {
            validators: {
              notEmpty:{
                message: 'Largura obrigatória!'
              },
              between: {
                min: 1,
                max: 2000,
                message: 'entre 1 e 2000px'
              }
            }
          },
          height: {
            validators: {
              notEmpty:{
                message: 'Altura obrigatória!'
              },
              between: {
                  min: 1,
                  max: 1000,
                  message: 'entre 1 e 1000px'
              }
            }
          },
          has_images:{
            validators:{
              callback:{
                message: 'O slide deve conter ao menos uma image!',
                callback: function(input){

                  if(self.dz.files.length==0){
                    toastr["error"]("O slide deve conter ao menos uma imagem!")
                    return false;
                  }
                  $('#has_images').val(true);
                  return true
                }
              }
            }
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          // defaultSubmit: new FormValidation.plugins.DefaultSubmit(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
          icon: new FormValidation.plugins.Icon({
            valid: 'fv-ico ico-check',
            invalid: 'fv-ico ico-close',
            validating: 'fv-ico ico-gear ico-spin'
          }),
        },
    }).setLocale('pt_BR', FormValidation.locales.pt_BR);

    self.fv = [fv1];


    //Dropzone initialization
    Dropzone.autoDiscover = false;
    self.dz = new DropZoneLoader({
      id:'#custom-dropzone',
      autoProcessQueue	: false,
      thumbnailWidth: 610,
      thumbnailHeight: 222,
      mainImage:false,
      copy_params:{
        original:true,
        sizes:{
         }
      },
      crop:{
        ready:(cr)=>{
          let w = $('#width').val();
          let h = $('#height').val();
          if(w>0 && h>0){
            let r = gcd (w, h);
            cr.aspect_ratio_x = w/r;
            cr.aspect_ratio_y = h/r;
          }
          else{
            cr.aspect_ratio_x = 1;
            cr.aspect_ratio_y = 1;
          }
        }
      },
      buttons:{
        'slide':{
          ico:'ico-slider',
          tooltip:'infos do slider',
          bg:'bg-warning',
          action:(file)=>{
            self.dz.addModal({
              obj:$('#slide-modal'),
              file,
            })
          },
        },
        'orbs':{
          ico:'ico-orbe',
          tooltip:'orbes',
          bg:'bg-success',
          action:(file)=>{

            let _w = $('#width').val() == '' ? 1350 : $('#width').val();
            let _h = $('#height').val() == '' ? 500 : $('#height').val();

            self.dz.addModal({
              obj:$('#orbs-modal'),
              file,
              onShow:(params,obj)=>{
                let img = obj.find("[dz-info-modal='img']");
                img.removeClass('w-100').addClass('m-auto').css({width:`${_w}px`,height:`${_h}px`});

                file.splits = [];

                setTimeout(function(){
                  file.splits.push(Split(['#splita', '#splitb','#splitc'], {
                      gutterSize:5,
                      minSize:100
                    }));

                  file.splits.push(Split(['#split1','#split2','#split3'], {
                    direction:'vertical',
                    gutterSize:5,
                    minSize:25
                  }));

                  file.splits.push(Split(['#split4','#split5','#split6'], {
                    direction:'vertical',
                    gutterSize:5,
                    minSize:25
                  }));

                  file.splits.push(Split(['#split7','#split8','#split9'], {
                    direction:'vertical',
                    gutterSize:5,
                    minSize:25
                  }));


                  if(params.infos.data.cols!==undefined){
                    let _cols = params.infos.data.cols;
                    file.splits.forEach((obj,i)=>{
                      if(!i)
                        obj.setSizes([_cols[0].percent,_cols[1].percent,_cols[2].percent]);
                      else
                        obj.setSizes([_cols[i-1].rows[0],_cols[i-1].rows[1],_cols[i-1].rows[2]]);
                    })
                  }
                },500);

                //(self.toView!==null)



                //console.log(params.infos.data.orbs);
                for(let o in params.infos.data.orbs){
                  let __orb = params.infos.data.orbs[o];

                  $('head').append(`<link href="https://fonts.googleapis.com/css?family=${__orb.font.replace(' ','+')}"
                   rel="stylesheet" type="text/css">`);

                  addOrbe({
                    reload:true,
                    content:__orb.content,
                    container:$(`[data-col=${__orb.col}]`).find(`[data-row=${__orb.row}]`).first(),
                    w:__orb.w,
                    h:__orb.h,
                    animate:__orb.animate,
                    delay:__orb.delay,
                    speed:__orb.speed,
                    color:__orb.color,
                    shadow:__orb.shadow
                  });
                }

                obj.on('hidden.bs.modal',e=>{
                  //remove todos os orbs
                  $('.container-orbes').find('.orbe').remove();
                  try{
                    file.splits.forEach(el=>{
                      el.destroy();
                    });
                  }
                  catch(err){}
                });
              },
              onSave:(_file,obj)=>{
                //_file.infos.data.orbes = {} //zera toda vez
                //percorre todos os orbs e atualiza os valores
                _file.infos.data.cols = calcResponsiveSizes(_file.splits),
                _file.infos.data.orbs = {}
                $('.container-orbes').find('.orbe').each((index,el)=>{
                  let _el = $(el);
                  let _font = _el.find('.orbe-content').find('.apply-font').first();
                  let _data = {
                    content:_el.find('.orbe-content').html().trim(),
                    w:_el.width(),
                    h:_el.outerHeight(),
                    col:parseInt(_el.parent().parent().attr('data-col')),
                    row:parseInt(_el.parent().attr('data-row')),
//                    col:_el.parent().parent().attr('id'),
//                    row:_el.parent().attr('id'),
                    //x:_el.data('draggabilly').position.x,
                    //y:_el.data('draggabilly').position.y,
                    font:_font.attr('data-font'),
                    size:_font.attr('data-size'),
                    color:_font.attr('data-color'),
                    animate:_el.attr('data-animate') || "",
                    delay:_el.attr('data-delay') || "",
                    speed:_el.attr('data-speed') || "",
                    shadow:_font.css('text-shadow') || ""
                  }
                  let _id = _el.attr('id');
                  _file.infos.data.orbs[_id] = _data;
                });

              }
            })
          }
        },
        edit:false,
      },
      onSuccess:function(file,ret){
        self.fv[0].revalidateField('has_images');
      }
    });


    //need to transform wizardActions in a method of Class
    self.wizardActions(function(){
      self.dz.copy_params.sizes.default = {"w":$('#width').val(),"h":$('#height').val()}
      $("[name='__dz_images']").val(JSON.stringify(self.dz.getOrderedDataImages()));
      console.log($("[name='__dz_images']").val());

      $("[name='__dz_copy_params']").val(JSON.stringify(self.dz.copy_params));
    });

    self.callbacks.view = view(self);
    self.callbacks.update.onSuccess = ()=>{
      self.tabs['listar'].tab.tab('show');
    }

    self.callbacks.create.onSuccess = ()=>{
      self.tabs['listar'].tab.tab('show');
    }

    self.callbacks.unload = self=>{
      self.dz.removeAllFiles(true);
    }

});//the end ??


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  ██╗      ██████╗  ██████╗ █████╗ ██╗         ███╗   ███╗███████╗████████╗██╗  ██╗ ██████╗ ██████╗ ███████╗
  ██║     ██╔═══██╗██╔════╝██╔══██╗██║         ████╗ ████║██╔════╝╚══██╔══╝██║  ██║██╔═══██╗██╔══██╗██╔════╝
  ██║     ██║   ██║██║     ███████║██║         ██╔████╔██║█████╗     ██║   ███████║██║   ██║██║  ██║███████╗
  ██║     ██║   ██║██║     ██╔══██║██║         ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██║   ██║██║  ██║╚════██║
  ███████╗╚██████╔╝╚██████╗██║  ██║███████╗    ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║╚██████╔╝██████╔╝███████║
  ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝    ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝ ╚══════╝
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function preview(param){
  alert('futuramente implementar uma vizualização com photoswipe');
  //var win = window.open(document.location.origin+'/reader/'+param.id+'/teste-preview', '_blank');
  //win.focus();
}
//CRUD CallBacks
function view(self){
  return{
      onSuccess:function(data){
        $("[name='name']").val(data.name);
        $("[name='date_start']").pickadate('picker').set('select',new Date(data.date_start));
        if(data.date_end!=null)
          $("[name='date_end']").pickadate('picker').set('select',new Date(data.date_end));
        $("[name='width']").val(data.width);
        $("[name='height']").val(data.height);
        $("[name='height']").trigger('keyup');

        $("#interval").val(data.interval > 0 ? data.interval : '');

        $("#controls").aaToggle(!data.controls==0);
        $("#indicators").aaToggle(!data.indicators==0);
        $("#pause").aaToggle(!data.pause==0);
        $("#wrap").aaToggle(!data.wrap==0);


        //reload imagens
          self.dz.removeAllFiles(true);

          if(data.group!=null){
            self.dz.reloadImages(data);
          }
        },
        onError:function(self){
          console.log('executa algo no erro do callback');
      }
    }
}

function calcAspect(){
  let w = $('#width').val();
  let h = $('#height').val();
  if(w>0 && h>0){
    let r = gcd(w, h);
    return `${w/r}:${h/r}`;
  }
  else{
    return "";
  }
}

function gcd(a, b) {
  return (b == 0) ? a : gcd (b, a%b);
}

function addOrbe(p={
  content:`<h1 class = 'apply-font'>${getRandomMessage()}</h1>`,
  reload:false
  }){

  $('.container-orbes')
  .find('.orbe')
  .removeClass('orbe-active');

  let element = $('.vsplitter:not(:has(*))').first().attr('id') || null;

  if(element==null)
    return null;
  else
    element = p.container!==undefined ? `#${p.container.attr('id')}` : `#${element}`;

  new Orbe(element,p.content,(orb)=>{

    orb._this.removeClass('invisible');

    if(!p.reload)//faz o bind somente se for objeto novo
      $('#font-select, #fsize, #o-animate, #o-speed, #o-delay').trigger('change');

    if(p.w!==undefined)
      orb._this.css('width',p.w+'px')

    if(p.h!==undefined)
      orb._this.css('height',p.h+'px')


    let rgba = $('#fcolor').minicolors('rgbaString');

    if(p.color==undefined)
      $('.container-orbes').find('.orbe-active .apply-font').css({'color':rgba}).attr('data-color',rgba)
    else
      $('.container-orbes').find('.orbe-active .apply-font').attr('data-color',p.color)

    if(p.shadow == undefined)
      applyTextShadow($('.container-orbes').find('.orbe-active .apply-font'));

    $('.container-orbes').find('.orbe-active .apply-font').on('dblclick',(e)=>{
      console.log('sasasasasa');
        if(!orb._this.hasClass('editting') && !orb._this.hasClass('animated')){
          let obj = $(e.target);
          $('.font-select').parent().setDisabled(true).next().setDisabled(true);
          let prop = ['color','width','height','font','text','text-align'];
          let ta = $("<textarea type = 'text' class = 'w-100 h-100 orb-text-edit'>");
          prop.forEach((a,b)=>{
            ta.css(a,obj.css(a))
          });
          ta.css('width',obj.parent().width()+'px');
          let _width = orb._this.width();
          let _height = orb._this.outerHeight();
          ta.insertBefore(obj).focus().text(obj.text()).focus();
          orb._this.css({'width':_width+'px','height':_height+'px'});
          orb._this.addClass('editting');
        }
      });

    if(p.animate!==undefined){
      setAnimation(p.animate,false);
      if(p.speed!==undefined)
        setAnimationSpeed(p.speed,false);
      if(p.delay!==undefined)
        setAnimationDelay(p.delay,false);
    }

    $('.container-orbes').find('.orbe-active .orbe-animate').on('click',(e)=>{
        let _orb = $(e.target).parent().parent();
        let _anim = _orb.attr('data-animate');
        _orb.animateCss(_anim,()=>{
        });
    });

    $('.container-orbes').find('.orbe-active .orbe-editting').on('click',(e)=>{
      $(e.target).parent().parent().trigger('click').find('.apply-font').trigger('dblclick');
    });

    $('.container-orbes').find('.orbe-active .orbe-save').on('click',(e)=>{
      $('.container-orbes').trigger('click');
    });

    $('.container-orbes').find('.orbe-active .orbe-remove').on('click',(e)=>{
      $(e.target).parent().parent().remove();
    });

    $('.container-orbes').find('.orbe-active .orb-text-center').on('click',(e)=>{
      let el = $(e.target).parent().parent().parent().parent().parent().find('.apply-font');
      el.removeClass('mr-0 ml-0 text-right text-left').addClass('mx-auto text-center');
    });

    $('.container-orbes').find('.orbe-active .orb-text-left').on('click',(e)=>{
      let el = $(e.target).parent().parent().parent().parent().parent().find('.apply-font');
      el.removeClass('mx-auto ml-auto text-center text-right').addClass('text-left');
    });

    $('.container-orbes').find('.orbe-active .orb-text-right').on('click',(e)=>{
      let el = $(e.target).parent().parent().parent().parent().parent().find('.apply-font');
      el.removeClass('mx-auto text-center text-left').addClass('ml-auto text-right');
    });

    $('.container-orbes').find('.orbe-active .orb-text-middle').on('click',(e)=>{
      let el = $(e.target).parent().parent().parent().parent().parent().find('.apply-font');
      el.removeClass('align-self-end align-self-start').addClass('my-auto');
    });

    $('.container-orbes').find('.orbe-active .orb-text-bottom').on('click',(e)=>{
      let el = $(e.target).parent().parent().parent().parent().parent().find('.apply-font');
      el.removeClass('my-auto align-self-start').addClass('align-self-end');
    });

    $('.container-orbes').find('.orbe-active .orb-text-top').on('click',(e)=>{
      let el = $(e.target).parent().parent().parent().parent().parent().find('.apply-font');
      el.removeClass('my-auto align-self-end').addClass('align-self-start');
    });

  });
}

function setAnimation(val,animate=true){
  let _orb = $('.container-orbes').find('.orbe-active');
  let oldanime = _orb.attr('data-animate') || '';
  _orb.removeClass(`animated ${oldanime}`.trim());

  if(val !== ''){
    $('#o-speed, #o-delay').removeAttr('disabled');
    _orb.attr('data-animate',val);
    if(animate){
      _orb.addClass(`animated ${val}`);
      _orb.animateCss(val,(e)=>{
      });
    }
  }
  else{
    _orb.removeAttr('data-animate');
    $('#o-speed, #o-delay').prop('disabled',true).val('');
  }
}

function setAnimationSpeed(val){
  let _orb = $('.container-orbes').find('.orbe-active');
  let old = _orb.attr('data-speed') || '';
  _orb.removeClass(`${old}`.trim());

  if(val !== ''){
      _orb.addClass(val);
      _orb.css({'data-speed':val}).attr('data-speed',val);
    }
    else
      _orb.removeAttr('data-speed');
}

function setAnimationDelay(val){
  let _orb = $('.container-orbes').find('.orbe-active');
  let old = _orb.attr('data-delay') || '';
  _orb.removeClass(`${old}`.trim());

  if(val !== ''){
    _orb.addClass(val);
    _orb.css({'data-delay':val}).attr('data-delay',val);
  }
  else
    _orb.removeAttr('data-delay');
}

function applyTextShadow(obj){
  let _angle = $('#shadow-angle').val()*((Math.PI)/180);
  let _distance = $('#shadow-distance').val();
  let _x = Math.round(_distance * Math.cos(_angle));
  let _y = Math.round(_distance * Math.sin(_angle));
  let _blur = $('#shadow-blur').val();
  let _rgba = $('#shadow-color').minicolors('rgbaString');
  obj.css('text-shadow',`${_x}px ${_y}px ${_blur}px ${_rgba}`)
}

function calcResponsiveSizes(splits){

  console.log(splits[1].getSizes());

  let perc_cola = splits[0].getSizes()[0]
  let perc_colb = splits[0].getSizes()[1]
  let perc_colc = splits[0].getSizes()[2]

  let flex_cola = Math.round(12 * (perc_cola/100))
  let flex_colb = Math.round(12 * (perc_colb/100))
  let flex_colc = Math.round(12 * (perc_colc/100))

  return [
      {
        percent:perc_cola,
        flex:flex_cola,
        rows:splits[1].getSizes()
      },
      {
        percent:perc_colb,
        flex:flex_colb,
        rows:splits[2].getSizes()
      },
      {
        percent:perc_colc,
        flex:flex_colc,
        rows:splits[3].getSizes()
      },
    ]
}

function getRandomMessage(){
 let $msg = [
  "Analyzing coffee quality...",
  "Spending a precious time...",
  "Getting stuck in traffic...",
  "Dividing by 0...",
  "Crying over spilled milk...",
  "Generating Lex's voice",
  "Patching Conics...",
  "Just a minute, while I dig the dungeon...",
  "Disinfecting germ cells...",
  "Spinning up the hamster...",
  "Programming the flux capacitor...",
  "Checking the gravitational constant in your locale...",
  "Shaking...",
  "Revolving independence...",
  "Tokenizing innovation...",
  "Spinning violently around the y-axis...",
  "Bending the spoon...",
  "Filtering moral...",
  "Swapping time and space...",
  "Stretching images...",
  "Constructing non-linear narrative...",
  "Scraping funds...",
  "Dissolving relationships...",
  "Iodizing...",
  "Distilling beauty...",
  "Constructing emotional depth...",
  "Exceeding cpu quota...",
  "Challenging everything..."
  ];

  return $msg[Math.floor(Math.random() * $msg.length)];
}
