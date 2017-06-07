import { API_URL } from '../source/config';
import axios from 'axios';

it('connects to the remove api', (done) => {
  axios.get(API_URL).then(r => {
    expect(r).toHaveProperty('status', 200);
    expect(r).toHaveProperty('data');
  }).then(done).catch(e => console.log(e));
});