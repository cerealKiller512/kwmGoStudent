<?php

namespace App\Http\Controllers;

use App\Models\Level;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;
use App\Models\Subject;

class LevelController extends Controller
{
    public function index(){
        $levels = Level::with(['subjects'])->get();
        return $levels;
    }

    public function findById(int $id):Level{
        $level = Level::where('id', $id)
            ->with(['subjects'])
            ->first();

        return $level;
    }

    public function checkById(int $id){
        $level = Level::where('id', $id)->first();
        return $level != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    public function findBySearchTerm(string $searchTerm){
        $level = Level::with(['subjects'])
            ->where('level', 'LIKE', '%' . $searchTerm. '%')

            ->orWhereHas('subjects', function($query) use ($searchTerm){
                $query->where('title', 'LIKE', '%' . $searchTerm . '%')
                    ->orWhere('description', 'LIKE', '%' . $searchTerm . '%');
            })->get();

        return $level;
    }

    public function save(Request $request):JsonResponse{
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try{
            $level = Level::create($request->all());

            if(isset($request['subjects']) && is_array($request['subjects'])){
                foreach ($request['subjects'] as $subj){
                    $subject = Subject::firstOrNew(['title'=>$subj['title']]);
                    $level->subjects()->save($subject);
                }
            }

            DB::commit();
            return response()->json($level, 201);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("saving level failed: ". $e->getMessage(), 420);
        }
    }

    private function parseRequest(Request $request): Request{
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

    public function update(Request $request, int $id):JsonResponse{
        DB::beginTransaction();

        try{
            $level = Level::with(['subjects'])
                ->where('id', $id)->first();
            if($level != null){
                $request = $this->parseRequest($request);
                $level->update($request->all());

                $level->subjects()->delet();

                if(isset($request['subjects']) && is_array($request['subjects'])){
                    foreach ($request['subjects'] as $subj) {
                        $subject = Subject::firstOrNew(['title'=>$subj['title']]);
                        $level->subjects()->save($subject);
                    }
                }

                $level->save();
            }
            DB::commit();
            $level1 = Level::with(['subjects'])
                ->where('id', $id)->first();
            return response()->json($level1, 201);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("updating level failed: ".$e->getMessage(), 420);
        }
    }

    public function delete(int $id):JsonResponse{
        $level = Level::where('id', $id)->first();
        if($level != null){
            $level->delete();
        }
        else
            throw new \Exception("level couldn't be deleted - it does not exist");
        return response()->json('level (' . $id . ') successfully deleted', 200);
    }
}
