import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/session/LoginPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPage';
import FoodPage from './containers/admin/Food/FoodPage';
import CreateFoodPage from './containers/admin/Food/CreateFoodPage';
import ExercisePage from './containers/admin/Exercise/ExercisePage';
import CreateExercicePage from './containers/admin/Exercise/CreateExercicePage';
import UserInfoPage from './containers/user/UserInfo/UserInfoPage';
import RegisterPage from './containers/session/RegisterPage';
// import TypeRoutinePage from './containers/admin/TypeRoutine/TypeRoutinePage';
// import CreateTypeRoutinePage from './containers/admin/TypeRoutine/CreateTypeRoutinePage';
import CreateBodyAreaPage from './containers/admin/BodyArea/CreateBodyAreaPage';
import BodyAreaPage from './containers/admin/BodyArea/BodyAreaPage';
import CreateRutinePage from './containers/user/Rutine/CreateRutinePage';

export default (
  <Route>
    <Route path="login" component={LoginPage}/>
    <Route path="register" component={RegisterPage}/>
    <Route path="/" component={App}>
      <IndexRoute component={Dashboard}/>
      <Route path="dashboard" component={Dashboard}/>
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
      {/* <Route path="type-routines" component={TypeRoutinePage}/> */}
      {/* <Route path="create-type-routine" component={CreateTypeRoutinePage}/> */}
      <Route path="*" component={NotFoundPage}/>
    </Route>
  </Route>
);
