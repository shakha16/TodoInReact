import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useHttp } from '../hooks/useHttp';

export default function User() {
    let { id } = useParams()
    const [arr, setArr] = useState([])

    const { request, loading, error } = useHttp()

    useEffect(() => {
        request("http://localhost:9999/users/" + id, "get")
            .then(res => setArr(res))
    }, [])

    return (
        <>
            <Link to="/">❮</Link>
            <center className='pt-[200px]'>
                <h1>Name:{arr.name}</h1>
                <h1>Age:{arr.age}</h1>
                <h2>ID:{arr.id}</h2>
            </center>
        </>
    )
}