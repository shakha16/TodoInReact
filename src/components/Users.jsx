import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TbEdit } from 'react-icons/tb'
import { MdDeleteForever } from 'react-icons/md'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import { useHttp } from '../hooks/useHttp';
import { RotatingLines } from 'react-loader-spinner';
import { useForm } from 'react-hook-form';

const style = {
    position: 'absolute',
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px"
}


const vis = "text-[10px] text-red-500 invisible"
const invis = "text-[10px] text-red-500"

export default function Users({ setU,u , id, name, age, idx }) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    const { request, loading, error } = useHttp()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const year = new Date

    const onSubmit = (data) => {
        request("http://localhost:9999/users/" + id, "put", data)
        setOpen(false)
        setU(!u)
    } 


    return (
        <>
            <tr className='bg-white p-3'>
                <td>{idx}</td>
                <td>
                    <Link to={"/" + id}>
                        {name}
                    </Link>
                </td>
                <td>{year.getFullYear() - age}</td>
                <td className='flex items-center gap-4'>
                    <TbEdit size={25} onClick={handleOpen} />
                    <MdDeleteForever size={25} onClick={(e) => {request("http://localhost:9999/users/" + id, "delete"); setU(!u)} }/>
                </td>
            </tr>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box sx={style}>
                        <input {...register('name', {required: true, pattern: /^[a-z ,.'-]+$/i})} type="text" placeholder={name} className='pl-3 w-25 h-8 border rounded border-gray-500' />
                        <span className={errors.name ? invis : vis} >Введи имя правильно!!!</span>
                        <input {...register('age', {required: true, pattern: /^\S[0-9]{0,3}$/})} type="number" placeholder={age} className='pl-3 w-25 h-8 border rounded border-gray-500' />
                        <span className={errors.age ? invis : vis}>Введи возраст правильно!!!</span>
                        <button className='w-20 h-8 bg-blue-600 rounded text-white'>Save</button>
                    </Box>
                </form>
            </Modal >
            {loading &&
                (<center>
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="50"
                        visible={true}
                    />
                </center>)
            }
            {error && (<center><h1>Error</h1></center>)}
        </>
    )
}