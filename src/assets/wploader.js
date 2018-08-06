'use strict';
let mix = require('laravel-mix');

function IOSlide(params={}){
  let $ = this;
  this.dep = {
    slide: 'node_modules/intranetone-slide/src/',
    sortable: 'node_modules/sortablejs/',
    cropper: 'node_modules/cropperjs/dist/',
    jquerycropper: 'node_modules/jquery-cropper/dist/',
    dropzone: 'node_modules/dropzone/dist/',
    moment: 'node_modules/moment/',
    draggabilly:'node_modules/draggabilly/dist/',
    animate:'node_modules/animate.css/',
    fontselect:'node_modules/fontselect-jquery-plugin/',
    minicolors:'node_modules/@claviska/jquery-minicolors/',
    //resizesensor:'node_modules/resize-sensor/'
    jqueryknob:'node_modules/jquery-knob/dist/'
  }

  let config = {
    optimize:false,
    sass:false,
    fe:true,
    cb:()=>{},
  }
  
  this.compile = (IO,callback = ()=>{})=>{

    //move minicolors.png
    mix.copy($.dep.minicolors + 'jquery.minicolors.png',IO.dest.io.root+'images/plugins/jquery.minicolors.png');

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
      $.dep.fontselect + 'styles/fontselect-alternate.css',
      $.dep.minicolors + 'jquery.minicolors.css',
      $.dep.animate + 'animate.min.css',
      $.dep.slide + 'orbe.css',
      $.dep.slide + 'slide.css',
    ], IO.dest.io.root + 'services/io-slide.min.css');
    
    mix.babel([
      IO.src.js + 'extensions/ext-jquery.js',
      IO.src.io.js + 'extensions/ext-animatecss.js',
      $.dep.slide + 'Orbe.js',      
      $.dep.sortable + 'Sortable.min.js',
      IO.src.io.vendors + 'aanjulena-bs-toggle-switch/aanjulena-bs-toggle-switch.js',
      IO.dep.io.toastr + 'toastr.min.js',
      IO.src.io.js + 'defaults/def-toastr.js',
      $.dep.dropzone + 'dropzone.js',
      IO.src.io.js + 'dropzone-loader.js',
      $.dep.draggabilly + 'draggabilly.pkgd.min.js',
      $.dep.jqueryknob + 'jquery.knob.min.js',
    ], IO.dest.io.root + 'services/io-slide-babel.min.js');
    
    mix.scripts([
//      $.dep.resizesensor + 'ResizeSensor.min.js',
      $.dep.moment + 'min/moment.min.js',
      IO.src.io.vendors + 'moment/moment-pt-br.js',
      $.dep.cropper + 'cropper.js',
      $.dep.jquerycropper + 'jquery-cropper.js',
      $.dep.fontselect + 'jquery.fontselect.min.js',
      $.dep.minicolors + 'jquery.minicolors.min.js',    
    ], IO.dest.io.root + 'services/io-slide-mix.min.js');

    //copy separated for compatibility
    mix.babel($.dep.slide + 'slide.js', IO.dest.io.root + 'services/io-slide.min.js');

    if(config.fe){
      mix.styles([
        $.dep.slide + 'fe-slide.css',
        $.dep.animate + 'animate.min.css',
      ], IO.dest.css + 'fe-slide.min.css');
    }

    callback(IO);
  }
}


module.exports = IOSlide;
