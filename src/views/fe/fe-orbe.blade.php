<div class = 'fe-orbs-container'>
  @foreach($orbes as $o)
    <script>
      (function(){
        $('head').append(`<link href="https://fonts.googleapis.com/css?family={{str_replace(' ','+',$o->font)}}" rel="stylesheet" type="text/css">`);
      })();
    </script>
    <div class = 'fe-orb b-red animated {{$o->animate}} {{$o->delay}} {{$o->speed}}' style = "
    left:{{$o->x}}px;
    top:{{$o->y}}px;
    width:{{$o->w}}px;
    height:{{$o->h}}px;
    ">{!!$o->content!!}</div>
  @endforeach
  <img class="d-block w-100" src="{{$img->getPath()}}" alt="First slide">
</div>