export function stringToBoolean(value: string | boolean): boolean {
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  } else if (typeof value === 'boolean') {
    return value;
  } else {
    throw new Error('Invalid input type. Must be string or boolean.');
  }
}
