import { IoMdContact } from "react-icons/io"
import { HiLocationMarker } from "react-icons/hi"
import { MdPhoneEnabled } from "react-icons/md"
import { FiMail } from "react-icons/fi"
import { AiTwotoneDelete, AiFillEdit } from "react-icons/ai"

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"

export const CardContactF = ({ infoUser, openModal, setSelectedDelete }) => {
    const info = infoUser
    const nav = useNavigate()


    const Delete = () => {
        openModal()
        setSelectedDelete(info)
    }

    const Editar = () => {
        nav(`/addContact/${info.id}`)
    }
    return (
        <div className="row border border-dark py-2 px-5">
            <div className="col-2 d-flex flex-column align-content-center justify-content-center">
                <IoMdContact fontSize={"150px"} />

            </div>
            <div className="col-8 d-flex flex-column justify-content-around ">
                <p className="opacity-75 mx-2" style={{ fontSize: '20px' }}>{infoUser.full_name}</p>
                <p className="opacity-75" style={{ fontSize: '15px' }}><spam className="mx-2 ">{<HiLocationMarker />}</spam> {infoUser.address}</p>
                <p className="opacity-75" style={{ fontSize: '15px' }}><spam className="mx-2 ">{<MdPhoneEnabled />}</spam>{infoUser.phone}</p>
                <p className="opacity-75" style={{ fontSize: '15px' }}><spam className="mx-2 ">{<FiMail />}</spam>{infoUser.email}</p>
            </div>
            <div className="col-2">
                <button onClick={Editar} className="bg-transparent border-0">{<AiFillEdit fontSize={"25px"} />}</button>
                <button onClick={Delete} className="bg-transparent border-0 mx-2" >{<AiTwotoneDelete fontSize={"25px"} />}</button>

            </div>
        </div>
    )
}

