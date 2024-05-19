<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('constructions', function (Blueprint $table) {
            $table->id();
            $table->string('code');
            $table->string('work_type')->nullable();
            $table->string('classification')->nullable();
            $table->string('temporary_name');
            $table->string('confirmed_name')->nullable();
            $table->string('short_name')->nullable();
            $table->unsignedBigInteger('our_company_incharge_person');
            $table->decimal('contract_amount', 15, 2)->nullable();
            $table->string('contract_number')->nullable();
            $table->date('contract_date')->nullable();
            $table->date('delivery_date')->nullable();
            $table->date('completion_date')->nullable();
            $table->string('contact_number')->nullable();
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('acquisitioned_by');
            $table->string('site_phone_number')->nullable();
            $table->string('site_classification');
            $table->boolean('completed')->default(false);
            $table->tinyInteger('step')->default(0); //showing the construction stage.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('constructions');
    }
};
