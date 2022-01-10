import { spawn, call, all } from 'redux-saga/effects';
import loadBasicData from './initialSagas';
import pageLoaderSaga from './pageLoaderSaga';

export default function* rootSaga() {
  const sagas = [loadBasicData, pageLoaderSaga];

  const retrySagas = yield sagas.map(saga => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          // console.log(e);
        }
      }
    })
  });

  yield all(retrySagas);

  console.log('Root Saga');
}




// import { takeEvery, put, call, fork, spawn, join, select } from 'redux-saga/effects';

// async function swapiGet(pattern) {
//   const request = await fetch(`https://swapi.dev/api/${pattern}`);
//   const data = await request.json();
//   return data;
// };

// export function* loadPeople() {
//   const people = yield call(swapiGet, 'people');
//   yield put({ type: 'SET_PEOPLE', payload: people.results });
//   console.log('load people');
//   return people;
// };

// export function* loadPlanets() {
//   const planets = yield call(swapiGet, 'planets');
//   yield put({ type: 'SET_PLANETS', payload: planets.results });
//   console.log('load planets');
// };

// export function* workerSaga() {
//   console.log('run parallel tasks');
//   const task = yield fork(loadPeople);
//   yield spawn(loadPlanets);

//   // const people = yield join(task);
//   const store = yield select(s => s);
//   console.log('finish parallel tasks');
// };

// export function* watchClickSaga() {
//   yield takeEvery('LOAD_DATA', workerSaga);
// }

// export default function* rootSaga() {
//   yield watchClickSaga();

//   console.log('Saga ready');
// }