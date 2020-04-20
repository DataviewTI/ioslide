@php
  use Dataview\IOSlide\Slide;
  use Carbon\Carbon;
  use Illuminate\Support\Str;

  $obj = isset($slide) ? $slide : Slide::first();
  $today = Carbon::now();
  $date_start = (new Carbon($obj->date_start));
  $_id = isset($id) ? $id : Str::random(6);
  $date_end = filled($obj->date_end) ? new Carbon($obj->date_end) : Carbon::createFromDate(2099,1,1);
  $is_valid_date = ($today->gte($date_start) && $today->lte($date_end));
  $_indicators = isset($indicators) ? $indicators : ($obj->indicators == 1 ? 'true' : 'false');
  $_interval =  isset($interval) ? $interval : ($obj->interval == 0 ? 5000 : $obj->interval);
  $_controls = isset($controls) ? ($controls == 1 ? 'true' : 'false') : ($obj->controls == 1 ? 'true' : 'false');
  $_wrap = isset($wrap) ? ($wrap == 1 ? 'true' : 'false') : ($obj->wrap == 1 ? 'true' : 'false');
  $_pause = isset($pause) ? ($pause == 1 ? 'hover' : 'false') : ($obj->pause == 1 ? 'hover' : 'false');  
  $_count = count($obj->group->files);

@endphp
  @if($is_valid_date)
<div id="{{$_id}}" class="carousel slide io-slide" data-interval = "{{$_interval}}" data-pause = "{{$_pause}}" data-wrap = "{{$_wrap.''}}" data-ride="carousel">
      @if($_indicators)
        <ol class="carousel-indicators">
          @for($i=0; $i<$_count;$i++)
            <li data-target="#{{$_id}}" data-slide-to="{{$i}}" class = "@if($i==0){{'active'}}@endif"></li>
          @endfor
        </ol>
      @endif
      <div class="carousel-inner">
        @foreach($obj->group->files as $img)
          <div class="{{'carousel-item'}}@if($loop->first){{' active'}}@endif">
            @if(filled($img->getData('slide','url')))
              <a href = '#'>
                <img class="d-block w-100" src="{{$img->getPath()}}" alt="First slide">
              </a>
            @else
              @php
                $container_orbes = $img->getData('orbs');
                $orbes = [];
                foreach ($container_orbes as $key=>$value){
                  array_push($orbes,$container_orbes->{$key});
                }
              @endphp
                @if(count($orbes))
                  @php
                    $dimensions = $img->getData('cols');
                  @endphp
                  <div class = 'fe-orbs-container d-flex'>
                    @foreach($dimensions as $d)
                      <div class = 'col-{{$d->flex}} p-0'>
                        @foreach($d->rows as $r)
                          <div class = 'col p-0' style = 'height:{{$r}}%'>
                            @foreach($orbes as $o)
                              @if($loop->parent->parent->iteration == $o->col)
                                @if($loop->parent->iteration == $o->row)
                                <script>
                                    (function(){
                                      $('head').append(`<link href="https://fonts.googleapis.com/css?family={{str_replace(' ','+',$o->font)}}" rel="stylesheet" type="text/css">`);
                                    })();
                                  </script>
                                  <div class = 'fe-orb d-flex p-0 w-100 h-100 animated {{$o->animate}}
                                   {{$o->delay}} {{$o->speed}}'  style = "">
                                    {!!$o->content!!}
                                  </div>
                                @endif
                              @endif
                            @endforeach
                          </div>
                        @endforeach
                      </div>
                    @endforeach
                  </div>
                  <img class="d-block w-100" src="{{$img->getPath()}}" alt="First slide">
                @else
                  <img class="d-block w-100" src="{{$img->getPath()}}" alt="First slide">
                @endif
            @endif
          </div>
        @endforeach
      </div>
      @if($_controls)
        <a class="carousel-control-prev" href="#{{$_id}}" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#{{$_id}}" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      @endif
    </div>
  @else
    <script>
        console.warn("io slide [{{$pp->name}}] expirado ou ainda não disponível!")
    </script>
  @endif