export function converEnumToOptions(obj: Record<string, string>) {
  return Object.keys(obj).map((key) => ({ label: obj[key], value: key }));
}
