import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru', { redirects: 5 });

  check(res, {
    'финальный статус 200': (r) => r.status === 200,
    'редиректов не больше 3': (r) => r.url === 'https://map-snipped.ru/' || r.status === 200,
  });

  sleep(1);
}