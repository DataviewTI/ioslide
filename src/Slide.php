<?php
namespace Dataview\IOSlide;

use Dataview\IntranetOne\IOModel;
use Dataview\IntranetOne\File as ProjectFile;
use Dataview\IntranetOne\Group;
use Illuminate\Support\Facades\Storage;

class Slide extends IOModel
{
  protected $fillable = ['name','date_start','date_end','interval','controls','indicators','pause','wrap','group_id','width','height'];

  public function group(){
    return $this->belongsTo('Dataview\IntranetOne\Group');
  }

  public static function boot(){
    parent::boot(); 

    static::created(function (Slide $obj) {
        $group = new Group([
          'group' => "Album do Slide ".$obj->id,
          'sizes' => $obj->getAppend("sizes")
        ]);
        $group->save();
        $obj->group()->associate($group)->save();
    });
    
  }
}
