const cleanFormType = 'CLEAN_FORM';
const writeValueFormType = 'WRITE_VALUE_FORM';
const calculateBodyFatPercentageType = 'CALCULATE_BODY_FAT_PERCENTAGE';
const cleanErrorType = 'CLEAN_ERROR';

const initialState = { 
  altura: '',
  peso: '',
  cintura: '',
  cuello: '',
  cadera: '',
  resultado: '',
  calcular: false,
  genero: {
    mujer: false,
    hombre: false
  },
  error: false,
  errorText: '',
  marginLeft: '0%'
};

export const actionCreators = {
  cleanForm: () => (dispatch, getState) => {
    dispatch({ type: cleanFormType });
  },
  writeValueForm: (value, type) => (dispatch, getState) => {
    let validator = /^([0-9]+\.?[0-9]*|\.[0-9]+)?$/;

    if (!validator.test(value) && (type !== 'hombre' && type !== 'mujer')) return;

    let altura = getState().home.altura;
    let peso = getState().home.peso;
    let cintura = getState().home.cintura;
    let cuello = getState().home.cuello;
    let cadera = getState().home.cadera;
    let genero = {...getState().home.genero};
    let calcular = false;

    switch (type) {
      case 'altura':
        altura = value;
        break;
      case 'peso':
        peso = value;
        break;
      case 'cintura':
        cintura = value;
        break;
      case 'cuello':
        cuello = value;
        break;
      case 'cadera':
        cadera = value;
        break;
      case 'hombre':
        genero.hombre = value;
        genero.mujer = !value;
        cadera = '';
        break;
      case 'mujer':
        genero.mujer = value;
        genero.hombre = !value;
        break;
      default:
        break;
    }

    if (altura !== '' && peso !== '' && cintura !== '' && cuello !== '' && (genero.mujer || genero.hombre)) {
      calcular = true;
    }

    dispatch({ type: writeValueFormType, altura, peso, cintura, cuello, cadera, genero, calcular });
  },
  calculateBodyFatPercentage: () => (dispatch, getState) => {
    let altura = getState().home.altura;
    let peso = getState().home.peso;
    let cintura = getState().home.cintura;
    let cuello = getState().home.cuello;
    let cadera = getState().home.cadera;
    let genero = {...getState().home.genero};
    let error = false;
    let errorText = '';
    let resultado = '';
    let marginLeft = '';

    //validar campos
    if (altura === '') {
      error = true;
      errorText = 'Falta capturar la altura';
      dispatch({ type: calculateBodyFatPercentageType, error, errorText, resultado });
      return;
    }

    if (peso === '') {
      error = true;
      errorText = 'Falta capturar el peso';
      dispatch({ type: calculateBodyFatPercentageType, error, errorText, resultado });
      return;
    }

    if (cintura === '') {
      error = true;
      errorText = 'Falta capturar la cintura';
      dispatch({ type: calculateBodyFatPercentageType, error, errorText, resultado });
      return;
    }

    if (cuello === '') {
      error = true;
      errorText = 'Falta capturar el cuello';
      dispatch({ type: calculateBodyFatPercentageType, error, errorText, resultado });
      return;
    }

    if (genero.hombre) {
      //calcula
      resultado = 495/(1.0324-0.19077*Math.log10(cintura-cuello)+0.15456*Math.log10(altura))-450;
    } else {
      if (cadera === '') {
        error = true;
        errorText = 'Falta capturar la cadera';
        dispatch({ type: calculateBodyFatPercentageType, error, errorText, resultado });
        return;
      }

      //calcula
      resultado = 495/(1.29579-0.35004*Math.log10(Number(cintura)+Number(cadera)-cuello)+0.22100*Math.log10(altura))-450;
    }

    resultado = Math.round((resultado + Number.EPSILON) * 100) / 100;

    if (resultado < 6) {
      marginLeft = "0%"
    } else if (resultado >= 6 && resultado < 14) {
      marginLeft = (resultado * 2) + "%"
    } else if (resultado >= 14 && resultado < 18) {
      marginLeft = (resultado * 2.395) + "%"
    } else if (resultado >= 18 && resultado < 25) {
      marginLeft = (resultado * 2.9) + "%"
    } else {
      marginLeft = "85%"
    }

    dispatch({ type: calculateBodyFatPercentageType, error, errorText, resultado, marginLeft });
  },
  cleanError:() => (dispatch, getState) => {
    dispatch({ type: cleanErrorType });
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === cleanFormType) {
    return {
      ...state,
      altura: '',
      peso: '',
      cintura: '',
      cuello: '',
      cadera: '',
      resultado: '',
      calcular: false,
      genero: {
        mujer: false,
        hombre: false
      }
    };
  }

  if (action.type === writeValueFormType) {
    return {
      ...state,
      altura: action.altura,
      peso: action.peso,
      cintura: action.cintura,
      cuello: action.cuello,
      cadera: action.cadera,
      genero: action.genero,
      calcular: action.calcular
    };
  }

  if (action.type === calculateBodyFatPercentageType) {
    return {
      ...state,
      error: action.error, 
      errorText: action.errorText,
      resultado: action.resultado,
      marginLeft: action.marginLeft
    }
  }

  if (action.type === cleanErrorType) {
    return {
      ...state,
      error: false,
      errorText: ''
    }
  }

  return state;
};
