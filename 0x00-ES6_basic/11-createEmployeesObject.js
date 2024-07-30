export default function createEmployeesObject(departmentName, employees) {
  const empObject = {
    [departmentName]: [...employees],
  };
  return empObject;
}
