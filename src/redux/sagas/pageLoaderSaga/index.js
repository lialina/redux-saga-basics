import {call, apply, takeEvery, take} from 'redux-saga/effects';
import {LOCATION_CHANGE} from 'connected-react-router'
function* loadBlogData() {
  const request = yield call(fetch, 'http://swapi.dev/api/vehicles/');
  const data = yield apply(request, request.json);

  console.log('Blog data', data);
}

export default function* pageLoaderSaga() {
  // while (true) {
  //   const action = yield take(LOCATION_CHANGE);

  //   if (action.payload.location.endsWith('blog')) {

  //   }

  //   console.log('>>', action);
  // }
  yield takeEvery('LOAD_BLOG_DATA', loadBlogData)
}