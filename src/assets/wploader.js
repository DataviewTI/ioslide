'use strict';
let mix = require('laravel-mix');

function IOSlide(params={}){
  let $ = this;
  this.dep = {
    slide: 'node_modules/intranetone-slide/src/',
    moment: 'node_modules/moment/',
    sortable: 'node_modules/sortablejs/',
    cropper: 'node_modules/cropperjs/dist/',
    jquerycropper: 'node_modules/jquery-cropper/dist/',
    dropzone: 'node_modules/dropzone/dist/',
    moment: 'node_modules/moment/',
    momentdf: 'node_modules/moment-duration-format/lib/',
    wickedpicker: 'node_modules/dv-wickedpicker/dist/',
  }

  let config = {
    optimize:false,
    sass:false,
    fe:true,
    cb:()=>{},
  }
  
  this.compile = (IO,callback = ()=>{})=>{

    mix.styles([
      IO.src.css + 'helpers/dv-buttons.css',
      IO.src.io.css + 'dropzone.css',
      IO.src.io.css + 'dropzone-preview-template.css',
      IO.src.io.vendors + 'aanjulena-bs-toggle-switch/aanjulena-bs-toggle-switch.css',
      IO.src.io.css + 'sortable.css',
      IO.dep.io.toastr + 'toastr.min.css',
      IO.src.io.css + 'toastr.css',
      IO.src.io.root + 'forms/video-form.css',
      $.dep.cropper + 'cropper.css',
      $.dep.slide + 'slide.css',
    ], IO.dest.io.root + 'services/io-slide.min.css');
    
    mix.babel([
      $.dep.sortable + 'Sortable.min.js',
      IO.src.io.vendors + 'aanjulena-bs-toggle-switch/aanjulena-bs-toggle-switch.js',
      IO.dep.io.toastr + 'toastr.min.js',
      IO.src.io.js + 'defaults/def-toastr.js',
      $.dep.dropzone + 'dropzone.js',
      IO.src.io.js + 'dropzone-loader.js',
      $.dep.wickedpicker + 'wickedpicker.min.js',
    ], IO.dest.io.root + 'services/io-slide-babel.min.js');
    
    mix.scripts([
      $.dep.moment + 'min/moment.min.js',
      IO.src.io.vendors + 'moment/moment-pt-br.js',
      $.dep.cropper + 'cropper.js',
      $.dep.jquerycropper + 'jquery-cropper.js',
      $.dep.moment + 'min/moment.min.js',
      IO.src.io.vendors + 'moment/moment-pt-br.js',
      $.dep.momentdf +'moment-duration-format.js',
    ], IO.dest.io.root + 'services/io-slide-mix.min.js');

    //copy separated for compatibility
    mix.babel($.dep.slide + 'slide.js', IO.dest.io.root + 'services/io-slide.min.js');

    if(config.fe){
      mix.styles([
        $.dep.slide + 'fe-slide.css',
      ], IO.dest.css + 'fe-slide.min.css');
    }

    callback(IO);
  }
}


module.exports = IOSlide;
