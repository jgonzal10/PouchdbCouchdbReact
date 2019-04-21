import React, { Component } from 'react';
import DB from '../db';
import { Redirect } from 'react-router-dom'
export default class EditFemme extends Component {
    constructor(props) {
        super(props)
        this.state = {
            db: new DB('femmes'),
            id: '',
            name: '',
            job: '',
            redirect: false
        }

        this.onChangeFemmeName = this.onChangeFemmeName.bind(this)
        this.onChangeFemmeJob = this.onChangeFemmeJob.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeFemmeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangeFemmeJob(e) {
        this.setState({
            job: e.target.value
        });
    }

    async editFemmePouch(femme) {
        await this.state.db.EditFemme(femme)
        await this.state.db.getAllFemmes();
    }

    async onSubmit(e) {
        e.preventDefault();
        const newFemme = {
            id: this.state.id,
            name: this.state.name,
            job: this.state.job
        }

        await this.editFemmePouch(newFemme)
        this.setState({ redirect: true })
    }

    async componentDidMount() {
        var femme = await this.state.db.getFemmeById(this.props.match.params.id)
        if (femme) {
            this.setState({
                id: femme._id,
                name: femme.name,
                job: femme.job
            })
        } else {
            console.log('else ', femme)
        }
    }


    render() {
        return (
            <div>
                <div style={{ marginTop: 10 }}>
                    <h3>Edit Femme</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">

                            <input readOnly type="text"
                                className="form-control"
                                value={this.state.id} hidden={true}

                            />
                        </div>
                        <div className="form-group">
                            <label>Name: </label>
                            <input type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={this.onChangeFemmeName}
                            />
                        </div>
                        <div className="form-group">
                            <label>Job: </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.job}
                                onChange={this.onChangeFemmeJob}
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Edit" className="btn btn-primary" />
                        </div>
                    </form>
                    {this.state.redirect && <Redirect to='/' />}
                </div>
            </div>
        )
    }
}