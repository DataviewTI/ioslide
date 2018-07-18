<?php

Route::group(['prefix' => 'admin', 'middleware' => ['web','admin'], 'as' => 'admin.'],function(){
    Route::group(['prefix' => 'slide'], function () {
    Route::get('/','SlideController@index');
    Route::post('create', 'SlideController@create');
    Route::get('teste', 'SlideController@teste');
    Route::get('list', 'SlideController@list');
    Route::get('view/{id}', 'SlideController@view');
    Route::post('update/{id}', 'SlideController@update');
    Route::get('delete/{id}', 'SlideController@delete');			
  });
});
