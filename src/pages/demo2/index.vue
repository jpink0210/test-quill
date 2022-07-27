<template>
  <div>
    <h2>this is demo2.</h2>
    <div
      @click.prevent.stop.capture
    >
     <button @click="b1">buttonbutton</button>  
     <a @click="atag" href="//www.google.com" target="_blank">google</a>  
    </div>    
    <p>所謂 moment(), 就是</p>
    <ol>
      <li>把日期物件話</li>
      <li>物件化的目標是 new Date() 或是你的 dash 日期 或是 // 日期</li>

    </ol>
    
    <p>diff 是兩物件，做差異，後面要戴上年、月、天的單位</p>
    <p>startOf('week'): 把物件設定到，那週的 weekday=0, 也就是 那週的「週日」</p>
    <p>所以如果你想要「週一」是一週的「第一天」</p>
    <p>週一就是， startOf('week').add(1, "days")  </p>
    <p>週日就是， startOf('week').add(7, "days")  </p>
    <br><br><br>
    <p>format: 所有物件，都要 format 之後才會變出一個單一日期。</p>
    <p>clone: 好用，尤其是要自我迭代的時候 x=x.clone().add(5, 'days')</p>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'Demo2',
  mounted() {
    const today = new Date();
    console.log(moment(today).format("YYYY-MM") )
    console.log(moment(today).format("YYYY/MM") )
    const start = moment('2020-12-20');
    const start2 = moment('2020/12/20');
    const end = moment('2021-09-12');
    console.log(start.weekday());
    console.log(start2.weekday());
    // console.log(end);
    // const dif = end.diff(start, 'days')
    // const dify = end.diff(start, 'years')
    // console.log(dif, dify);
    let s2 = start
    .clone()
    .startOf("week")
    .format("YYYY/MM/DD");

    console.log(s2);


  },
  methods: {
    b1() {
      alert('buttonbutton')
    },
    atag() {
      alert('a tag');
    }
  }
}
</script>
