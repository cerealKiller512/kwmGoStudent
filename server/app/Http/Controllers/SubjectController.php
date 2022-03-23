<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BeginTransaction;

class SubjectController extends Controller
{
    public function index(){
        /* load all books and relations with eager loading,
        which means "load all related objects"*/

        $subjects = Subject::with(['images', 'user'])->get();
        return $subjects;
    }

    public function show(Subject $subject){
        return view('subjects.show', compact('subject'));

    }

    /**
     * find subject by given id
     */

    public function findById(int $id):Subject{
        $subject = Subject::where('id', $id)
                ->with(['images', 'user'])
                ->first();

                return $subject;
    }

    public function checkId(int $id){
        $subject = Subject::where('id', $id)->first();
        return $subject !=null ? response()->json(true,200) : response()->json(false, 200);

    }


    /**
     * find subject by search term
     */

    public function findBySearchTerm(string $searchTerm){
        $subject = Subject::with(['images', 'user'])
            ->where('title', 'LIKE', '%' . $searchTerm. '%')
            ->orWhere('description', 'LIKE', '%' . $searchTerm . '%')

            ->orWhereHas('user', function($query) use ($searchTerm){
                $query->where('firstName', 'LIKE', '%' . $searchTerm. '%')
                    ->orWhere('lastName', 'LIKE', '%' .$searchTerm. '%');
            })->get();

        return $subject;
    }

    /**
     * create new Subject
     */
    public function save(Request $request) : JsonResponse{
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try{
            $subject = Subject::create($request->all());

            if(isset($request['images']) && is_array($request['images'])){
                foreach ($request['images'] as $img){
                    $image = Image::firstOrNew(['url'=>$img['url'],'title'=>$img['title']]);
                    $subject->images()->save($image);
                }
            }

            //save users ??????

            DB::commit();
            return response()->json($subject, 201);
        }

        catch (\Exception $e){
            DB::rollBack();
            return response()->json("saving subject failed: ".$e->getMessage(), 420);
        }
    }

    /**
     * modify convert values if needed
     */

    private function parseRequest(Request $request):Request{
        //get date and convert it
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

    public function update(Request $request, int $id):JsonResponse{
        DB::beginTransaction();

        try{
            $subject = Subject::with(['images', 'user'])
                ->where('id', $id)->first();
            if($subject != null){
                $request = $this->parseRequest($request);
                $subject->update($request->all());

                //delete all old images
                $subject->images()->delete();
                //save images
                if(isset($request['images']) && is_array($request['images'])){
                    foreach ($request['images'] as $img){
                        $image = Image::firstOrNew(['url'=>$img['url'], 'title'=>$img['title']]);
                        $subject->images()->save($image);
                    }
                }
                $subject->save();
            }

            DB::commit();
            $subject1 = Subject::with(['images', 'user'])
                ->where('id', $id)->first();
            return response()->json($subject1, 201);
        }
        catch (\Exception $e){
            //rollback all queries
            DB::rollBack();
            return response()->json("updating subject failed: ".$e->getMessage(), 420);
        }
    }

    /**
     * returns 200 if subject deleted successfully, throws exception if not
     */

    public function delete(int $id):JsonResponse{
        $subject = Subject::where('id', $id)->first();
        if($subject != null){
            $subject->delete();
        }

        else
            throw new \Exception("subject couldn't be deleted - it does not exist");
            return response()->json('subject ('.$id.') successfully deleted', 200);

    }
}
