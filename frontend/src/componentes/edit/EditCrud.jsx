import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const headerProps = {
    icon: 'edit', tittle: 'Editar usuários',
    subtitle: 'Local onde é realizado a edição dos dados cadastrais do cliente.'
}

const baseUrl = 'http://localhost:3001/users'
let date = new Date();
const initialState = {
    user: { name: '', email: '', cpf: '', Vinculo:'', telefone:'', date:((date.getDate() )) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear() },
    list: []
}

export default class UserCrud extends Component {

    state = { ...initialState }

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                const list = this.getUpdatedList(resp.data)
                this.setState({ user: initialState.user, list })
            })
    }

    getUpdatedList(user, add = true) {
        const list = this.state.list.filter(u => u.id !== user.id)
        if(add) list.unshift(user)
        return list
    }

    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }
  
    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>CPF</label>
                            <input type="text" className="form-control cpf-mask"
                                name="cpf"
                                value={this.state.user.cpf}
                                onChange={e => this.updateField(e)}
                                placeholder="XXX.XXX.XXX-XX"/>
                        </div>
                    </div> 

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Vinculo com a empresa</label>
                            <select type="text" className="form-control"
                                name="Vinculo"
                                value={this.state.user.Vinculo}
                                onChange={e => this.updateField(e)}
                                placeholder="Qual o vinculo com a empresa..." >
                                <option value="Nenhum">Não informado</option>
                                <option value="Anual">Anual</option>
                                <option value="Semestral">Semestral</option>
                                <option value="Mensal">Mensal</option>
                                <option value="Semanal">Semanal</option>
                            </select>
                        </div>
                    </div> 

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Tefelefone de Contato</label>
                            <input type="text" className="form-control"
                                name="telefone"
                                value={this.state.user.telefone}
                                onChange={e => this.updateField(e)}
                                placeholder="Telefone de contato..." />
                        </div>
                    </div> 
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Data Cadastro</label>
                            <input type="text" className="form-control"
                                name="date"
                                value={this.state.user.date}
                                disabled     ={e => this.updateField(e)}
                                placeholder="XX/XX/XXXX" />
                        </div>
                    </div> 
                </div>

                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-success"
                            onClick={e => this.save(e)}>
                            Salvar dados editados
                        </button>

                        <button className="btn btn-danger ml-2"
                            onClick={e => this.clear(e)}>
                            Limpar Informações
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Vinculo</th>
                        <th>Telefone</th>
                        <th>Data</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.cpf}</td>
                    <td>{user.Vinculo}</td>
                    <td>{user.telefone}</td>
                    <td>{user.date}</td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(user)
                                     
                            }>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }
    
    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}