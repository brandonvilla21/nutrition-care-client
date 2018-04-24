import React, { Component } from 'react';
import globalStyles from '../../../styles';
import Accessibility from 'material-ui/svg-icons/action/accessibility';
import ActionShoppingBasket from 'material-ui/svg-icons/action/shopping-basket';
import { pink600, green600 } from 'material-ui/styles/colors';
import InfoBox from '../../../components/dashboard/InfoBox';
import { RaisedButton } from 'material-ui';
import TrendingUp from 'material-ui/svg-icons/action/trending-up';
import {Link} from 'react-router';

class UserInformationPage extends Component {
    render() {
      return (
        <div>
        <h3 style={globalStyles.navigation}>Applicación / Mi Información</h3>
          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
                <InfoBox Icon={Accessibility}
                        color={pink600}
                        title="Nuevo progreso"
                        value="Registra un nuevo progreso obtenido"
                        action={
                            <RaisedButton
                                containerElement={<Link to="/create-progress"/>}
                                label="Registrar" 
                                secondary={true}
                        />}
                />
            </div>
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
                <InfoBox Icon={TrendingUp}
                        color={green600}
                        title="Mis resultados"
                        value="Muestra un resumen de tus progresos"
                        action={
                            <RaisedButton
                                containerElement={<Link to="/my-progress"/>}
                                backgroundColor={green600}
                                label="Ver mis progresos" 
                        />}
                />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15 ">
                <InfoBox Icon={ActionShoppingBasket}
                        color={green600}
                        title="Reportes de alimentos"
                        value="Muestra gráficación y reportes alimentos"
                        action={
                            <RaisedButton
                              containerElement={<Link to="/food-reports"/>}
                              backgroundColor={green600}
                              label="Reportes de alimentos"
                        />}
                />
            </div>
          </div>

        </div>
      );
    }
}

export default UserInformationPage;