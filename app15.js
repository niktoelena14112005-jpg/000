import http from 'k6/http';
import { check, sleep } from 'k6';

export default function () {
  const res = http.get('https://map-snipped.ru');

  check(res, {
    // HTTP-уровень
    'статус 200 OK': (r) => r.status === 200,
    'Content-Type text/html': (r) =>
      r.headers['Content-Type'] && r.headers['Content-Type'].includes('text/html'),
    'скорость < 2000 мс': (r) => r.timings.duration < 2000,
    'размер > 1000 байт': (r) => r.body.length > 1000,

    // Flutter-специфичные проверки
    'есть flutter_bootstrap.js': (r) => r.body.includes('flutter_bootstrap.js'),
    'нет Fatal Error': (r) => !r.body.includes('Fatal Error'),
  });

  sleep(1);
}