let data = 42;

data = 10;

export interface ICar {
  color: string;
  model: string;
  topSpeed?: number
}//optional ? 

const car1: ICar = {
  color: 'blue',
  model: 'BMW'
}

const car2: ICar = {
  color: 'red',
  model: 'Mercedes',
  topSpeed: 100
}

//argument has any types

// const multiply = (x: number, y: number) => {
//   x * y
// }
//when return xy must be string ,so toString()
//void not return anything but must be redundant so withiout void but void is side effect behind


export const cars = [car1, car2];