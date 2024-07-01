export function flattenFormData(data) {
  const flattenedData = {};

  Object.values(data).forEach(step => {
    Object.entries(step).forEach(([key, value]) => {
      if (value !== '') {
        flattenedData[key] = value;
      }
    });
  });

  return flattenedData;
}