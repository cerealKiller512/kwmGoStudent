<!DOCTYPE html>
<html>
<head>
    <title></title>
</head>
<body>
<ul>
    @foreach ($categories as $category)
        <li><a href="categories/{{$category->id}}">
                {{$category->name}}</a></li>
@endforeach
