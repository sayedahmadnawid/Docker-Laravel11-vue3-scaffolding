<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('traders', function (Blueprint $table) {
            $table->id();
            $table->char('name_kana', 30)->nullable();
            $table->char('name', 30)->nullable();
            $table->char('fax', 15)->nullable();
            $table->char('phone', 15)->nullable();
            $table->char('postalcode', 8)->nullable();
            $table->char('prefecture', 30)->nullable();
            $table->char('city', 30)->nullable();
            $table->char('area', 30)->nullable();
            $table->char('street', 50)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('traders');
    }
};
