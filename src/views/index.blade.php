@extends('IntranetOne::io.layout.dashboard')

{{-- page level styles --}}
@section('header_styles')
  <link rel="stylesheet" type="text/css" href="{{ asset('css/pickadate-full.min.css') }}">
  <link rel="stylesheet" type="text/css" href="{{ asset('io/services/io-slide.min.css') }}">
@stop

@section('main-heading')
@stop

@section('main-content')
	<!--section ends-->
			@component('IntranetOne::io.components.nav-tabs',
			[
				"_id" => "default-tablist",
				"_active"=>0,
				"_tabs"=> [
					[
						"tab"=>"Listar",
						"icon"=>"ico ico-list",
						"view"=>"Slide::table-list"
					],
					[
						"tab"=>"Cadastrar",
						"icon"=>"ico ico-new",
						"view"=>"Slide::form"
					]
				]
			])
			@endcomponent
	<!-- content -->
  @stop

  {{-- @section('after_body_scripts')
    @include('IntranetOne::base.social.fb-sdk',[
        'app_id'=>config('intranetone.social_media.facebook.app_id'),
        'app_version'=>config('intranetone.social_media.facebook.app_version'),
        'app_locale'=>config('intranetone.social_media.facebook.locale')
        ])
  @endsection --}}

  @section('before_body_close')
    @include('Slide::infos-modal')
    @include('Slide::fragments-modal')
  @endsection


@section('footer_scripts')



<script src="{{ asset('js/pickadate-full.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/services/io-slide-babel.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/services/io-slide-mix.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('io/services/io-slide.min.js') }}" type="text/javascript"></script>
@stop
