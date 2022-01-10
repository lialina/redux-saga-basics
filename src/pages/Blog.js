// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Blog() {
  const blogData = useSelector(store => store.app.blog);
  const dispatch = useDispatch();

  console.log(blogData);

  return (
    <div>
      Blog
      <button onClick={() => dispatch({type: 'LOAD_SOME_DATA'})}>Load some data</button>
    </div>
  )
}