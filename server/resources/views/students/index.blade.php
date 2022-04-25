<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<ul>
    @foreach ($students as $student)
        <li><a href="students/{{$student->id}}">
                {{$student->firstName}}
            {{$student->lastName}}</a></li>
    @endforeach
</ul>
</body>
</html>
