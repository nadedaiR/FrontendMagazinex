*The following is a guest post by Gregor Adams about how he managed to re-create the Netflix logo in CSS. Gregor is kind of the rising star when it comes to CSS, so needless to say it is a great honor to have him here.*<br/>
*��ƪ������[Gregor Adams](https://twitter.com/gregoradams)����������跨�����CSS����Netflix�̱ꡣGregor��������CSS������star���ٹھ�����������̸����Ҳ�Ƿǳ������ġ�*<p>
A few months ago I tested Netflix, immediately got hooked and got myself an account. I started watching a lot of series that I usually had to view elsewhere. Each episode or movie starts with the Netflix logo animation.<br/>
������ǰ�ҳ���Netflix��һ������ӰƬ�����ṩ�̣��������Ͱ�����ס�ˡ��ҹۿ���һЩ����ǰ�ڱ𴦿��Ľ�Ŀ��ÿһ�����Ӿ���ߵ�Ӱ����Netflix������ʼ��<p>
![Original animated Netflix logo](images/1.gif)<p>
I immediately started thinking about implementing this in CSS. So after watching a few episodes I went over to CodePen and started to work on the logo.<br/>
��ͻȻ��ʼ����CSS��ʵ�֡����Կ��˼�����͵�[CodePen](http://codepen.io/pixelass/)��ʵ�����logo��<p>
###��һ������/First concept
My first implementation was a little dirty since I was trying a few things.<br/>
�ҵĵ�һ��ʵʩ��ʽ���е㲻��ģ���Ϊ�ҳ��Բ���һ���¶�����<p>
For example: I wanted to do this in pure CSS and I also wanted to be able to run the animation again when I click a button, so I had to use some magic. Luckily I always have a few tricks up my sleeve when it comes to CSS.<br/>
���磺����ʹ�ô�CSS������ʵ������������Ҳ�뵱�ҵ����ť��ʱ�����������ִ��һ�Σ�������Ҫʹ��һЩ����˼�鼼�ɡ����˵��ǵ���дCSS�����ʱ���ܻ���һЩ�����ܵ��ҵ��������档<p>
But let��s talk about the actual animation.<br/>
������̸��һ��ʵ�ʵĶ�����<p>
I recorded the logo and looped it in Quicktime so I could examine it in detail. I tend to do that a lot because it allows me to stop at certain frames to figure out what is actually going on.<br/>
��¼���������������Quicktime��ѭ�����ţ������ҿ�����ϸ��顣����������ô������Ϊ��������ͣ��ĳЩ�ض�֡Ū������׷�����ʲô��<p>
The logo:</br>
����̱꣺</br>
starts with a white screen;</br>
1.��һ������Ļ��ʼ��</br>
pops out as white 3d letters;</br>
2.������ɫ��3D��ĸ��</br>
throws a shadow;</br>
3.Ͷ����Ӱ��</br>
fades back;</br>
4.��ʧ��</br>
changes the font color to red.</br>
5.��������ɫ��ɺ�ɫ��</br>
<p>
So these were the animation steps I needed to replicate. But there is something else about the logo that I needed to take care of: the letters are tilted to the center of the logo.<br/>
���������Ҫʵ�ֵĶ������衣��������������һЩ�������logo�Ķ�����Ҫ�����**��ĸ���̱���������б�ġ�**<p>
People have been asking me how I did that��</br>
���һֱ�������������Щ��<p>
A trick from up my sleeve ;)<br/>
*�ӻ����л�ȡ��*<br/>
I do a lot of 3d experiments, so this wasn��t that much of a difficulty to me.<br/>
���������3Dʵ�飬�����������˵���Ǻ��ѡ�<p>
###ʹ��ĸ����б/Deforming/Tilting the letters
I started with some basic markup for the word ��Netflix��<br/>
������ʡ�Netflix����һЩ������ǿ�ʼ��<p>
```
<div class="logo">
  <span>N</span>
  <span>E</span>
  <span>T</span>
  <span>F</span>
  <span>L</span>
  <span>I</span>
  <span>X</span>
</div>
```
I made a wrapper with the class logo and wrapped each letter in a span.<br/>
������<code>logo</code>����һ����װ��������<code>span</code>��ǩ����ÿһ����ĸ��<p>
Then I rotated the letters on the y-axis and scaled them on the x-axis to retain its original width. The important part is setting a perspective on the wrapper and defining its perspective-origin.<br/>
Ȼ������Y������ת�����ĸ������X�������������ĸ�Ա�������ԭʼ��ȡ���Ҫ�Ĳ�������<code> class="logo"</code>��װ������һ������<code>perspective </code>�����Ҷ������ľ���ԭ��<code> perspective-origi</code>��
```
// ��������ĸ��ʽ
span {
  font-size: 8em;
  font-family: impact;
  display: block;
}
// ������άЧ��
.logo {
  perspective: 1000px;
  perspective-origin: 50% 0;
}

//����ĸ�任
.logo span {
  transform-origin: 0 0;
  transform: scaleX(80) rotateY(89.5deg);
}
```
There are different way of doing this, like using a different perspective (e.g. 500px), rotation-angle (e.g. 9deg) and scale value (e.g. 0.5) but these values turned out to work the best for my needs.<br/>
���ﻹ��һЩ�����ķ�ʽ��ʵ����Щ������ʹ��һ����ͬ�������500px������ת�Ƕȣ�����9deg����Ť��ֵ������0.5����������Щֵ��ʵ��������Ҫ��Ч����<p>
Here��s a demo on CodePen:<br/>
��������CODEPENʵ�ֵ�С���ӣ���ԭdemo��ҳ����Ƕ���iframeʵ��Ƕ��CODEPEN������markdownû��Ƕ��iframe�ķ��������Բ��ô������չʾ�����Ұ�ԭdemo��jade��scssд��ת����css����û��ʹ�ù����ּ����Ķ����Ķ���<p>
*jadeʵ��*
```
div(class="fig--1")
  style. 
    @import 'http://codepen.io/pixelass/pen/raEojV.css';
  p Original:
  span N
  p Transformed:
  .logo
    span N
```
*htmlʵ��*
```
<div class="fig--1">
  <style>@import 'http://codepen.io/pixelass/pen/raEojV.css';</style>
  <p>Original:</p><span>N</span>
  <p>Transformed:</p>
  <div class="logo"><span>N</span></div>
</div>
```
*scssʵ��*
```
.fig--1 {
  span {
    font-size: 8em;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    display: block;
  }
  .logo {
    perspective: 1000px;
    perspective-origin: 50% 0;
    span {
      transform-origin: 0 0;
      transform: scaleX(80) rotateY(89.5deg);
    }
  }
}
```
*cssʵ��*
```
.fig--1 span {
  font-size: 8em;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  display: block;
}
.fig--1 .logo {
  perspective: 1000px;
  perspective-origin: 50% 0;
}
.fig--1 .logo span {
  transform-origin: 0 0;
  transform: scaleX(80) rotateY(89.5deg);
}
```
*ʵ��Ч��*<p>
![all text](images/2.png)<p>
Next I had to apply this to all the letters respecting that the middle letter is not transformed, the ones to the right are tilted in the opposite direction and the height of the letters changes.<br/>
��������Ҫ�����е���ĸӦ�������ʽ���м����ĸ��Ҫ�仯���ұߵ���ĸ�����෴�ķ�����б��������ĸ�߶ȷ����仯��<p>
To do this I needed to add some logic: I use Sass with the SCSS syntax to do this.<br/>
Ϊ��ʵ����Щ��Ҫ����һЩ���߼�����ʹ��SASS�ı�׼�﷨��ʵ�֡�<p>
*scss����*
```
.logo {
  perspective: 1000px;
  perspective-origin: 50% 0;
  font-size: 8em;
  display: inline-flex;

  span {
    font-family: impact;
    display: block;

    $letters: 7;
    @for $i from 1 through $letters {
      $offset: $i - ceil($letters / 2);
      $trans: if($offset > 0, -89.5deg, 89.5deg);

      &:nth-child(#{$i}) {
        // trans/de-form the letters
        transform-origin: 50% + 50%/$offset 200%;
        font-size: if($offset == 0,
          0.85em,
          0.9em + 0.015*pow(abs($offset),2));
        transform:
            if($offset == 0, scale(1, 1), scale(95.9 - abs($offset) * 10, 1))
            if($offset == 0, translatey(0%), rotatey($trans));
      }
    }
  }
}
```
*Ϊ�˷��㲻��scssͬѧ�����������ұ�����css����*
```
.logo {
  perspective: 1000px;
  perspective-origin: 50% 0;
  font-size: 8em;
  display: inline-flex;
}
.logo span {
  font-family: impact;
  display: block;
}
.logo span:nth-child(1) {
  transform-origin: 33.33333333% 200%;
  font-size: 1.035em;
  transform: scale(65.9, 1) rotatey(89.5deg);
}
.logo span:nth-child(2) {
  transform-origin: 25% 200%;
  font-size: 0.96em;
  transform: scale(75.9, 1) rotatey(89.5deg);
}
.logo span:nth-child(3) {
  transform-origin: 0% 200%;
  font-size: 0.915em;
  transform: scale(85.9, 1) rotatey(89.5deg);
}
.logo span:nth-child(4) {
  transform-origin: Infinity% 200%;
  font-size: 0.85em;
  transform: scale(1, 1) translatey(0%);
}
.logo span:nth-child(5) {
  transform-origin: 100% 200%;
  font-size: 0.915em;
  transform: scale(85.9, 1) rotatey(-89.5deg);
}
.logo span:nth-child(6) {
  transform-origin: 75% 200%;
  font-size: 0.96em;
  transform: scale(75.9, 1) rotatey(-89.5deg);
}
.logo span:nth-child(7) {
  transform-origin: 66.66666667% 200%;
  font-size: 1.035em;
  transform: scale(65.9, 1) rotatey(-89.5deg);
}
```
Here��s a demo on CodePen<br/>
������demo����飨ԭdemo��ҳ����Ƕ���iframeʵ��Ƕ��CODEPEN������markdownû��Ƕ��iframe�ķ��������Բ��ô������չʾ�����Ұ�ԭdemo��jade��scssд��ת����css����û��ʹ�ù����ּ����Ķ����Ķ���<p>
*jade*
```
div(class="fig--2")
  style. 
    @import 'http://codepen.io/pixelass/pen/yydGPL.css';
  .logo
    span N
    span E
    span T
    span F
    span L
    span I
    span X
```
*html*
```
<div class="fig--2">
  <style>@import 'http://codepen.io/pixelass/pen/yydGPL.css';</style>
  <div class="logo">
    <span>N</span>
    <span>E</span>
    <span>T</span>
    <span>F</span>
    <span>L</span>
    <span>I</span>
    <span>X</span>
  </div>
</div>
```
*scss*
```
.fig--2 .logo {
  perspective: 1000px;
  perspective-origin: 50% 0;
  font-size: 8em;
  display: inline-flex;
}
.fig--2 .logo span {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  display: block;
}
.fig--2 .logo span:nth-child(1) {
  transform-origin: 33.33333333% 200%;
  font-size: 1.035em;
  transform: scale(65.9, 1) rotatey(89.5deg);
}
.fig--2 .logo span:nth-child(2) {
  transform-origin: 25% 200%;
  font-size: 0.96em;
  transform: scale(75.9, 1) rotatey(89.5deg);
}
.fig--2 .logo span:nth-child(3) {
  transform-origin: 0% 200%;
  font-size: 0.915em;
  transform: scale(85.9, 1) rotatey(89.5deg);
}
.fig--2 .logo span:nth-child(4) {
  transform-origin: Infinity% 200%;
  font-size: 0.85em;
  transform: scale(1, 1) translatey(0%);
}
.fig--2 .logo span:nth-child(5) {
  transform-origin: 100% 200%;
  font-size: 0.915em;
  transform: scale(85.9, 1) rotatey(-89.5deg);
}
.fig--2 .logo span:nth-child(6) {
  transform-origin: 75% 200%;
  font-size: 0.96em;
  transform: scale(75.9, 1) rotatey(-89.5deg);
}
.fig--2 .logo span:nth-child(7) {
  transform-origin: 66.66666667% 200%;
  font-size: 1.035em;
  transform: scale(65.9, 1) rotatey(-89.5deg);
}

```
*css*
```
.fig--2 .logo {
  perspective: 1000px;
  perspective-origin: 50% 0;
  font-size: 8em;
  display: inline-flex;
}
.fig--2 .logo span {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  display: block;
}
.fig--2 .logo span:nth-child(1) {
  transform-origin: 33.33333333% 200%;
  font-size: 1.035em;
  transform: scale(65.9, 1) rotatey(89.5deg);
}
.fig--2 .logo span:nth-child(2) {
  transform-origin: 25% 200%;
  font-size: 0.96em;
  transform: scale(75.9, 1) rotatey(89.5deg);
}
.fig--2 .logo span:nth-child(3) {
  transform-origin: 0% 200%;
  font-size: 0.915em;
  transform: scale(85.9, 1) rotatey(89.5deg);
}
.fig--2 .logo span:nth-child(4) {
  transform-origin: Infinity% 200%;
  font-size: 0.85em;
  transform: scale(1, 1) translatey(0%);
}
.fig--2 .logo span:nth-child(5) {
  transform-origin: 100% 200%;
  font-size: 0.915em;
  transform: scale(85.9, 1) rotatey(-89.5deg);
}
.fig--2 .logo span:nth-child(6) {
  transform-origin: 75% 200%;
  font-size: 0.96em;
  transform: scale(75.9, 1) rotatey(-89.5deg);
}
.fig--2 .logo span:nth-child(7) {
  transform-origin: 66.66666667% 200%;
  font-size: 1.035em;
  transform: scale(65.9, 1) rotatey(-89.5deg);
}
```
*ʵ��Ч��*<p>
![all text](images/3.png)<p>

###һ��������Ӱ�ĺ���/A function for the shadow
Let��s write a function for the 3d-effect and the shadow. I paused on one frame of the video I had made before and looked at it in detail.<br/>
дһ��ʵ��3dЧ������Ӱ�ĺ������Ұ���Ƶͣ��ĳһ֡��������ϸ�鿴ϸ�ڡ�<p>.
![Image extracted from the original animated Netflix logo](images/4.png)<p>
As you can see the 3d effect��s vanishing point is in the center while the shadow drops to the bottom right. Now we know what our function has to be able to do.<br/>
�������������ģ��������Ӱ�������½ǣ�3dЧ������ʧ�����м䡣����֪�����Ǻ�����Ҫ��ʲô�ˡ�<p>
We will call this function inside keyframes so we want it to be able to handle a few values like:<br/>
���ǽ�����keyframes�е��������������������ϣ�����ܴ���һЩֵ�����磺<br/>
<ul>
  <li>color</li>
  <li>x</li>
  <li>y</li>
  <li>blur</li>
  <li>mix</li>
</ul>
We need one more argument to define the depth of the shadow or 3d-effect.<br/>
���ǻ���Ҫһ��������������Ӱ����ȡ�<p>
![My CSS implementation of the previously shown image](images/5.png)<p>
Here��s the function I am using to handle all these requirements:<br/>
�����������������Щ����ĺ�����<p>
```
/// ���ض����򴴴�����ά��Ӱ
/// @author Gregor Adams
/// @param  {Number}        $depth - ��Ӱ����
/// @param  {Unit}          $color - ��Ӱ��ɫ
/// @param  {Unit}          $x     - ��x���ϵ���һ����Ӱ�ľ���
/// @param  {Unit}          $y     - ��y���ϵ���һ����Ӱ�ľ���
/// @param  {Unit}          $blur  - text-shadow��ģ������
/// @param  {Color|false}   $mix   - ���һ����ѡ����ɫ�����
/// @return {List}          - ����text-shadow�б�
@function d3($depth, $color, $x: 1px, $y: 1px, $blur: 0, $mix: false) {
  $shadow: ();
  @for $i from 1 through $depth {
    // append to the existing shadow
    @if type-of($mix) != 'color' {
      $shadow: append($shadow, round($i * $x) round($i * $y) $blur $color, comma);

    } @else {
      $shadow: append($shadow, round($i * $x) round($i * $y) $blur mix($mix, $color, 0.3%*$i), comma);
    }
  }
  @return $shadow;
}
```
This function might be a little hard to understand for Sass-noobs or developers/designers that only use the basic features of the language, so let me explain it in detail.<br/>
�����������sass�������ֻʹ�û����������ԵĿ����ߺ����ʦ��˵�����е�����⣬������������ϸ����һ��.<p>
I start off with a variable I called $shadow. It is an empty list.<br/>
����һ��<code>$shadow</code>�ı�����ʼ��<code>list</code>��һ���յ��б�
```
$shadow: ();
```
I am looping from 1 through the depth. through in Sass means that we iterate including this value.<br/>
���Ǵ�1��ʼѭ�����б����ȡ�ͨ��Sass��ζ�����ǵ����������µ�ֵ��
<ul>
  <li>from 0 to 5 = 0, 1, 2, 3, 4</li>
  <li>from 0 through 5 = 0, 1, 2, 3, 4, 5</li>
</ul>
In each iteration I append a text-shadow to the list. So in the end the variable looks something like this:<br/>
ÿһ�ε����Ҷ����һ��text-shadow������б������������б�������������������ӣ�<br/>
```
$shadow: (0 1px 0 red, 1px 2px 0 red, 2px 3px 0 red, ...);
```
�� and I use it like this:<br/>
ʹ�õ�ʱ���������������<br/>
```
text-shadow: d3(5, red, [$x], [$y], [$blur], [$mix]);
```
$x, $y, $blur and $mix are optional arguments. I already mentioned that I will call this function inside keyframes so I need to be able to optionally change them. $mix will allow to add a second color so the shadow fades from one to the other.<br/>
$x,$y,$blur��$mix���ǿ�ѡ�Ĳ��������Ѿ��ᵽ�ҽ�����keyframes�е��������������������Ҫ��ѡ���Եĸı����ǡ� $mix������ӵڶ�����ɫ��ʵ�������Ӱ��һ����ɫ����������һ����ɫ��<p>
Here��s a demo on CodePen:<br/>
���������ӣ�
*jade*
```
div(class="fig--3")
  style. 
    @import 'http://codepen.io/pixelass/pen/XJLOXg.css';
  .logo
    span N
    span E
    span T
    span F
    span L
    span I
    span X
  p(style="height: 50px")
```
*html*
```
<div class="fig--3">
  <style>@import 'http://codepen.io/pixelass/pen/XJLOXg.css';</style>
  <div class="logo">
    <span>N</span>
    <span>E</span>
    <span>T</span>
    <span>F</span>
    <span>L</span>
    <span>I</span>
    <span>X</span>
  </div>
  <p style="height: 50px"></p>
</div>
```
*scss*
```
/// Create a 3d-shadow in a certain direction
/// @author Gregor Adams
/// @param  {Number}        $depth - ��Ӱ����
/// @param  {Unit}          $color - ��Ӱ��ɫ
/// @param  {Unit}          $x     - ��x���ϵ���һ����Ӱ�ľ���
/// @param  {Unit}          $y     - ��y���ϵ���һ����Ӱ�ľ���
/// @param  {Unit}          $blur  - text-shadow��ģ������
/// @param  {Color|false}   $mix   - ���һ����ѡ����ɫ�����
/// @return {List}          - ����һ��text-shadow�б�
@function d3($depth, $color, $x: 1px, $y: 1px, $blur: 0, $mix: false) {
  $shadow: ();
  @for $i from 1 through $depth {
    // append to the existing shadow
    @if type-of($mix) != 'color' {
      $shadow: append($shadow, round($i * $x) round($i * $y) $blur $color, comma);
    } @else {
      $shadow: append($shadow, round($i * $x) round($i * $y) $blur mix($mix,$color,0.3%*$i), comma);
    }
  }
  @return $shadow;
}
$c_fg:         #f00;
$c_bg:         #fff;
$c_3d:         #f2f2f2;
$c_shadow:     #dadada;
$c_shadow-mix: #6998da;
.fig--3 {
  .logo {
    perspective: 1000px;
    perspective-origin: 50% 0;
    font-size: 8em;
    display: inline-flex;
    span {
      font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
      display: block;
      color: $c_bg;
      $letters: 7;
      @for $i from 1 through $letters {
        $offset: $i - ceil($letters / 2);
        $trans: if($offset > 0, -89.5deg, 89.5deg);
        &:nth-child(#{$i}) {
          // trans/de-form the letters
          transform-origin: 50% + 50%/$offset 200%;
          font-size: if($offset == 0,
            0.85em,
            0.9em + 0.015*pow(abs($offset),2));
          transform: 
              if($offset == 0, scale(1, 1), scale(95.9 - abs($offset) * 10, 1)) 
              if($offset == 0, translatey(0%), rotatey($trans));
           text-shadow: 
            d3(15, $c_3d, if($offset == 0, 0, -0.25px * $offset), 0), 
            d3(30, $c_shadow, 2px, 3px, 3px, $c_shadow-mix);
        }
      }
    }
  }
}
```
*css*
```
.fig--3 .logo {
  perspective: 1000px;
  perspective-origin: 50% 0;
  font-size: 8em;
  display: inline-flex;
}
.fig--3 .logo span {
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  display: block;
  color: #fff;
}
.fig--3 .logo span:nth-child(1) {
  transform-origin: 33.33333% 200%;
  font-size: 1.035em;
  transform: scale(65.9, 1) rotatey(89.5deg);
  text-shadow: 1px 0 0 #f2f2f2, 2px 0 0 #f2f2f2, 2px 0 0 #f2f2f2, 3px 0 0 #f2f2f2, 4px 0 0 #f2f2f2, 5px 0 0 #f2f2f2, 5px 0 0 #f2f2f2, 6px 0 0 #f2f2f2, 7px 0 0 #f2f2f2, 8px 0 0 #f2f2f2, 8px 0 0 #f2f2f2, 9px 0 0 #f2f2f2, 10px 0 0 #f2f2f2, 11px 0 0 #f2f2f2, 11px 0 0 #f2f2f2, 2px 3px 3px #dadada, 4px 6px 3px #d9dada, 6px 9px 3px #d9d9da, 8px 12px 3px #d9d9da, 10px 15px 3px #d8d9da, 12px 18px 3px #d8d9da, 14px 21px 3px #d8d9da, 16px 24px 3px #d7d8da, 18px 27px 3px #d7d8da, 20px 30px 3px #d7d8da, 22px 33px 3px #d6d8da, 24px 36px 3px #d6d8da, 26px 39px 3px #d6d7da, 28px 42px 3px #d5d7da, 30px 45px 3px #d5d7da, 32px 48px 3px #d5d7da, 34px 51px 3px #d4d7da, 36px 54px 3px #d4d6da, 38px 57px 3px #d4d6da, 40px 60px 3px #d3d6da, 42px 63px 3px #d3d6da, 44px 66px 3px #d3d6da, 46px 69px 3px #d2d5da, 48px 72px 3px #d2d5da, 50px 75px 3px #d2d5da, 52px 78px 3px #d1d5da, 54px 81px 3px #d1d5da, 56px 84px 3px #d1d4da, 58px 87px 3px #d0d4da, 60px 90px 3px #d0d4da;
}
.fig--3 .logo span:nth-child(2) {
  transform-origin: 25% 200%;
  font-size: 0.96em;
  transform: scale(75.9, 1) rotatey(89.5deg);
  text-shadow: 1px 0 0 #f2f2f2, 1px 0 0 #f2f2f2, 2px 0 0 #f2f2f2, 2px 0 0 #f2f2f2, 3px 0 0 #f2f2f2, 3px 0 0 #f2f2f2, 4px 0 0 #f2f2f2, 4px 0 0 #f2f2f2, 5px 0 0 #f2f2f2, 5px 0 0 #f2f2f2, 6px 0 0 #f2f2f2, 6px 0 0 #f2f2f2, 7px 0 0 #f2f2f2, 7px 0 0 #f2f2f2, 8px 0 0 #f2f2f2, 2px 3px 3px #dadada, 4px 6px 3px #d9dada, 6px 9px 3px #d9d9da, 8px 12px 3px #d9d9da, 10px 15px 3px #d8d9da, 12px 18px 3px #d8d9da, 14px 21px 3px #d8d9da, 16px 24px 3px #d7d8da, 18px 27px 3px #d7d8da, 20px 30px 3px #d7d8da, 22px 33px 3px #d6d8da, 24px 36px 3px #d6d8da, 26px 39px 3px #d6d7da, 28px 42px 3px #d5d7da, 30px 45px 3px #d5d7da, 32px 48px 3px #d5d7da, 34px 51px 3px #d4d7da, 36px 54px 3px #d4d6da, 38px 57px 3px #d4d6da, 40px 60px 3px #d3d6da, 42px 63px 3px #d3d6da, 44px 66px 3px #d3d6da, 46px 69px 3px #d2d5da, 48px 72px 3px #d2d5da, 50px 75px 3px #d2d5da, 52px 78px 3px #d1d5da, 54px 81px 3px #d1d5da, 56px 84px 3px #d1d4da, 58px 87px 3px #d0d4da, 60px 90px 3px #d0d4da;
}
.fig--3 .logo span:nth-child(3) {
  transform-origin: 0% 200%;
  font-size: 0.915em;
  transform: scale(85.9, 1) rotatey(89.5deg);
  text-shadow: 0px 0 0 #f2f2f2, 1px 0 0 #f2f2f2, 1px 0 0 #f2f2f2, 1px 0 0 #f2f2f2, 1px 0 0 #f2f2f2, 2px 0 0 #f2f2f2, 2px 0 0 #f2f2f2, 2px 0 0 #f2f2f2, 2px 0 0 #f2f2f2, 3px 0 0 #f2f2f2, 3px 0 0 #f2f2f2, 3px 0 0 #f2f2f2, 3px 0 0 #f2f2f2, 4px 0 0 #f2f2f2, 4px 0 0 #f2f2f2, 2px 3px 3px #dadada, 4px 6px 3px #d9dada, 6px 9px 3px #d9d9da, 8px 12px 3px #d9d9da, 10px 15px 3px #d8d9da, 12px 18px 3px #d8d9da, 14px 21px 3px #d8d9da, 16px 24px 3px #d7d8da, 18px 27px 3px #d7d8da, 20px 30px 3px #d7d8da, 22px 33px 3px #d6d8da, 24px 36px 3px #d6d8da, 26px 39px 3px #d6d7da, 28px 42px 3px #d5d7da, 30px 45px 3px #d5d7da, 32px 48px 3px #d5d7da, 34px 51px 3px #d4d7da, 36px 54px 3px #d4d6da, 38px 57px 3px #d4d6da, 40px 60px 3px #d3d6da, 42px 63px 3px #d3d6da, 44px 66px 3px #d3d6da, 46px 69px 3px #d2d5da, 48px 72px 3px #d2d5da, 50px 75px 3px #d2d5da, 52px 78px 3px #d1d5da, 54px 81px 3px #d1d5da, 56px 84px 3px #d1d4da, 58px 87px 3px #d0d4da, 60px 90px 3px #d0d4da;
}
.fig--3 .logo span:nth-child(4) {
  transform-origin: Infinity% 200%;
  font-size: 0.85em;
  transform: scale(1, 1) translatey(0%);
  text-shadow: 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 0 0 0 #f2f2f2, 2px 3px 3px #dadada, 4px 6px 3px #d9dada, 6px 9px 3px #d9d9da, 8px 12px 3px #d9d9da, 10px 15px 3px #d8d9da, 12px 18px 3px #d8d9da, 14px 21px 3px #d8d9da, 16px 24px 3px #d7d8da, 18px 27px 3px #d7d8da, 20px 30px 3px #d7d8da, 22px 33px 3px #d6d8da, 24px 36px 3px #d6d8da, 26px 39px 3px #d6d7da, 28px 42px 3px #d5d7da, 30px 45px 3px #d5d7da, 32px 48px 3px #d5d7da, 34px 51px 3px #d4d7da, 36px 54px 3px #d4d6da, 38px 57px 3px #d4d6da, 40px 60px 3px #d3d6da, 42px 63px 3px #d3d6da, 44px 66px 3px #d3d6da, 46px 69px 3px #d2d5da, 48px 72px 3px #d2d5da, 50px 75px 3px #d2d5da, 52px 78px 3px #d1d5da, 54px 81px 3px #d1d5da, 56px 84px 3px #d1d4da, 58px 87px 3px #d0d4da, 60px 90px 3px #d0d4da;
}
.fig--3 .logo span:nth-child(5) {
  transform-origin: 100% 200%;
  font-size: 0.915em;
  transform: scale(85.9, 1) rotatey(-89.5deg);
  text-shadow: -1px 0 0 #f2f2f2, -1px 0 0 #f2f2f2, -1px 0 0 #f2f2f2, -1px 0 0 #f2f2f2, -2px 0 0 #f2f2f2, -2px 0 0 #f2f2f2, -2px 0 0 #f2f2f2, -2px 0 0 #f2f2f2, -3px 0 0 #f2f2f2, -3px 0 0 #f2f2f2, -3px 0 0 #f2f2f2, -3px 0 0 #f2f2f2, -4px 0 0 #f2f2f2, -4px 0 0 #f2f2f2, -4px 0 0 #f2f2f2, 2px 3px 3px #dadada, 4px 6px 3px #d9dada, 6px 9px 3px #d9d9da, 8px 12px 3px #d9d9da, 10px 15px 3px #d8d9da, 12px 18px 3px #d8d9da, 14px 21px 3px #d8d9da, 16px 24px 3px #d7d8da, 18px 27px 3px #d7d8da, 20px 30px 3px #d7d8da, 22px 33px 3px #d6d8da, 24px 36px 3px #d6d8da, 26px 39px 3px #d6d7da, 28px 42px 3px #d5d7da, 30px 45px 3px #d5d7da, 32px 48px 3px #d5d7da, 34px 51px 3px #d4d7da, 36px 54px 3px #d4d6da, 38px 57px 3px #d4d6da, 40px 60px 3px #d3d6da, 42px 63px 3px #d3d6da, 44px 66px 3px #d3d6da, 46px 69px 3px #d2d5da, 48px 72px 3px #d2d5da, 50px 75px 3px #d2d5da, 52px 78px 3px #d1d5da, 54px 81px 3px #d1d5da, 56px 84px 3px #d1d4da, 58px 87px 3px #d0d4da, 60px 90px 3px #d0d4da;
}
.fig--3 .logo span:nth-child(6) {
  transform-origin: 75% 200%;
  font-size: 0.96em;
  transform: scale(75.9, 1) rotatey(-89.5deg);
  text-shadow: -1px 0 0 #f2f2f2, -1px 0 0 #f2f2f2, -2px 0 0 #f2f2f2, -2px 0 0 #f2f2f2, -3px 0 0 #f2f2f2, -3px 0 0 #f2f2f2, -4px 0 0 #f2f2f2, -4px 0 0 #f2f2f2, -5px 0 0 #f2f2f2, -5px 0 0 #f2f2f2, -6px 0 0 #f2f2f2, -6px 0 0 #f2f2f2, -7px 0 0 #f2f2f2, -7px 0 0 #f2f2f2, -8px 0 0 #f2f2f2, 2px 3px 3px #dadada, 4px 6px 3px #d9dada, 6px 9px 3px #d9d9da, 8px 12px 3px #d9d9da, 10px 15px 3px #d8d9da, 12px 18px 3px #d8d9da, 14px 21px 3px #d8d9da, 16px 24px 3px #d7d8da, 18px 27px 3px #d7d8da, 20px 30px 3px #d7d8da, 22px 33px 3px #d6d8da, 24px 36px 3px #d6d8da, 26px 39px 3px #d6d7da, 28px 42px 3px #d5d7da, 30px 45px 3px #d5d7da, 32px 48px 3px #d5d7da, 34px 51px 3px #d4d7da, 36px 54px 3px #d4d6da, 38px 57px 3px #d4d6da, 40px 60px 3px #d3d6da, 42px 63px 3px #d3d6da, 44px 66px 3px #d3d6da, 46px 69px 3px #d2d5da, 48px 72px 3px #d2d5da, 50px 75px 3px #d2d5da, 52px 78px 3px #d1d5da, 54px 81px 3px #d1d5da, 56px 84px 3px #d1d4da, 58px 87px 3px #d0d4da, 60px 90px 3px #d0d4da;
}
.fig--3 .logo span:nth-child(7) {
  transform-origin: 66.66667% 200%;
  font-size: 1.035em;
  transform: scale(65.9, 1) rotatey(-89.5deg);
  text-shadow: -1px 0 0 #f2f2f2, -2px 0 0 #f2f2f2, -3px 0 0 #f2f2f2, -3px 0 0 #f2f2f2, -4px 0 0 #f2f2f2, -5px 0 0 #f2f2f2, -6px 0 0 #f2f2f2, -6px 0 0 #f2f2f2, -7px 0 0 #f2f2f2, -8px 0 0 #f2f2f2, -9px 0 0 #f2f2f2, -9px 0 0 #f2f2f2, -10px 0 0 #f2f2f2, -11px 0 0 #f2f2f2, -12px 0 0 #f2f2f2, 2px 3px 3px #dadada, 4px 6px 3px #d9dada, 6px 9px 3px #d9d9da, 8px 12px 3px #d9d9da, 10px 15px 3px #d8d9da, 12px 18px 3px #d8d9da, 14px 21px 3px #d8d9da, 16px 24px 3px #d7d8da, 18px 27px 3px #d7d8da, 20px 30px 3px #d7d8da, 22px 33px 3px #d6d8da, 24px 36px 3px #d6d8da, 26px 39px 3px #d6d7da, 28px 42px 3px #d5d7da, 30px 45px 3px #d5d7da, 32px 48px 3px #d5d7da, 34px 51px 3px #d4d7da, 36px 54px 3px #d4d6da, 38px 57px 3px #d4d6da, 40px 60px 3px #d3d6da, 42px 63px 3px #d3d6da, 44px 66px 3px #d3d6da, 46px 69px 3px #d2d5da, 48px 72px 3px #d2d5da, 50px 75px 3px #d2d5da, 52px 78px 3px #d1d5da, 54px 81px 3px #d1d5da, 56px 84px 3px #d1d4da, 58px 87px 3px #d0d4da, 60px 90px 3px #d0d4da;
}
```
*ʵ��Ч��*<p>
![all text](images/6.png)<p>
###��װ��һ��/Putting it all together
Since I have created all the parts I need, I can now create the animation.<br/>
��Ϊ���Ѿ��������������Ҫ�Ĳ��֣����ڿ��Խ��������
#####�������������룩/Popping out (animation-intro)
I am using two variables $offset and $trans which I have already defined above. The animation has 3 stages, so I can carefully decide when it reaches a certain point.<br/>
��ʹ�����������Ѿ�����ı���$offset��$trans�������������׶Σ�����Ҫ��ϸ�ľ�����ʱ����ĳ�㡣<p>
```
@keyframes pop-out {
  0% {
    transform:
      if($offset == 0, scale(1, 1), scale(95.9 - abs($offset) * 10, 1))
      if($offset == 0, translatey(0%), rotatey($trans));
    text-shadow:
      d3(15, rgba($c_3d, 0), 0, 0),
      d3(50, rgba($c_shadow, 0), 0, 0);
  }
  50% {
    transform:
      if($offset == 0, scale(1.2, 1.2), scale(126.2 - abs($offset) * 10, 1.2))
      if($offset == 0, translatey(-16%), rotatey($trans));
    text-shadow:
      d3(15, $c_3d, if($offset == 0, 0, -0.25px * $offset), 1px),
      d3(50, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
  }
  100% {
    transform:
      if($offset == 0, scale(1.1, 1.1), scale(116.2 - abs($offset) * 10, 1.1))
      if($offset == 0, translatey(-12%), rotatey($trans));
    text-shadow:
      d3(15, $c_3d, if($offset == 0, 0, -0.25px * $offset), 1px),
      d3(50, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
  }
}
```
#####������������β��/Fading back (animation-outro)
Now let��s do the same thing for fading back.<br/>
ͬ���Ĳ���ʵ�ֵ�����Ч����<br/>
```
@keyframes fade-back {
  0% {
    transform:
      if($offset == 0, scale(1.1, 1.1), scale(116.2 - abs($offset) * 10, 1.1))
      if($offset == 0, translatey(-12%), rotatey($trans));
    text-shadow:
      d3(15, $c_3d, if($offset == 0, 0, -0.25px * $offset), 1px),
      d3(50, $c_shadow, 1px, 3px, 3px, $c_shadow-mix);
  }
  20% {
    transform:
      if($offset == 0, scale(1.05, 1.05), scale(105.9 - abs($offset) * 10, 1.05))
      if($offset == 0, translatey(-7%), rotatey($trans));
    text-shadow:
      d3(15, rgba($c_3d, 0), 0, 0),
      d3(50, rgba($c_shadow, 0), 0, 0);
  }
  100% {
    transform:
      if($offset == 0, scale(1, 1), scale(95.9 - abs($offset) * 10, 1))
      if($offset == 0, translatey(0%), rotatey($trans));
    text-shadow:
      d3(15, rgba($c_3d, 0), 0, 0),
      d3(50, rgba($c_shadow, 0), 0, 0);
  }
}
```
##### �ı�������ɫ/Change color
I also needed to provide an animation to change the color.<br/>
����Ҫ�ṩһ�������ı�������ɫ��
```
@keyframes change-color {
  0% {
    color: $c_bg;
  }
  100% {
    color: $c_fg;
  }
}
```
##### �����������/Calling the animations
Now we can chain these animations like so:<br/>
�������ǿ��������������Ѷ���������һ��
```
animation-name: pop-out, fade-back, change-color;
animation-duration: 4s, 2s, 0.1s;
animation-delay: 0s, 2s, 3.2s
```
The code above is just an approximate example. Each letter has a different delay and duration. You can see the final implementation here Netflix animation in pure CSS.<br/>
����Ĵ���ֻ��һ�����Ƶ�ʵ�֣�ÿ����ĸ�в�ͬ�Ķ����ӳٺͼ�������Ե������鿴���յ�ʵ��Ч��[Netflix animation in pure CSS](http://codepen.io/pixelass/pen/MYYReK)��<p>
Final notice: I added some magic to retrigger the animation in pure CSS but that��s something I might explain in another article.<br/>
���֪ͨһ�£���ʹ����һЩ����˼��ļ�����ʵ���ڴ�CSS���ٴδ����������ҽ����ڽ������������н��͡�<p>
I am never really happy with my experiments and while writing this article I found several ways how I could improve the code and effect.<br/>
��ʵ���ʱ�򲢲���ʮ�ָ��ˣ���Ϊд���µ�ʱ�����뵽�������������Ч���ķ�����<p>
I rewrote the entire Sass code prior to writing this article but I still feel that I can improve some parts. That is the main reason why I never stop making experiments. It just makes me smarter and bends my thoughts in directions I never knew existed.<br/>
Ϊ��д��ƪ����������д������Sass���룬��������Ȼ������������һЩ���֡�������Ҳ������ʵ�����Ҫԭ�����ұ�ø��Ӵ���������һЩ��ǰû��������ķ������µ�ͻ�ơ�<p>
I barely make use of techniques like these in real-life projects but I very often use the functions I needed to implement that effect. Anyway, I hope you enjoyed this article.<br/>
�Ҽ���û����ʵ�ʵ���Ŀ���õ������ļ����������Ҿ���ʹ�ú���������Ч�����������ϣ����ϲ����ƪ���¡�<p>
Gregor Adams is a front-end developer from Hamburg, Germany. He is passionate about CSS and Sass, thus happens to be the author of amazing demos on CodePen featuring his great CSS skills.<br/>
*[Gregor Adams](https://twitter.com/gregoradams)��һλ����Hamburg��ǰ�˿����ߣ�����CSS��Sass�м�������顣������[codepen](http://codepen.io/pixelass/)�п��Կ�����ǿ���CSS������*
######ԭ�����ӣ�[Netflix Logo In CSS](http://hugogiraudel.com/2015/04/15/netflix-logo-in-css/#first-concept)
