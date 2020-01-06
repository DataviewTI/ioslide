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
            'trans' =>'Slides',
            'alias' =>'slide',
            'ico' => 'ico-slider',
            'description' => "Controle de Slides",
            'order' => Service::max('order')+1
          ]);
      }
      //seta privilegios padrão para o user odin
      $odinRole = Sentinel::findRoleBySlug('odin');
      $odinRole->addPermission('slide.view');
      $odinRole->addPermission('slide.create');
      $odinRole->addPermission('slide.update');
      $odinRole->addPermission('slide.delete');
      $odinRole->save();

      //seta privilegios padrão para o role admin
      $adminRole = Sentinel::findRoleBySlug('admin');
      $adminRole->addPermission('slide.view');
      $adminRole->addPermission('slide.create');
      $adminRole->addPermission('slide.update');
      $adminRole->addPermission('slide.delete');
      $adminRole->save();
    }
} 
