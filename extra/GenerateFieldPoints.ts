/*
GenerateFieldPoints - функция которая возвращает массив точке (x, y) для создания игрового поля

Параметры:
    start_x - стартовое значение Х
    finish_x - конечное значение Х
    step_x - шаг для задания точек по Х
    min_y - минимальнодопутимое значение по У
    max_y - максимальнодопустимое значение по У
    height_coef - коэфициент генерации высот(чем он выше, тем больше разброс высот)
    spline_coef - коэфициент фильтрации значений. Допустимые значения от 0-1(Чем меньше значение,
    тем плавнее переход)
 */


function GenerateFieldPoints(start_x: number, finish_x: number, step_x: number = 1, min_y: number = -500,
                             max_y: number = 500, height_coef: number = 10, spline_coef: number = 0.05) {
    let x_arr: number[] = [];
    let y_arr: number[] = [];
    let temp: number = 0;

    for (let x = start_x; x <= finish_x; x += step_x) {
        x_arr.push(x);
        let y: number = Math.floor((Math.random() - .5) * height_coef);

        if (y > max_y || y < min_y) {
            y *= .5;
        }

        temp += (y - temp) * spline_coef
        y_arr.push(y);
    }

    let points: number[][] = [];
    for (let i = 0; i < x_arr.length; i++) {
        points.push([x_arr[i], y_arr[i]])
    }

    return points
}