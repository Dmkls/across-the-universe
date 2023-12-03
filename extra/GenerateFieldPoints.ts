import Spline from 'typescript-cubic-spline';

/*
GenerateGameField - функция генерации точек для отрисовки игрового поля

Формат вызова:
    GenerateGameField(xStart: number, xStep: number, pointNumber: number, splineStep: number = 5)

Параметры:
    xStart - стартовое значение x
    xStep - шаг для генерации новой высоты
    pointNumber - количество точек по х
    splineStep - шаг сглашивания(чем больше шаг, тем меньше сглаживание)

Возвращает массив из точек в формате (x, y)
 */

function GenerateGameField(xStart: number, xStep: number, pointNumber: number, splineStep: number = 5) {
    function randomInt(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let xArr: number[] = [];
    let yArr: number[] = [];

    for (let i = 0; i < pointNumber; i++) {
        xArr.push(xStart + xStep * i);
        yArr.push(randomInt(-100, 100));
    }

    let spline = new Spline(xArr, yArr);

    let points: number[][] = [];
    for (let x = xStart; x <= xStep * (pointNumber - 1); x += splineStep) {
        points.push([x, spline.at(x)]);
    }

    return points;
}
