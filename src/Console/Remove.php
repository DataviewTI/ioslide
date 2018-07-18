<?php
namespace Dataview\IOSlide\Console;
use Dataview\IntranetOne\Console\IOServiceRemoveCmd;
use Dataview\IOSlide\IOSlideServiceProvider;
use Dataview\IntranetOne\IntranetOne;


class Remove extends IOServiceRemoveCmd
{
  public function __construct(){
    parent::__construct([
      "service"=>"slide",
      "tables" =>['slides'],
    ]);
  }

  public function handle(){
    parent::handle();
  }
}
