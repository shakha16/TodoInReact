import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHttp } from '../hooks/useHttp';
import { RotatingLines } from 'react-loader-spinner';
import Users from '../components/Users';
import { useForm } from 'react-hook-form';

const vis = "text-[10px] text-red-500 invisible"
const invis = "text-[10px] text-red-500"

export default function Home() {
    const [arr, setArr] = useState([])

    const [u, setU] = useState(true)

    const { request, loading, error } = useHttp()
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = (data) => {
        request("http://localhost:9999/users", "post", data)
        setU(!u)
    } 

    useEffect(() => {
        request("http://localhost:9999/users", "get")
            .then(res => setArr(res))
    }, [u])

    return (
        <div className='p-20'>
            <h1>ДОБАВЛЕНИЕ, ИЗМЕНЕНИЕИ УДАЛЕНИЕ ЭЛЕМЕНТА ИЗ ТАБЛИЦЫ</h1><br /><br /><br />

            <form onSubmit={handleSubmit(onSubmit)}
             action="">
                <div className='flex items-center gap-10'>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Имя</label>
                        <input {...register('name', {required: true, pattern: /^[a-z ,.'-]+$/i})}  type="text" id='name' name='name' className='pl-3 w-25 h-8 border rounded border-gray-500' />
                        <span className={errors.name ? invis : vis}>Введи имя правильно!!!</span>
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="name">Возраст</label>
                        <input {...register("age", {required: true, pattern: /^\S[0-9]{0,3}$/})}  type="number" id='age' name='age' className='pl-3 w-25 h-8 border rounded border-gray-500' />
                        <span className={errors.name ? invis : vis}>Введи возраст правильно!!!</span>
                    </div>
                    <button className='w-20 h-8 bg-blue-600 rounded text-white'>Создать</button>
                </div>
            </form>
            <table className='w-[800px] pt-5'>
                <thead>
                    <tr className='w-full bg-white'>
                        <th className='text-gray-500 text-start'>№ㅤ</th>
                        <th className='text-gray-500 text-start'>Имя студента</th>
                        <th className='text-gray-500 text-start'>Год рождения</th>
                        <th className='text-gray-500 text-start'>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {loading === false && (
                        arr.map((item, idx) => (
                            <Users key={item.id} setU={setU} u={u} {...item} idx={idx + 1} />
                        ))
                    )}
                </tbody>
            </table>
            {loading &&
                (<center>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                    />
                </center>)}
            {error && (<center><h1>Error</h1></center>)}
        </div>
    )
}