new IOService({
    name:'Slide',
  },
  function(self){

    $('[data-toggle="popover"]').popover();

    $('#close_on_esc').attrchange(function(attrName) {
      if(attrName == 'aria-pressed'){
        console.log($(this).attr('aria-pressed'));
        //$('#__close_on_esc').val($(this).attr('aria-pressed'));
      }
    });

    Sortable.create(document.getElementById('custom-dropzone'),{
      animation: 250,
      handle: ".dz-reorder",
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
          url:{
            enable:false,
            validators:{
              uri:{
                message: 'Informe uma URL válida!'
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
          width:{
            enabled:true,
            validators:{
              greaterThan: {
                value: 1,
                message: 'Alt. Mínima 1px',
              },
              lessThan: {
                value: 2000,
                message: 'Larg. Máxima 2000px',
              }
            }
          },
          height:{
            enabled:true,
            validators:{
              greaterThan: {
                value: 1,
                message: 'Larg. Mínima 1px',
              },
              lessThan: {
                value: 1000,
                message: 'Alt. Máxima 1000px',
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

    let fv2 = FormValidation.formValidation(
      form.querySelector('.step-pane[data-step="2"]'),
      {
        fields: {
          imageorvideo:{
            validators:{
              callback:{
                message: 'O popup deve conter uma imagem ou um vídeo!',
                callback: function(input){
                  
                  if(self.dz.files.length==0){
                    toastr["error"]("O slide deve conter ao menos uma imagem!")
                    return false;
                  }
                  return true
                }
              }
            }
          },
        },
        plugins: {
          trigger: new FormValidation.plugins.Trigger(),
          submitButton: new FormValidation.plugins.SubmitButton(),
          bootstrap: new FormValidation.plugins.Bootstrap(),
          icon: new FormValidation.plugins.Icon({
            valid: 'fv-ico ico-check',
            invalid: 'fv-ico ico-close',
            validating: 'fv-ico ico-gear ico-spin'
          }),
        },
    }).setLocale('pt_BR', FormValidation.locales.pt_BR);

    self.fv = [fv1, fv2];
    
    //Dropzone initialization
    Dropzone.autoDiscover = false;
    self.dz = new DropZoneLoader({
      id:'#custom-dropzone',
      autoProcessQueue	: false,
      thumbnailWidth: 680,
      thumbnailHeight: 340,
      copy_params:{
        original:true,
        sizes:{
         }
      },
      removedFile:function(file){
      },
      onSuccess:function(file,ret){
        self.fv[1].revalidateField('imageorvideo');
      }
    });

    // modal window template
    var modalTemplate = `
    <div class="modal crop-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content" style="">
                <div class="modal-header">
                    <h5 class="modal-title">Ajuste da Imagem</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" style=""> 
                    <div class="row">
                        <div class="col-12">
                            <div class="image-container" style="height: 60vh"></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <div class="row w-100">
                        <div class="col-6 pl-0">
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-default rotate-left"><i class="ico ico-rotate-left"></i></button>
                                <button type="button" class="btn btn-default rotate-right"><i class="ico ico-rotate-right"></i></button>
                            </div>

                            <div class="btn-group" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-default zoom-in"><i class="ico ico-zoom-in"></i></button>
                                <button type="button" class="btn btn-default zoom-out"><i class="ico ico-zoom-out"></i></button>
                            </div>
                        </div>
                        <div class="col-6 d-flex justify-content-end">
                            <button type="button" class="btn btn-primary crop-upload" style="margin-right: 5px;">Salvar</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    
    if(window.IntranetOne.popup != undefined && window.IntranetOne.popup.crop.activate){
      // listen to thumbnail event to trigger crop actions
      self.dz.on('thumbnail', function (file) {
        if(file.upload != undefined){
          // ignore files which were already cropped and re-rendered
          // to prevent infinite loop
          if (file.cropped) {
              return;
          }
          // cache filename to re-assign it to cropped file
          var cachedFilename = file.name;
          // remove not cropped file from dropzone (we will replace it later)
          self.dz.removeFile(file);
          
          // dynamically create modals to allow multiple files processing
          var $cropperModal = $(modalTemplate);
          // 'Crop and Upload' button in a modal
          var $uploadCrop = $cropperModal.find('.crop-upload');
          var $zoomIn = $cropperModal.find('.zoom-in');
          var $zoomOut = $cropperModal.find('.zoom-out');
          var $rotateLeft = $cropperModal.find('.rotate-left');
          var $rotateRight = $cropperModal.find('.rotate-right');

          var $img = $('<img style="max-width: 100%;"/>');

          // initialize FileReader which reads uploaded file
          var reader = new FileReader();
          reader.onloadend = function () { 
              // add uploaded and read image to modal
              $cropperModal.find('.image-container').html($img);
              $img.attr('src', reader.result);

              // initialize cropper for uploaded image
              var aspecRatio = window.IntranetOne.popup.crop.aspect_ratio_x / window.IntranetOne.popup.crop.aspect_ratio_y;
              $img.cropper({
                  viewMode: 0, 
                  aspectRatio: aspecRatio,
                  // autoCropArea: 1,
                  movable: false,
                  cropBoxResizable: true,
                  // minContainerWidth: 850
              });
          };
          // read uploaded file (triggers code above)
          reader.readAsDataURL(file);

          $cropperModal.modal('show');

          // listener for 'Crop and Upload' button in modal
          $uploadCrop.on('click', function() {
              // get cropped image data
              var blob = $img.cropper('getCroppedCanvas').toDataURL();
              // transform it to Blob object
              var newFile = dataURItoBlob(blob);
              // set 'cropped to true' (so that we don't get to that listener again)
              newFile.cropped = true;
              // assign original filename
              newFile.name = cachedFilename;

              // add cropped file to dropzone
              self.dz.addFile(newFile);
              // upload cropped file with dropzone
              self.dz.processQueue();
              $cropperModal.modal('hide');
          });

          $zoomIn.on('click', function() {
            var cropper = $img.data('cropper');
            cropper.zoom(0.1);
          });

          $zoomOut.on('click', function() {
            var cropper = $img.data('cropper');
            cropper.zoom(-0.1);
          });

          $rotateLeft.on('click', function() {
            var cropper = $img.data('cropper');
            cropper.rotate(-90);
          });

          $rotateRight.on('click', function() {
            var cropper = $img.data('cropper');
            cropper.rotate(90);
          });  
        }
      });
    }

    //need to transform wizardActions in a method of Class
    self.wizardActions(function(){
      // self.imgOrVideoFv.revalidateField('imageorvideo');

      //criar função para calcular o aspectratio
      //let img_dim = getDimension(self);
      //self.dz.copy_params.sizes = img_dim;
      //self.dz.options.thumbnailHeight = img_dim.thumb.h;
      //self.dz.options.thumbnailWidth = img_dim.thumb.w;

      $("[name='__dz_images']").val(JSON.stringify(self.dz.getOrderedDataImages()));
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
        console.log(data);
        $("[name='name']").val(data.name);
        $("[name='url']").val(data.url);
        $("[name='date_start']").pickadate('picker').set('select',new Date(data.date_start));
        if(data.date_end!=null)
          $("[name='date_end']").pickadate('picker').set('select',new Date(data.date_end));
        $("[name='open_delay']").val(data.open_delay);
        $("[name='close_delay']").val(data.close_delay);
        $("[name='width']").val(data.width);
        $("[name='height']").val(data.height);

        $("#close_on_esc").aaToggle(!data.close_on_esc==0);

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


// transform cropper dataURI output to a Blob which Dropzone accepts
function dataURItoBlob(dataURI) {
  var byteString = atob(dataURI.split(',')[1]);
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: 'image/jpeg' });
}