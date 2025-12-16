export function* combinations<T>(arr: T[]): Generator<T[]> {
  const combinations: T[][] = [];

  for (const element of arr) {
    const l = combinations.length;
    for (let i = 0; i < l; i++) {
      const newSet = [...combinations[i], element];
      yield newSet;
      combinations.push(newSet);
    }
    combinations.push([element]);
    yield [element];
  }
  yield [];
  return combinations;
}
