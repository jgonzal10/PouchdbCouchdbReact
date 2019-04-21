import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DB from '../db';


export default class FemmeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: new DB('femmes'),
            femmes: []
        };
    }
    async deleteFemme(id) {
        await this.state.db.deleteFemme(id)
        const femmes = await this.state.db.getAllFemmes();
        await this.setState({ femmes })
    }


    async componentWillMount() {

        const femmes = await this.state.db.getAllFemmes();
        await this.setState({ femmes })

    }

    render() {
        return (
            <div>
                <h3>Femmes List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Job</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.femmes.map((currentFemme, i) => {

                                return (
                                    <tr key={i}>
                                        <td>{currentFemme.doc.name}</td>
                                        <td>{currentFemme.doc.job}</td>
                                        <td>
                                            <Link to={"/edit/" + currentFemme.doc._id}>Edit</Link>
                                        </td>
                                        <td>
                                            <button className="link" onClick={this.deleteFemme.bind(this, currentFemme.doc._id)}>Delete</button>
                                        </td>
                                    </tr>
                                );
                            }, this)
                        }
                    </tbody>
                </table>
            </div>
        )
    }

}