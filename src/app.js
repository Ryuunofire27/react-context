import React, { Component } from 'react';
import { render } from 'react-dom';

//Crea un contexto para ser usado en cualquier lado de la aplicacion
const AppContext = React.createContext();

class UserForm extends Component{

  // Crea una referencia a los elementos del dom 
  nameRef = React.createRef();
  psswRef = React.createRef(); 

  setUser = () => {
    this.props.app.appFn.setUser({ name: this.nameRef.current.value, password: this.psswRef.current.value });
  }
  render(){
    const { user } = this.props.app.appStates ;
    return (
      <div>
        <h1>Login</h1>
        <span>Nombre Actual: {user && user.name}</span><br/>
        <span>Contraseña Actual: {user && user.password}</span><br/>
        <input type="text" ref={this.nameRef} /><br/>
        <input type="password" ref={this.psswRef}/><br/>
        <input type="button" value="Enviar info" onClick={this.setUser}/>
      </div>
    );
  }
}

class App extends Component{
  state = {
    user: null,
  }

  setUser = (user) => {
    this.setState({ user });
  }

  render(){
    return (
      // El provedor del contexto, poner en el lugar mas alto donde se vaya a usar
      <AppContext.Provider value={{appStates: this.state, appFn: {setUser: this.setUser}}}>
        {/*El consumidor del contexto, poner como padre del componente donde se use el contexto*/}
        <AppContext.Consumer>
          {app => <UserForm app={app}/>}
        </AppContext.Consumer>
      </AppContext.Provider>
    );
  }
}

render(<App/>, document.getElementById('app'));