const carNames = ['Tesla', 'Ford', 'Mercedes', 'Honda', 'Hyundai', 'Kia', 'Lada', 'Mazda', 'Volkswagen', 'Renault'];
const carModels = ['RS6', 'A3', 'A5', 'A7', 'SQ5', 'Q6', 'Jetta', 'Polo', 'Passat', 'Golf'];

// генерация случайного числа в заданном интервале, включительно
export const getRandomInteger = (a = 0, b = 1) => {
    const lower = Math.ceil(Math.min(a, b));
    const upper = Math.floor(Math.max(a, b));
  
    return Math.floor(lower + Math.random() * (upper - lower + 1));
  };
  
// генерация случайного элемента из массива
const generateRandomElement = <T>(arr: Array<T>) => {
    const index = getRandomInteger(0, arr.length - 1);
    return arr[index];
  };

export const getRandomCarName = () => {
    const carName = generateRandomElement(carNames);
    const carModel = generateRandomElement(carModels);
    return `${carName} ${carModel}`;
}