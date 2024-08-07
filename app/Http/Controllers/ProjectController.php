<?php

namespace App\Http\Controllers;

use App\Http\Requests\Project\StoreProjectRequest;
use App\Http\Requests\Project\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /* $limit = $request->get('limit', 10);
        $search = $request->get('search', '');
        $column_filters = json_decode($request->get('column_filters', '[]'), true);

        $query = Project::query();

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query->where('temporary_name', 'LIKE', "%{$search}%")
                    ->orWhere('short_name', 'LIKE', "%{$search}%");
            });
        }


        // Handle column filters
        foreach ($column_filters as $filter) {
            if (isset($filter['column'], $filter['value'])) {
                $query->where($filter['column'], 'LIKE', "%{$filter['value']}%");
            }
        }

        $projects = $query->orderBy('created_at', 'ASC')->paginate($limit);

        return ProjectResource::collection($projects); */

        return ProjectResource::collection(Project::orderBy('created_at', 'ASC')->paginate(10));
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
    public function store(StoreProjectRequest $request)
    {
        $project = Project::create($request->validated());

        return new ProjectResource($project);
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project, Request $request)
    {
        return new ProjectResource($project);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $project->update($data);

        return new ProjectResource($project);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project, Request $request)
    {
        $project->delete();

        return response('', 204);
    }
}
