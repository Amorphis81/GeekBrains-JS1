var a = 1, b = 1, c, d;
c = ++a; alert(c); // 2
//a=1, вначале произошло приращение на 1, а потом присвоение.
d = b++; alert(d); // 1
//вначале присвоилось, а потом прибавилась 1
c = (2+ ++a); alert(c); // 5
//а было равно 2, +1 я прибавилось
d = (2+ b++); alert(d); // 4
//b в 4 строке увеличилось до 2, а поскольку ++ стоят после переменной, то прибавка произойдет позже
alert(a); // 3
// а в 2 строке стало 2, в 6 прибавилось еще 1
alert(b); // 3
//b в 8 строке увеличилось с 2 до 3.