<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<ul>
    @foreach ($appointments as $appointment)
        <li><a href="appointments/{{$appointment->id}}">
                {{$appointment->date}}
                {{$appointment->from}}
            {{$appointment->to}}</a></li>
@endforeach
