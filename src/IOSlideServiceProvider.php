<?php

namespace Dataview\IOSlide;

use Illuminate\Support\ServiceProvider;

class IOSlideServiceProvider extends ServiceProvider
{
  public static function pkgAddr($addr){
    return __DIR__.'/'.$addr;
  }

  public function boot(){
    $this->loadViewsFrom(__DIR__.'/views', 'Slide');
  }

  public function register(){
  $this->commands([
    Console\Install::class,
    Console\Remove::class
  ]);

  $this->app['router']->group(['namespace' => 'dataview\ioslide'], function () {
    include __DIR__.'/routes/web.php';
  });
  
    $this->app->make('Dataview\IOSlide\SlideController');
    $this->app->make('Dataview\IOSlide\SlideRequest');
  }
}
