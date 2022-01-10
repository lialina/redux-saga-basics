import { fork, call, all, delay } from 'redux-saga/effects';

function* auth() {
  yield delay(2000);

  console.log('Auth ok');
  
  return true;
}

function* loadUsers() {
  const request = yield call(fetch, 'https://swapi.dev/api/people');
  // const data = yield call(request.json.bind(request));
  const data = yield call([request, request.json]);

  console.log('Data', data);
}

export default function* loadBasicData() {
  yield all([
    fork(auth),
    fork(loadUsers)
  ])
};