<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;
use App\Models\Subject;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use phpDocumentor\Reflection\Types\Boolean;
use Psy\Util\Json;
use Tymon\JWTAuth\JWTAuth;

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

    public function update (Request $request, int $id) : JsonResponse {
        $request = $this->parseRequest($request);

        try {
            $user = User::where('id', $id)->first();

            if ($user != null) {
                $user->update($request->all());
            }
            // return response()->json($user, 201);
            return response()->json([
                'access_token' => auth()->refresh(),
                'token_type' => 'bearer',
                'expires_in'=> \auth()->factory()->getTTL()*60
            ]);
        } catch (\Exception $e) {
            return response()->json("updating user failed: " . $e->getMessage(), 420);
        }
    }

    /**
     * returns 200 if user's deleted successfully, throws exception if not
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


    public function validatePassword(Request $request): JsonResponse {
        $id = $request["id"];
        $password = $request["password"];
        $user = User::find($id);

        if (Hash::check($password, $user->password)) {
            return response()->json($user);
        }
        return response()->json(null, 420);
    }
}
