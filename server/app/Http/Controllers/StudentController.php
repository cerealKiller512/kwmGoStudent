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

    public function __construct(){
        $this->middleware('auth:student');

    }
    public function index(){
        $students = Student::with(['appointments'])
            ->get();

        return $students;
    }


    public function findById(int $id): Student{
        $student = Student::where('id', $id)
            ->with(['appointments'])
            ->first();

        return $student;
    }

    public function checkId(int $id){
        $student = Student::where('id', $id)->first();
        return $student != null ? response()->json(true, 200) : response()->json(false, 200);
    }

    public function findBySearchTerm(string $searchTerm){
        $student = Student::all()
            ->where('firstName', 'LIKE', '%' . $searchTerm. '%')
            ->orWhere('lastName', 'LIKE', '%' . $searchTerm . '%')
            ->orWhere('information', 'LIKE', '%' . $searchTerm. '%')->get();

        return $student;
    }


    public function save(Request $request):JsonResponse{
        $request = $this->parseRequest($request);

        DB::beginTransaction();

        try{
            $student = Student::create($request->all());


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
            $student = Student::all()
                ->where('id', $id)->first();
            if($student != null){
                $request = $this->parseRequest($request);
                $student->update($request->all());
                }

                $student->save();


                DB::commit();

                $student1 = Student::all()
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
