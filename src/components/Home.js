import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHeartPulse, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { actionCreators } from '../store/HomeStore';
import Swal from 'sweetalert2';

class Home extends Component {

  render() {

    const caderaDiv = this.props.genero.mujer ? <div>
      <div className="row mt-4">
        <div className="col-12">
          Cadera (cm)
        </div>
      </div>
      <div className="row mt-1">
        <div className="col-12">
          <input className="form-control transparent-input border-radious" type="text" placeholder="Medida de tu cadera" value={this.props.cadera} onChange={(e) => { this.props.writeValueForm(e.target.value, 'cadera'); }} />
        </div>
      </div>
    </div> : <div></div>;

    const resultado = this.props.resultado !== '' ? 
    <div className="mt-2">
      <label className="h2 font-weight-bold">Tu resultado: {this.props.resultado}%</label>
      <div className="progress icon mt-5" style={{height: "1px"}}>
        <div className="progress-bar-icon" style={{width: "20%", marginLeft: this.props.marginLeft}}>
          <label className="h3 mt-3">{this.props.resultado}%</label>
          <FontAwesomeIcon style={{fontSize: "35px", marginTop:"-15px", display: "block", zoom: "1.5"}} icon={faCaretDown} />
        </div>
      </div>
      <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: "100%"}}></div>
      </div>
      <div className="row mt-5">
        <div className="col" align="center">
          <figure className="figure first mb-0"/><br />
          <label className="small font-weight-bold mb-0">2-4%</label>
          <label className="small">Escencial</label>
        </div>
        <div className="col" align="center">
          <figure className="figure second mb-0"/><br />
          <label className="small font-weight-bold mb-0">6-13%</label>
          <label className="small">Deportista</label>
        </div>
        <div className="col" align="center">
          <figure className="figure third mb-0"/><br />
          <label className="small font-weight-bold mb-0">14-17%</label>
          <label className="small">Fitness</label>
        </div>
        <div className="col" align="center">
          <figure className="figure fourth mb-0"/><br />
          <label className="small font-weight-bold mb-0">18-25%</label>
          <label className="small">Aceptable</label>
        </div>
        <div className="col" align="center">
          <figure className="figure fifth mb-0"/><br />
          <label className="small font-weight-bold mb-0">25% +</label>
          <label className="small">Obeso</label>
        </div>
      </div>
    </div> : <div></div>;

    if (this.props.error) {
      Swal.fire({
        icon: 'info',
        title: 'Datos faltantes',
        text: this.props.errorText
      }).then((result) => {
        this.props.cleanError();
      });
    }

    return (
      <div className="App">
          <nav className="navbar navbar-expand-lg">
            <div className="collapse navbar-collapse order-0 mb-0 mt-2">
              <ul className="navbar-nav me-auto">
                <li className="nav-item ml-5">
                  <span className="navbar-text h3 p-0">
                    <FontAwesomeIcon icon={faHeartPulse} />
                    <span className="navbar-text ml-3 h5">Health Overview</span>
                  </span>
                </li>
              </ul>
            </div>
            <div className="mx-auto order-1">
              <span className="navbar-text mr-3">
                <button className='btn btn-white'>
                  <FontAwesomeIcon icon={faBars} />
                </button>
              </span>
            </div>
          </nav>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="container-fluid">
                  <div className="row mt-5">
                    <div className="col-10">
                      <span className="h1 font-weight-bold">Calculadora de Grasa Corporal</span>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      El método de la Marina de Estados Unidos (US Navy Method) ofrece una manera sencilla de calcular un aproximado del porcentaje de tejido adiposo en el cuerpo de una persona.
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      Los valores requeridos por la fórmula son los siguientes:
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      <span className="font-weight-bold">Género</span>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-2">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="generoRadios" checked={this.props.genero.hombre} onChange={(e) => { this.props.writeValueForm(e.target.value, 'hombre'); }} />
                        <label className="form-check-label font-weight-bold" htmlFor="generoRadios">
                          Hombre
                        </label>
                      </div>
                    </div>
                    <div className="col-2 ml-1">
                      <div className="form-check">
                        <input className="form-check-input" type="radio" name="generoRadios" checked={this.props.genero.mujer} onChange={(e) => { this.props.writeValueForm(e.target.value, 'mujer'); }} />
                        <label className="form-check-label font-weight-bold" htmlFor="generoRadios">
                          Mujer
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      Altura (cm)
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-12">
                      <input className="form-control transparent-input border-radious" type="text" placeholder="Escribe tu altura" value={this.props.altura} onChange={(e) => { this.props.writeValueForm(e.target.value, 'altura'); }} />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      Peso (kg)
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-12">
                      <input className="form-control transparent-input border-radious" type="text" placeholder="Escribe tu peso" value={this.props.peso} onChange={(e) => { this.props.writeValueForm(e.target.value, 'peso'); }} />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      Cintura (cm)
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-12">
                      <input className="form-control transparent-input border-radious" type="text" placeholder="Medida de tu cintura" value={this.props.cintura} onChange={(e) => { this.props.writeValueForm(e.target.value, 'cintura'); }} />
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      Cuello (cm)
                    </div>
                  </div>
                  <div className="row mt-1">
                    <div className="col-12">
                      <input className="form-control transparent-input border-radious" type="text" placeholder="Medida de tu cuello" value={this.props.cuello} onChange={(e) => { this.props.writeValueForm(e.target.value, 'cuello'); }} />
                    </div>
                  </div>
                  {caderaDiv}
                  <div className="row mt-4 mb-2">
                    <div className="col-2">
                      <button type="button" className="btn btn-primary border-radious" disabled={!this.props.calcular} onClick={this.props.calculateBodyFatPercentage}>Calcular</button>
                    </div>
                    <div className="col-2 ml-1">
                      <div className="form-check">
                        <button type="button" className="btn btn-light border-radious transparent-input-noborder" onClick={this.props.cleanForm}>Limpiar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center">
              <div className="container-fluid">
                  <div className="col-12">
                    {resultado}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
      );
    }
}

export default connect(
  state => state.home,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(Home);
