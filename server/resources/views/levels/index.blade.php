<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<ul>
    @foreach ($levels as $level)
        <li><a href="levels/{{$level->id}}">
                {{$level->level}}</a></li>
@endforeach
