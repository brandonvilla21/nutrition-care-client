import React, { Component } from 'react';
import PageBase from '../../../components/PageBase';
import { List, ListItem, Divider } from 'material-ui';
import axios from 'axios';
import urlConfig from '../../../url-config';
import Moment from 'react-moment';

class MyRoutinesPage extends Component {
    
    constructor() {
        super();
        this.state = {
            routines: []
        };

        this.fetchRoutines = this.fetchRoutines.bind(this);
    }
    
    componentWillMount() {
        this.fetchRoutines();
    }

    fetchRoutines() {
        const url = `${urlConfig.baseUrl}/routines/user/${localStorage.getItem('user_id')}`;
        
        axios.get(url)
            .then( res => this.setState({routines: res.data.data}))
            .catch( err => err);
    }

    render() {
        const { routines } = this.state;
        const routinesRen = routines.map( routine => {
            return (
                <div key={routine.id}>
                    <ListItem
                        href={`routine/${routine.id}`}
                        primaryText={routine.description}
                        secondaryText={<Moment format="DD/MM/YYYY">{routine.created_at.date}</Moment>}/>
                    <Divider key={`div-${routine.id}`} />
                </div>);
         });

        return (
            <PageBase
                title="Rutinas de ejercicio"
                navigation="Aplicación / Mis rutinas">
                <div>
                    <List>
                        {routinesRen}
                    </List>
                </div>
            </PageBase>
        );
    }
}

export default MyRoutinesPage;