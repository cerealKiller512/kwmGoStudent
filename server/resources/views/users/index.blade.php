<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<ul>
    @foreach ($users as $user)
        <li><a href="users/{{$user->id}}">
                {{$user->firstName}}
            {{$user->lastName}}</a></li>
    @endforeach
</ul>
</body>
</html>
