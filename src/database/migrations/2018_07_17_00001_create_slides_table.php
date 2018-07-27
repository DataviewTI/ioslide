<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSlidesTable extends Migration
{
    public function up()
    {
			Schema::create('slides', function(Blueprint $table)
			{
				$table->increments('id');
				$table->string('name');
				$table->dateTime('date_start');
        $table->dateTime('date_end')->nullable();
        $table->smallInteger('interval')->unsigned()->nullable();
        $table->boolean('controls')->default(true);
        $table->boolean('indicators')->default(false);
        $table->boolean('pause')->default(false);
        $table->boolean('wrap')->default(true);
        $table->smallInteger('width')->unsigned()->nullable();
        $table->smallInteger('height')->unsigned()->nullable();
        $table->integer('group_id')->unsigned()->nullable();
        $table->timestamps();
				$table->softDeletes();
        $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade')->onUpdate('cascade');
			});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('slides');
    }
}
