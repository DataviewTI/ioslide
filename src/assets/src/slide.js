new IOService({
    name:'Slide',
  },
  function(self){

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
                {ico:'ico-eye',_class:'text-primary',title:'preview'},
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
              file
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

      console.log(self.dz.getOrderedDataImages());

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

function gcd(a, b) {
  return (b == 0) ? a : gcd (b, a%b);
}