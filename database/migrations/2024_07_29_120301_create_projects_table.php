<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->char('code', 12)->nullable();
            $table->char('temporary_name', 30)->nullable();
            $table->char('confirmed_name', 30)->nullable();
            $table->char('short_name', 30)->nullable();
            $table->char('type', 20)->nullable();
            $table->char('nature', 20)->nullable();
            $table->date('start_date')->nullable();
            $table->date('complete_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
