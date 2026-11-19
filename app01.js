import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    'статус ответа 200 OK': (r) => r.status === 200,
  });

  sleep(1);
}