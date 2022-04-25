<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;
use App\Models\Subject;
use App\Models\User;

class UserController extends Controller
{

    public function index(){
        $users = User::with(['subjects'])->get();
        return $users;
    }

    /**
     * find by id
     */

    public function findById(int $id): User{
        $user = User::where('id', $id)
            ->with(['subjects'])
            ->first();

        return $user;
    }

    public function checkId(int $id){
        $user = User::where('id', $id)->first();
        return $user != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    /**
     * find by searchterm
     */
    public function findBySearchTerm(string $searchTerm){
        $user = User::with(['subjects'])
            ->where('firstName', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('lastName', 'LIKE', '%' . $searchTerm . '%')


            ->orWhereHas('subjects', function($query) use ($searchTerm){
                $query -> where('title', 'LIKE', '%' . $searchTerm. '%')
                    ->orWhere('description', 'LIKE', '%' . $searchTerm. '%');
            })->get();

        return $user;
    }

    /**
     * create new User
     */

    public function save(Request $request):JsonResponse{
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try{
            $user = User::create($request->all());

            if(isset($request['subjects']) && is_array($request['subjects'])){
                foreach ($request['subjects'] as $subj){
                    $subject = Subject::firstOrNew(['title'=>$subj['title']]);
                    $user->subjects()->save($subject);
                }
            }

            DB::commit();
            return response()->json($user, 201);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("saving users failed: ". $e->getMessage(), 420);
        }
    }

    /**
     * modify /convert values if needed
     */
    private function parseRequest(Request $request):Request{
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

    public function update(Request $request, id $id):JsonResponse{
        DB::beginTransaction();

        try{
            $user = User::with(['subjects'])
                ->where('id', $id)->first();

            if($user != null){
                $request = $this->parseRequest($request);
                $user->update($request->all());

                //delete old subjects

                $user->subjects()->delete();

                //save subjects
                if(isset($request['subjects']) && is_array($request['subjects'])){
                    foreach ($request['subjects'] as $subj){
                        $subject = Subject::firstOrNew(['title'=>$subj['title']]);
                        $user->subjects()->save($subject);
                    }
                }

                $user->save();
            }

            DB::commit();
            $user1 = User::with(['subjects'])
                ->where('id', $id)->first();
            return response()->json($user1, 201);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("updating users failed: ". $e->getMessage(), 420);
        }
    }

    /**
     * returns 200 if users deleted successfully, throws exception if not
     */

    public function delete(int $id):JsonResponse{
        $user = User::where('id', $id)->first();
        if($user != null){
            $user->delete();
        }
        else
            throw new \Exception("users couldn't be deleted - it does not exist");
        return response()->json('users ('. $id. ') successfully deleted', 200);
    }

}
