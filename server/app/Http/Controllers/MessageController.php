<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

class MessageController extends Controller
{
    public function index(){
        $messages = Message::with(['subject'])
            ->get();

        return $messages;
    }


    public function findById(int $id): Message{
        $message = Message::where('id', $id)
            ->with(['subject'])
            ->first();

        return $message;
    }

    public function checkId(int $id){
        $message = Message::where('id', $id)->first();
        return $message != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    public function findBySearchTerm(string $searchTerm){
        $message = Message::with(['subject'])
            ->where('text', 'LIKE', '%' . $searchTerm. '%')

            ->orWhereHas('subject', function($query) use ($searchTerm){
                $query->where('title', 'LIKE', '%' . $searchTerm. '%')
                    ->orWhere('description', 'LIKE', '%' . $searchTerm . '%');
            })->get();

        return $message;
    }


    public function save(Request $request):JsonResponse{
        $request = $this->parseRequest($request);

        DB::beginTransaction();

        try{
            $message = Message::create($request->all());


            DB::commit();
            return response()->json($message, 201);
        }

        catch (\Exception $e){
            DB::rollBack();
            return response()->json("saving message failed: ".$e->getMessage(), 420);
        }
    }

    private function parseRequest(Request $request):Request{
        $date = new \DateTime($request->published);
        $request['published'] = $date;
        return $request;
    }

    public function update(Request $request, int $id): JsonResponse{
        DB::beginTransaction();

        try{
            $message = Message::with(['subject'])
                ->where('id', $id)->first();
            if($message != null){
                $request = $this->parseRequest($request);
                $message->update($request->all());



                $message->save();

            }
            DB::commit();

            $message1 = Message::with(['subject'])
                ->where('id', $id)->first();
            return response()->json($message1, 201);

        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("updating message failed: ". $e->getMessage(), 420);
        }
    }

    public function delete(int $id):JsonResponse{
        $message = Message::where('id', $id)->first();
        if($message != null){
            $message->delete();
        }
        else
            throw new \Exception("message couldn't be deleted - it does not exist");
        return response()->json('message (' .$id. ') successfully deleted', 200);


    }
}
