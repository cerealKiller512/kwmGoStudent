<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<ul>
    @foreach ($subjects as $subject)
        <li><a href="subjects/{{$subject->id}}">
                {{$subject->title}}</a></li>
    @endforeach
</ul>
</body>
</html>
