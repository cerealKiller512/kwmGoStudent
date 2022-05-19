<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\Subject;
use App\Models\User;
use App\Models\Student;
use http\Exception\BadQueryStringException;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\BeginTransaction;
use function PHPUnit\Framework\isTrue;

class AppointmentController extends Controller
{
    public function index(){
        $appointments = Appointment::with(['subject', 'student'])->get();

        $returnObj = [];

        foreach ($appointments as $appointment) {
            $appointment['user'] = User::find($appointment["subject"]["user_id"]);
            $returnObj[] = $appointment;
        }

        return $returnObj;
    }

    public function show(Appointment $appointment){
        return view('appointment.show', compact('appointment'));

    }

    public function showBooked(){
        $appointments = Appointment::where('booked', true)
            ->with(['subject', 'student'])
            ->get();

        $returnObj = [];

        foreach ($appointments as $appointment) {
            $appointment['user'] = User::find($appointment["subject"]["user_id"]);
            $returnObj[] = $appointment;
        }

        return $returnObj;
    }

    public function getAppointmentsByStudentId(int $student_id){
        $appointments = Appointment::where('student_id', $student_id)
            ->with(['subject'])
            ->get();


        $returnObj = [];

        foreach ($appointments as $appointment) {
            $appointment['user'] = User::find($appointment["subject"]["user_id"]);
            $returnObj[] = $appointment;
        }

        return $returnObj;

        //return $appointments;
    }

    /*public function getAppointmentsByUserId(int $user_id){
        $appointments = Appointment::where('user_id', $user_id)
            ->with(['subject'])
            ->get();


        return $appointments;
    }*/

    /**
     * find appointment by given id
     */

    public function findById(int $id):Appointment{
        $appointment = Appointment::where('id', $id)
            ->with(['subject'])
            ->first();

        return $appointment;
    }

    public function findBookedById(int $id):Appointment{
        $appointment = Appointment::where('id', $id)
            ->with(['subject'])
            ->first();
        return $appointment;
    }



    public function checkId(int $id){
        $appointment = Appointment::where('id', $id)->first();
        return $appointment !=null ? response()->json(true,200) : response()->json(false, 200);

    }





    /**
     * create new Appointment
     */
    public function save(Request $request) : JsonResponse{
        $request = $this->parseRequest($request);

        DB::beginTransaction();
        try{
            $appointment = Appointment::create($request->all());


            DB::commit();
            return response()->json($appointment, 201);
        }

        catch (\Exception $e){
            DB::rollBack();
            return response()->json("saving appointment failed: ".$e->getMessage(), 420);
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

    public function setAppointmentsForUser(Request $request){
      $appointments = $request['appointments'];
      $student_id = $request['student_id'];
      $result = [];

      foreach ($appointments as $appId){
          $appointment = Appointment::find($appId);

          if ($appointment) {
              $appointment->booked = true;
              $appointment->student_id = $student_id;
              $appointment->save();
              $result[] = $appointment;
          }
      }

      return $result;
        /*student_id: 1, /--> this.authService.currentUser
        *  appointments: [ 1, 2, 3, ...] / ids of checked appointments
        * }
* foreach appointments as app -> update Appointment::find(app->id)
*  set booked = true, set studentId = request["student_id"]*/
    }

    public function update(Request $request, int $id):JsonResponse{
        DB::beginTransaction();

        try{
            $appointment = Appointment::with(['subject'])
                ->where('id', $id)->first();
            if($appointment!= null){
                $request = $this->parseRequest($request);
                $appointment->update($request->all());

                $appointment->save();
            }

            DB::commit();
            $appointment1 = Subject::with(['subject'])
                ->where('id', $id)->first();
            return response()->json($appointment1, 201);
        }
        catch (\Exception $e){
            //rollback all queries
            DB::rollBack();
            return response()->json("updating appointment failed: ".$e->getMessage(), 420);
        }
    }

    /**
     * returns 200 if appointment deleted successfully, throws exception if not
     */

    public function delete(int $id):JsonResponse{
        $appointment = Appointment::where('id', $id)->first();
        if($appointment != null){
            $appointment->delete();
        }

        else
            throw new \Exception("appointment couldn't be deleted - it does not exist");
        return response()->json('appointment ('.$id.') successfully deleted', 200);

    }
}
