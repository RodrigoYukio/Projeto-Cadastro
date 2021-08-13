import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

// eslint-disable-next-line import/no-anonymous-default-export
export default props =>
    <aside className="menu-area">
    <nav className="menu">
        <Link to="/">
            <i className = "fa fa-home"></i>Inicio
        </Link>
        <Link to = "/users">
            <i className = "fa fa-users"></i>Cadastro Usuários
        </Link>
        <Link to = "/table">
            <i className = "fa fa-table"></i>Tabela de Usuários
        </Link>
        <Link to = "/edit">
            <i className = "fa fa-edit"></i>Editar dados 
        </Link>
        <Link to = "/delete">
            <i className = "fa fa-trash"></i>Deletar dados 
        </Link>
    </nav>
    </aside>
