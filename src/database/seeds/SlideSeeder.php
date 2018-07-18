<?php
namespace Dataview\IOSlide;

use Illuminate\Database\Seeder;
use Dataview\IntranetOne\Service;
use Sentinel;
use Dataview\IntranetOne\Slide;

class SlideSeeder extends Seeder
{
    public function run(){
      //cria o serviço se ele não existe
      if(!Service::where('service','Slide')->exists()){
        Service::insert([
            'service' => "Slide",
            'alias' =>'slide',
            'ico' => 'ico-image',
            'description' => "Controle de Slides",
            'order' => Service::max('order')+1
          ]);
      }
      //seta privilegios padrão para o user admin
      $user = Sentinel::findById(1);
      $user->addPermission('slide.view');
      $user->addPermission('slide.create');
      $user->addPermission('slide.update');
      $user->addPermission('slide.delete');
      $user->save();
    }
} 
