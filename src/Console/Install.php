<?php
namespace Dataview\IOSlide\Console;
use Dataview\IntranetOne\Console\IOServiceInstallCmd;
use Dataview\IOSlide\IOSlideServiceProvider;
use Dataview\IOSlide\SlideSeeder;

class Install extends IOServiceInstallCmd
{
  public function __construct(){
    parent::__construct([
      "service"=>"slide",
      "provider"=> IOSlideServiceProvider::class,
      "seeder"=>SlideSeeder::class,
    ]);
  }

  public function handle(){
    parent::handle();
  }
}
