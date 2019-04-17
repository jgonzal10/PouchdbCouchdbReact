import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import DB from '../db';
const Femme = props => (
    <>

    <tr>
        <td>{props.femme.doc.name}</td>
        <td>{props.femme.doc.job}</td>
        <td>
            <Link to={"/edit/" + props.femme._id}>Edit</Link>
        </td>
    </tr>
    </>
)
export default class FemmeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            db: new DB('femmes'),
            femmes: []
        };
    }


    FemmeList() {
       
        return (this.state.femmes.map(function (currentFemme, i) {
          
             return <Femme femme={currentFemme} key={i} />;
        }))
    }
    async componentWillMount() {
       
        const femmes = await this.state.db.getAllFemmes();
        await this.setState({ femmes })
      //  console.log(this.state.femmes)

    }
    async componentDidMount() {
        // const femmes =  await this.state.db.getAllFemmes();
        // this.setState({femmes})
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
                        {this.FemmeList()}
                    </tbody>
                </table>
            </div>
        )
    }
}