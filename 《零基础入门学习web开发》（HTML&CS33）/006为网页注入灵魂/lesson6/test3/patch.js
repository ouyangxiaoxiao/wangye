// document.write("I love FishC.com!");

var x = document.getElementsByTagName('p');
for (var i=0; i< x.length; i++)
{
    x[i].innerText = '小甲鱼到此一游';
}