<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Models\Subject;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

class StudentController extends Controller
{
    public function index(){
        $students = Student::with(['subjects'])
            ->get();

        return $students;
    }


    public function findById(int $id): Student{
        $student = Student::where('id', $id)
            ->with(['subjects'])
            ->first();

        return $student;
    }

    public function checkId(int $id){
        $student = Student::where('id', $id)->first();
        return $student != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    public function findBySearchTerm(string $searchTerm){
        $student = Student::with(['subjects'])
            ->where('firstName', 'LIKE', '%' . $searchTerm. '%')
            ->orWhere('lastName', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('information', 'LIKE', '%' . $searchTerm. '%')

            ->orWhereHas('subjects', function($query) use ($searchTerm){
                $query->where('title', 'LIKE', '%' . $searchTerm. '%')
                    ->orWhere('description', 'LIKE', '%' . $searchTerm . '%');
            })->get();

        return $student;
    }


    public function save(Request $request):JsonResponse{
        $request = $this->parseRequest($request);

        DB::beginTransaction();

        try{
            $student = Student::create($request->all());

            if(isset($request['subjects']) && is_array($request['subjects'])){
                foreach ($request['subjects'] as $subj){
                    $subject = Subject::firstOrNew(['title'=>$subj['title']]);
                    $student->subjets()->save($subject);
                }
            }

           DB::commit();
            return response()->json($student, 201);
        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("saving student failed: ". $e->getMessage(), 420);
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
            $student = Student::with(['subjects'])
                ->where('id', $id)->first();
            if($student != null){
                $request = $this->parseRequest($request);
                $student->update($request->all());


                //delete old subjects

                $student->subjects()->delete();

                //save new subjects
                if(isset($request['subjects']) && is_array($request['subjects'])){
                    foreach ($request['subjects'] as $subj){
                        $subject = Subject::firstOrNew(['title'=>$subj['title']]);
                        $student->subjects()->save($subject);
                    }
                }

                $student->save();

            }
                DB::commit();

                $student1 = Student::with(['subjects'])
                    ->where('id', $id)->first();
                return response()->json($student1, 201);

        }
        catch (\Exception $e){
            DB::rollBack();
            return response()->json("updating student failed: ". $e->getMessage(), 420);
        }
    }

        public function delete(int $id):JsonResponse{
            $student = Student::where('id', $id)->first();
            if($student != null){
                $student->delete();
            }
            else
                throw new \Exception("student couldn't be deleted - it does not exist");
            return response()->json('student (' .$id. ') successfully deleted', 200);


    }
}
