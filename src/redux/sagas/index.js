import { spawn, call, all, take, fork, cancel, actionChannel } from 'redux-saga/effects';
import loadBasicData from './initialSagas';
import pageLoaderSaga from './pageLoaderSaga';

export function* fetchPlanets(signal) {
  console.log('LOAD_SOME_DATA starts');

  const response = yield call(
    fetch,
    'https://swapi.dev/api/planets',
    {signal});
  const data = yield call([response, response.json]);

  console.log('LOAD_SOME_DATA completed', data);
}

export function* loadOnAction() {
  const channel = yield actionChannel('LOAD_SOME_DATA');

  while (true) {
    yield take(channel);
    yield call(fetchPlanets);
    console.log('LOG');
  }

  // // yield takeLatest('LOAD_SOME_DATA', fetchPlanets);
  // let task;
  // let abortController = new AbortController();

  // while (true) {
  //   yield take('LOAD_SOME_DATA');

  //   if (task) {
  //     abortController.abort();
  //     yield cancel(task);
  //     abortController = new AbortController();
  //   }

  //   task = yield fork(fetchPlanets, abortController.signal);
  // }
}

export default function* rootSaga() {
  const sagas = [loadBasicData, pageLoaderSaga, loadOnAction];

  const retrySagas = yield sagas.map(saga => {
    return spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log(e);
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