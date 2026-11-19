import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    'HTML не пустой (> 1000 байт)': (r) => r.body.length > 1000,
    'HTML не гигантский (< 5 MB)': (r) => r.body.length < 5 * 1024 * 1024,
  });

  sleep(1);
}