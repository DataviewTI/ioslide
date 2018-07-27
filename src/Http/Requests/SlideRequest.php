<?php

namespace Dataview\IOSlide;
use Dataview\IntranetOne\IORequest;

class SlideRequest extends IORequest
{
  public function sanitize(){
    $input = parent::sanitize();

    $input['date_start'] = $input['date_start_submit'];
    $input['date_end'] =  $input['date_end_submit'];
    $input['sizes'] = $input['__dz_copy_params'];
    $input['interval'] =  empty($input['interval']) ? 0 : $input['interval'];
    $input['controls'] = (int)($input['__controls']=='true');
    $input['indicators'] = (int)($input['__indicators']=='true');
    $input['pause'] = (int)($input['__pause']=='true');
    $input['wrap'] = (int)($input['__wrap']=='true');


    $this->replace($input);
	}

  public function rules(){
    $this->sanitize();
    return [
      'name' => 'required|max:255',
    ];
  }
}
