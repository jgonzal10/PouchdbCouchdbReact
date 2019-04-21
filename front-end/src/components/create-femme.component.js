import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import DB from '../db';


export default class CreateFemme extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: new DB('femmes'),
            femmes: {},
            name:'',
            job:'',
            redirect:false
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


    async createFemmePouch(femme) { 

        await this.state.db.CreateFemme(femme)
        await this.state.db.getAllFemmes();
    }

    onSubmit(e) {
        e.preventDefault();
        const newFemme = {
            name: this.state.name,
            job: this.state.job
        }

        this.createFemmePouch(newFemme)
        this.setState({redirect:true})

    }
    render() {
        return (
            <div style={{ marginTop: 10 }}>
                <h3>Create New Femme</h3>
                <form onSubmit={this.onSubmit}>
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
                        <input type="submit" value="Create Femme" className="btn btn-primary" />
                    </div>
                </form>
                {this.state.redirect && <Redirect to='/' />}
            </div>
        )
    }
}