<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSceneTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scene', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->timestamps();

            $table->string('name')->comment('景点名称');
            $table->string('location')->comment('景点位置');
            $table->float('score')->comment('景点评分');
            $table->string('time')->comment('开放游览时间');
            $table->string('detail')->comment('详细信息');
            $table->string('type')->comment('景点类型');
            $table->string('evaluation')->comment('景点评价');
            $table->string('telephone')->comment('景点联系方式');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('scene');
    }
}
