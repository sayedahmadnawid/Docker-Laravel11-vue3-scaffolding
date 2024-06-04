<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTraderRequest;
use App\Http\Requests\UpdateTraderRequest;
use App\Http\Resources\TraderResource;
use App\Models\Trader;

class TraderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TraderResource::collection(Trader::orderBy('created_at', 'ASC')->paginate(20));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTraderRequest $request)
    {
        $trader = Trader::create($request->validated());
        return new TraderResource($trader);
    }

    /**
     * Display the specified resource.
     */
    public function show(Trader $trader)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Trader $trader)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTraderRequest $request, Trader $trader)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trader $trader)
    {
        //
    }
}
