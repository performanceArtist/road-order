import { GPSTrack, GPSCoordinates } from '@shared/types';

function pointDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const p = 0.017453292519943295;
  const a =
    0.5 -
    Math.cos((lat2 - lat1) * p) / 2 +
    (Math.cos(lat1 * p) *
      Math.cos(lat2 * p) *
      (1 - Math.cos((lon2 - lon1) * p))) /
      2;
  return 12742 * Math.asin(Math.sqrt(a));
}

export function haversine(list: GPSTrack, point: GPSCoordinates) {
  const res = list.map(p => pointDistance(point[0], point[1], p[0], p[1]));
  const index = res.indexOf(Math.min(...res));
  return index;
}

export function inRadius(
  target: GPSCoordinates,
  point: GPSCoordinates,
  r: number
) {
  return (
    Math.sqrt(
      Math.pow(target[0] - point[0], 2) + Math.pow(target[1] - point[1], 2)
    ) < r
  );
}
