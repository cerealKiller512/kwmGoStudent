<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;
use App\Models\Subject;

class CategoryController extends Controller
{

    public function index(){
        $categories = Category::with(['subjects'])->get();
        return $categories;
    }

    public function findById(int $id): Category{
        $category = Category::where('id', $id)->first();

        return $category;
    }


    public function checkId(int $id){
        $category = Category::where('id', $id)->first();
        return $category != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    public function findBySearchTerm(string $searchTerm){
        $category = Category::with(['subjects'])
            ->where('name', 'LIKE', '%' . $searchTerm. '%')

            ->orWhereHas('subjects', function($query) use ($searchTerm){
                $query->where('title', 'LIKE', '%' . $searchTerm. '%')
                    ->orWhere('description', 'LIKe', '%' . $searchTerm. '%');
            })->get();

        return $category;
    }

    public function save(Request $request):JsonResponse{
        $request = $this->parseRequest($request);

        DB::beginTransaction();

        try{
            $category = Category::create($request->all());

            if(isset($request['subjects']) && is_array($request['subjects'])){
                foreach ($request['subjects'] as $subj){
                    $subject = Subject::firstOrNew(['title'=>$subj['title']]);
                    $category->subjects()->save($subject);
                }
            }

            DB::commit();
            return response()->json($category, 201);

        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("saving category failed : ".$e->getMessage(), 420);
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
           $category = Category::with(['subjects'])
               ->where('id', $id)->first();

           if($category != null){
               $request = $this->parseRequest($request);
               $category->update($request->all());

               $category->subjects()->delete();

               if(isset($request['subjects']) && is_array($request['subjects'])){
                   foreach ($request['subjects'] as $subj){
                       $subject = Subject::firstOrNew(['title'=>$subj['title']]);
                       $category->subjects()->save($subject);
                   }
               }

               $category->save();
           }
           DB::commit();

           $category1 = Category::with(['subjects'])
               ->where('id', $id)->first();
           return response()->json($category1, 201);
        }

        catch (\Exception $e){
            DB::rollBack();
            return response()->json("updating category failed: ". $e->getMessage(), 420);

        }
    }

    public function delete(int $id):JsonResponse{
        $category = Category::where('id', $id)->first();
        if($category != null){
            $category->delete();
        }
        else
            throw new \Exception("category couldn't be deleted - it does not exist");
        return response()->json('category ('. $id. ') successfully deleted', 200);
    }
}
