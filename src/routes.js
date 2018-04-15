import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/session/LoginPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import FoodPage from './containers/admin/Food/FoodPage';
import CreateFoodPage from './containers/admin/Food/CreateFoodPage';
import ExercisePage from './containers/admin/Exercise/ExercisePage';
import CreateExercicePage from './containers/admin/Exercise/CreateExercicePage';
import UserInfoPage from './containers/user/UserInfo/UserInfoPage';
import RegisterPage from './containers/session/RegisterPage';
import CreateBodyAreaPage from './containers/admin/BodyArea/CreateBodyAreaPage';
import BodyAreaPage from './containers/admin/BodyArea/BodyAreaPage';
import CreateRutinePage from './containers/user/Rutine/CreateRutinePage';
import DietPage from './containers/user/Diet/DietPage';
import MyRoutinesPage from './containers/user/Rutine/MyRoutinesPage';
import RoutinePage from './containers/user/Rutine/RoutinePage';
import CreateDietPage from './containers/user/Diet/CreateDietPage';
import DBPTemp from './containers/DBPTemp';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={DBPTemp}/>
      <Route path="dashboard" component={DBPTemp}/>
      <Route path="form" component={FormPage}/>
      <Route path="table" component={TablePage}/>
      <Route path="food" component={FoodPage} />
      <Route path="create-food" component={CreateFoodPage}/>
      <Route path="exercises" component={ExercisePage}/>
      <Route path="create-exercise" component={CreateExercicePage}/>
      <Route path="user-info" component={UserInfoPage}/>
      <Route path="body-areas" component={BodyAreaPage}/>
      <Route path="create-body-areas" component={CreateBodyAreaPage}/>
      <Route path="create-rutine" component={CreateRutinePage}/>
      <Route path="my-routines" component={MyRoutinesPage}/>
      <Route path="routine/:id" component={RoutinePage}/>
      <Route path="diets" component={DietPage}/>
      <Route path="create-diet" component={CreateDietPage}/>
      {/* <Route path="type-routines" component={TypeRoutinePage}/> */}
      {/* <Route path="create-type-routine" component={CreateTypeRoutinePage}/> */}
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
